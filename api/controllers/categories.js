const mongoose=require('mongoose');
const Categories=require('../models/categories');
exports.categories_get_all=(req,res,next)=>{
    Categories.find()
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"all categories"
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

};
exports.categories_post=(req,res,next)=>{
    const categories=new Categories({
        _id:new mongoose.Types.ObjectId(),
        description:req.body.description
        
    });

    categories.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"success in posting category",
            createdProduct:categories,
            
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.categories_update_by_id=(req,res,next)=>{
    const id=req.params.categoriesId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    Categories.updateOne({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"category updated "
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

};
exports.categories_delete_by_id=(req,res,next)=>{
    const id=req.params.categoriesId;
    Categories.remove({_id:id})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"categorie deleted"
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

};
exports.products_populate=(req,res,next)=>{
    Categories.find({_id:req.params.product_id}).populate('products').populate('subcategory')
    .exec()
    .then(result=>{
        res.status(200).json({
            message:"sucessfully populated",
            result:result

        });
    })
    .catch(err=>{
        res.status(200).json({
            error:err
        });
    });
}

