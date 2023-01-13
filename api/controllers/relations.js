const Categories = require("../models/categories");
const Product_1 = require("../models/products");
const subCategories = require("../models/subcategories");
const product = require("./products");

exports.set_relations = (req, res, next) => {
  const products = new Product_1({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
  });
  products
    .save()
    .then((result) => {
      console.log("Product created", result);
      Categories.findByIdAndUpdate(req.params.categoryId, {
        $push: { products: result._id },
      })
        .then((result) => {
          subCategories
            .findByIdAndUpdate(req.params.subcategoryId, {
              $push: { products: result._id },
            })
            .exec()
            .then((resut) => {
              console.log(resut);
              res.status(200).json({
                message: "subcategory updated",
                resut: resut,
              });

              Categories.findById(req.params.categoryId)
                .populate("products")
                .exec()
                .then((take) => {
                  console.log(take);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        })

        .catch((errr) => {
          res.status(500).json({
            error: errr,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.get_products_by_categoryId = async (req, res, next) => {
  const _id = req.params.categoryId;

  await Categories.findById(_id)
    .populate("products")
    .populate({ path: "subcategory", populate: { path: "products" } })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "all products for  the given categoryId",
        products: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.get_products_subcategoryId = (req, res, next) => {
  const _id = req.params.subcategoryId;
  subCategories
    .findById({ _id: _id })
    .populate("products")

    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "get_products_by_subcategoryId",
        products: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.get_Products_By_Category = async (req, res, next) => {
  try {
    const { price, category, limit, offset } = req.query;
    const max_price = +price.lte;
    const min_price = +price.gte;
    const _limit = +limit;
    const _offset = +offset;
    if (category.length > 1) {
      await manytomany_ProductsByCategories(
        req,
        res,
        max_price,
        min_price,
        _limit,
        _offset,
        category
      );
    } else if (category.includes("")) {
      await product.products_get_all(req, res, next);
    }
  } catch (error) {
    console.error(error);
  }
};

manytomany_ProductsByCategories = async (
  req,
  res,
  max_price,
  min_price,
  _limit,
  _offset,
  category
) => {
  try {
    const response = await Product_1.aggregate([
      {
        $addFields: {
          p_id: { $toString: "$_id" },
        },
      },
      {
        $lookup: {
          from: "category_product_schemas",
          localField: "p_id",
          foreignField: "product_id",
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
        },
      },
      {
        $addFields: { c_id: { $toObjectId: "$result.category_id" } },
      },
      {
        $lookup: {
          from: "categories",
          localField: "c_id",
          foreignField: "_id",
          as: "results",
        },
      },
      {
        $unwind: {
          path: "$results",
        },
      },

      {
        $project: {
          name: 1,
          price: 1,
          results: 1,
          productImage: 1,
        },
      },
      {
        $addFields: {
          desc: "$results.description",
          cat_id: { $toString: "$results._id" },
        },
      },
      {
        $match: {
          cat_id: { $in: category },
        },
      },
      {
        $project: {
          name: 1,
          price: 1,
          desc: 1,
          productImage: 1,
        },
      },
      {
        $match: {
          price: { $gte: min_price, $lte: max_price },
        },
      },
      {
        $skip: _offset,
      },
      {
        $limit: _limit,
      },
    ]);
    res.status(200).json({
      message: "category based products",
      products: response,
    });
  } catch (error) {
    console.error(error);
  }
};
