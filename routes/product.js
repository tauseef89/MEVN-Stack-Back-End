const router = require("express").Router();
const verify = require("../routes/verifyToken");
const Product = require("../model/Product");

// Add New product

router.post("/", verify, async (req, res) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price
  });

  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get All products

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Single product
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update product
router.put("/:productId", verify, async (req, res) => {
  try {
    const product = {
      title: req.body.title,
      price: req.body.price
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.productId },
      product
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete product
router.delete("/:productId", verify, async (req, res) => {
  try {
    const removeProduct = await Product.findByIdAndDelete(req.params.productId);
    res.json(removeProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
