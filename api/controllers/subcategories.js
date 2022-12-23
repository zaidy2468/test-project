const mongoose =require('mongoose');
const subCategories=require('../models/subcategories');
exports.subCategories_post=(req,res,next)=>{
    const subcategories=new subCategories({
        _id:new mongoose.Types.ObjectId,
        description:req.body.description
    });
    subcategories.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"sub_categories initialized",
            creation:result
        });

    })
    .catch(err=>{
        res.status(500).json({
          error:err
        });
    });

};
