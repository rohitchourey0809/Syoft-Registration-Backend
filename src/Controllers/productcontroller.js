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

exports.paginationqueryparama = async (req, res) => {
  try {
    const { _page = 1, _limit = 10, q } = req.query;
    let query = {};
    if (q) {
      query = {
        $or: [
          { title: { $regex: new RegExp(q, "i") } },
          { description: { $regex: new RegExp(q, "i") } },
        ],
      };
    }
    const products = await Product.find(query)
      .skip((_page - 1) * _limit)
      .limit(Number(_limit));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
