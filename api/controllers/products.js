const mongoose=require('mongoose');
const Product_1=require('../models/products');
const multer=require('multer');
exports.products_get_all=(req,res,next)=>{

    const { price,name } = req.query 


    Product_1.find({ price,name })
    .exec()
    .then(result=>{
        // console.log(result);
        res.status(200).json({
            message:"all products",
            products:result 
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

};
exports.products_post=(req,res,next)=>{
    const products=new Product_1({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,
        quantity:req.body.quantity
    });
    products.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"succ   ess",
            createdProduct:products
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.products_update_by_id=(req,res,next)=>{
    const id=req.params.productsId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    Product_1.updateOne({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"all products"
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

};
exports.products_delete_by_id=(req,res,next)=>{
    const id=req.params.productsId;
    Product_1.remove({_id:id})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"all products"
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

};
exports.price_in_range=(req,res,next)=>{
    const min=req.params.min;
    const max=req.params.max;
    Product_1.find({price:{$gte:min,$lte:max}})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
          message: "products according to given price range",
          output:result
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
};
exports.get_paginated_products=(req,res,next)=>{
    const limit=req.params.limit;
    Product_1.find().limit(limit)
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"paginated products",
            output:result
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
};
