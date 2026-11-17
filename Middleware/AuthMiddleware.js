const jwt = require("jsonwebtoken");
const User = require("../Models/Users");

//AUTHENTICATION: Verify the user's identity
exports.authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        //Check if the token was provided
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authentication required. No token provided. Please log in.", });
        }

        const token = authHeader.split(" ")[1];

        //Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Find the user in the database
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
        return res.status(401).json({ message: "User not found. Please log in again."});
        }

        //Attach the authenticated user to the request
        req.user =  user;

        next();

    } catch (error) {

        //Expired Token or Invalid Token
        if ( error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError" ) {
            return res.status(401).json({ message: "Invalid or expired token. Please log in again."});
        }

        return res.status(500).json({ message: "Authentication failed", error: error.message});
    }

};

//AUTHORIZATION: Check the user's role
exports.authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Please authenticate first"});
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "You do not have permission to perform this action"});
        }

        next();
    };
};