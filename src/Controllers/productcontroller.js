const Product = require("../Models/productmodel");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).send(product);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).send(products);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    return res.status(200).send({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};
