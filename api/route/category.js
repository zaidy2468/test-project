const express=require('express')
const router=express.Router();
const categoriescontroller=require('../controllers/categories');
const relationscontroller=require('../controllers/relations');
router.post('/post',categoriescontroller.categories_post);
router.get('/:product_id',categoriescontroller.products_populate);
router.post('/set/:categoryId/:subcategoryId',relationscontroller.set_relations);
router.get('/get/:categoryId',relationscontroller.get_products_by_categoryId);
module.exports=router;