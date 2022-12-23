const mongoose=require('mongoose');
const Categories=require('../models/categories');
const { db } = require('../models/products');
const Product_1=require('../models/products');
const subCategories=require('../models/subcategories');
const category_product_schema=require('../models/categories&products');

exports.set_relations=(req,res,next)=>{
    const products=new Product_1({
        name:req.body.name,
        price:req.body.price,
        quantity:req.body.quantity
    })
    products.save()
    .then(result=>{
        console.log("Product created",result);
        Categories.findByIdAndUpdate(req.params.categoryId,{$push:{products:result._id}})
        .then(result=>{
            subCategories.findByIdAndUpdate(req.params.subcategoryId,{$push:{products:result._id}})
                .exec()
                .then(resut=>{
                    console.log(resut);
                    res.status(200).json({
                        message:"subcategory updated",
                        resut:resut
                    });
                    
                    Categories.findById(req.params.categoryId).populate('products')
                    .exec()
                    .then(take=>{
                      console.log(take);
            
                    })
                    .catch(err=>{
                     console.log(err);
                        });
                })
                .catch(err=>{
                    res.status(500).json({
                        error:err
                    })
                });
            
        })

        .catch(errr=>{
            res.status(500).json({
                error:errr
            });
        });
        

    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
   
};
exports.get_products_by_categoryId=(req,res,next)=>{
   const _id=req.params.categoryId;
   
   Categories.findById(_id).populate('products').populate({path:'subcategory',populate:{path:'products'}})
   .exec()
   .then(result=>{
    console.log(result);
    res.status(200).json({
        message:"all products for  the given categoryId",
        products:result
        
    });
   })
   .catch(err=>{
     res.status(500).json({
        error:err
     });
   });
};
exports.get_products_subcategoryId=(req,res,next)=>{
    const _id=req.params.subcategoryId;
    subCategories.findById({_id:_id})
    .populate('products')
    
    
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"get_products_by_subcategoryId",
            products:result
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
};
exports.get_aggregation=(req,res,next)=>{



    const categoryId=req.params.categoryId;
    Categories.aggregate([

        // { $addFields: {
        //         "productId":{ "$toString": "$_id" }
        //     }},


        {$lookup:{
            from:"category_product_schemas",
            // localField: "productId"
            // foreignField: "product_id"
            //let:{category_id:Categories._id},
            "pipeline":[
                {$match:{$expr:{$eq:[categoryId,"category_product_schemas.category_id"]}}},
                {$lookup:{
                    from:"categories",
                   // let:{product_id:"category_product_schemas.product_id"},
                    "pipeline":[{$match:{$expr:{$eq:["category_product_schemas.product_id","product1._id"]}},
                    as:"anything1"
                }]
                }},
                { $unwind: "anything1"},
                //{ $project : { name:'anything1.name' }}
            ],
            as:"anything"
        }}
    ])
    .then(result=>{
        res.status(200).json({
            output:result
        })
    })
    .catch(err=>[
        res.status(500).json({
            error:err
        })
    ]);


 
}
/*Categories.aggregate([ {$lookup:{  
    from:"category_product_schemas", 
    localField:"categories._id", 
    foreignField:"category_product_schemas.category_id",
    "pipeline":[
        {$match:
            {category_id:categoryId}
        }
    ], 
    as:"anything"}} ])
.then(result=>{
    console.log(result)
    res.status(200).json({
        output:result
    })

})
.catch(err=>{
    res.status(500).json({
        error:err
    })
})

*/
