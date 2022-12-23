const mongoose=require('mongoose');
const { db } = require('../models/categories&products');
const product_category=require('../models/categories&products');
const Product_1=require('../models/products');
exports.set_product_id_category_id=(req,res,next)=>{
    const products=new Product_1({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        price:req.body.price,
        quantity:req.body.quantity
    });
    products.save()
    .then(rest=>{
        
        console.log(rest);
    
        const products_categories= new product_category({
        _id:new mongoose.Types.ObjectId(),
        product_id:rest._id,
        category_id:req.params.categoryId
    });
    products_categories.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"products&category table updated",
            output:result
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
        
    })
    .catch();
    
};
exports.get_pop_prod_by_cat_id=async(req,res,next)=>{

  
    product_category.aggregate([{$project:{_id:0,product_id:1,category_id:1}},{$match:{category_id:"6396ed3a47d85649a4ec30cb"}} ])
    .exec()
    .then(result=>{
        result.map(res=>{
            console.log(res.product_id);
            const _id=res.product_id;
            console.log('Coming here')
            Product_1.findById(_id)
            .exec()
            .then(rest=>{
            console.log('Coming here1')
                console.log(rest);
                
            })
            .catch(err=>{
                console.log('Coming here2')
                res.status(500).json({
                    error:err
                });
            });
        });
        console.log(result, 'coming here3');
        res.status(200).json({
            output:result
        })
    })
    .catch(err=>{
        console.log("eroooooooor");
        res.status(500).json({
            
            error:err
        });
    });
    
    
    
};




    /**
       const result= await product_category.aggregate([{$project:{_id:0,product_id:1,category_id:1}},{$match:{category_id:"6396ed3a47d85649a4ec30cb"}} ])
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:result
        });

    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    });
    (result)=>{
            result.map(rest=>{
            const _id=rest.product_id;
             Product_1.findById(_id)
            .exec()
            .then(rst=>{
                console.log(rst);
                res.status(200).json({
                    output:rst
                });
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                });
            });
        });

    
    };
     */