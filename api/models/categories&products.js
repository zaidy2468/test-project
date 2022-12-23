const mongoose=require('mongoose');
const category_productsSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    category_id: mongoose.Schema.Types.ObjectId,
    product_id: mongoose.Schema.Types.ObjectId
})
module.exports=mongoose.model('category_product_Schema',category_productsSchema);