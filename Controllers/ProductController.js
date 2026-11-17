const Product = require('../Models/Products');
const sendEmail = require("../Middleware/EmailSender");

//Create a new product
exports.createProduct = async (req, res) => {
    try {

        //Check if all required fields are provided
        if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity || !req.body.category || !req.body.expiryDate) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const { name, size, description, price, quantity, color, category, expiryDate, brand, IsAvailable } = (req.body);

        const image = req.file ? req.file.path : null;

        const product = new Product({
            name,
            size,
            description,
            price,
            quantity,
            color,
            category,
            expiryDate,
            image,
            brand,
            IsAvailable
        });

        await product.save();

        //Send email notification to the admin that a new product has been created
        const subject = "New Product Created";
        const text = `A new product has been created:\n\nName: ${name}\nSize: ${size}\nDescription: ${description}\nPrice: ${price}\nQuantity: ${quantity}\nColor: ${color}\nCategory: ${category}\nExpiryDate: ${expiryDate}\nBrand: ${brand}\nIsAvailable: ${IsAvailable}`;
        await sendEmail("kingsleyvivian47@gmail.com", subject, text);


        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

//Update Products
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, size, description, price, quantity, color, category, expiryDate, image, brand, IsAvailable} = req.body;

        const product = await Product.findByIdAndUpdate(id, { name, size, description, price, quantity, color, category, expiryDate, image, brand, IsAvailable }, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({message: "Product updated successfully", product});

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid product ID",
      });
    }

        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

//Get all Products
exports.getAllProducts = async (_req, res) => {
    try {
        //const { name, size, description, price, quantity, color } = req.body;
        const products = await Product.find();

        res.status(200).json({
            message: "Products retrieved successfully", products
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving products", error: error.message
        });
    }
};

//Get Product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product retrieved successfully", product });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        res.status(500).json({ message: "Error retrieving product", error: error.message });
    }
};

//Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", product});
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        res.status(500).json({ message: "Error deleting product", error: error.message});
    }
};
