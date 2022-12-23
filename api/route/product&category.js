const express=require('express');
const router=express.Router();
const category_product_controllers=require('../controllers/category_product');
const relationscontroller=require('../controllers/relations')
router.post('/post_cts_prds/:categoryId',category_product_controllers.set_product_id_category_id);
router.get('/get/product_ids',category_product_controllers.get_pop_prod_by_cat_id);
router.get('/ask/anything/:categoryId',relationscontroller.get_aggregation);
module.exports=router;