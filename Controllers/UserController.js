const User = require('../Models/Users');
const bcrypt = require("bcryptjs");
const sendWelcomeEmail = require("../Utility/SendEmail");
//Create a user
exports.createUser = async (req, res) => {
    try {
        //Request body
        const { name, email, password, gender, phone, role} = req.body;

        //Check if all required fields are provided
        if (!name || !email || !password || !gender || !phone ) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        //Email check
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //Phone number check
        const existingPhone = await User.findOne({ phone: req.body.phone });
        if (existingPhone) {
            return res.status(400).json({ message: "Phone number already exists" });
        }

        //Encrypt password
        const salt = await bcrypt.genSalt(2);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Create a new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            gender: req.body.gender,
            phone: req.body.phone,
            role //Default role is "user" if not provided
        });

        await user.save(); //Save user to the database

        //Send Welcome Email
        await sendWelcomeEmail(user.email, user.name);
        
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }

};

//Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check if all required fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide the required fields" });
        }

        //Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid username or password"});
        }

        //Check if password is corret
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        //generate a token (you can use JWT or any other method)
        //const token = generateToken(user); //Implement your token generation logic here

        const jwt = require("jsonwebtoken");
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }

};

//Get All Users
exports.getAllUsers = async (_req, res) => {
    try {
        const users = await User.find().select("-password");

        return res.status(200).json({
            message: "Users retrieved successfully", users
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error retrieving users", error: error.message
        });
    }
};

//Get User by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User retrieved successfully", user
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid user ID"});
        }

        return res.status(500).json({ message: "Error retrieving user", error: error.message});
    }
};

//Delete User by ID
exports.deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({ 
            message: "User deleted successfully", 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }});
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid user ID"});
        }

        return res.status(500).json({ message: "Error deleting user"});
    }
};