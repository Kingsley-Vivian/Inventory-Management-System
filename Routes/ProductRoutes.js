const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../Middleware/AuthMiddleware");
const upload = require("../Middleware/upload");

//Import product controller
const productController = require("../Controllers/ProductController");

//Define the routes
router.post("/createproduct", authenticate, authorize("storekeeper"), upload.single("image"), productController.createProduct);

router.put("/updateproduct/:id", authenticate, authorize("storekeeper"), upload.single("image"), productController.updateProduct);

router.get("/getallproducts", authenticate, authorize("salesperson"), productController.getAllProducts);

router.get("/getproduct/:id", authenticate, authorize("salesperson"), productController.getProductById);

router.delete("/deleteproduct/:id", authenticate, authorize("storekeeper"), productController.deleteProduct);

module.exports = router;