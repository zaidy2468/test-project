const mongoose=require('mongoose');
const subCategoriesSchema=new mongoose.Schema({
    description:String,
    products:[{
        type:mongoose.Types.ObjectId,
        ref:"Product_1"
    }]

});
module.exports=mongoose.model('subCategories',subCategoriesSchema);
const subcategorie_schema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    description:String
});
module.exports=mongoose.model('subcategories',subCategoriesSchema);