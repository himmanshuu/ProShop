import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log(product);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ msg: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

const newProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    user: req.user._id,
    image: "/images/sample.jpg",
    description: "Sample description",
    brand: "Sample Brand",
    category: "Sample Category",
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  });

  const savedProduct = await product.save();
  console.log(savedProduct);
  res.json(savedProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const {
    name,
    price,
    brand,
    category,
    description,
    countInStock,
    image,
    rating,
    numReviews,
  } = req.body;
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.description = description || product.description;
    product.countInStock = countInStock || product.countInStock;
    product.image = image || product.image;
    product.rating = rating || product.rating;
    product.numReviews = numReviews || product.numReviews;
    res.json(await product.save());
  } else {
    res.status(404);
    throw new Error("No product found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProductById,
  newProduct,
  updateProduct,
};
