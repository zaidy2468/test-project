const express=require('express');
const cors=require('cors')
const mongoose=require('mongoose');
const morgan=require('morgan');
const bodyparser=require('body-parser');
const productsrouter=require('./api/route/products');
const categories=require('./api/route/category');
const subcategoriesrouter=require('./api/route/subcategories');
const categorie_product_router=require('./api/route/product&category');
const app=express();
app.use(cors());
mongoose.set('strictQuery',true);
mongoose.connect('mongodb+srv://user_zaid:'+process.env.MONGO_ATLAS_PWD+'@cluster0.pq5kg.mongodb.net/?retryWrites=true&w=majority');
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use('/data',(req,res,next)=>{
    res.status(200).json({
        message:"done"
    });
});
app.use('/products',productsrouter);
app.use('/categories',categories);
app.use('/showproducts',categories);
app.use('/subcategories',subcategoriesrouter);
app.use('/categorie_product',categorie_product_router);
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Allow-Access-Control-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT','POST','PATCH','DELETE');
        return res.status(200).json({});
    }
});

module.exports=app;
