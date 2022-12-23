const express=require('express');
const router=express.Router();
const subcategoriescontroller=require('../controllers/subcategories');
const subcategory_relations_controller=require('../controllers/relations');
router.post('/post',subcategoriescontroller.subCategories_post);
router.get('/get/:subcategoryId',subcategory_relations_controller.get_products_subcategoryId);
module.exports=router;