const mongoose=require('mongoose');
const categoriesSchema=mongoose.Schema({
    description:String,
    products:[{
        type:mongoose.Types.ObjectId,
        ref:"Product_1"
    }
    ],
    subcategory:[{
        type:mongoose.Types.ObjectId,
        ref:"subCategories"
    }]
    
    
});
module.exports=mongoose.model('Categories',categoriesSchema);