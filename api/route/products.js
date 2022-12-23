const express=require('express')
const router=express.Router();
const productscontroller=require('../controllers/products');
router.post('/post',productscontroller.products_post);
router.get('/get',productscontroller.products_get_all);
router.get('/price/:min/:max',productscontroller.price_in_range);
router.get('/paginated/:limit',productscontroller.get_paginated_products);  

module.exports=router;