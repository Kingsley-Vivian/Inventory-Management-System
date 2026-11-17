const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../Middleware/AuthMiddleware");

//Import user controller
const userController = require("../Controllers/UserController");
const authLimiter = require("../Middleware/RateLimiter");
const { validateRegistration } = require("../Middleware/ValidateUser");

//Define the routes
router.post("/createuser", authLimiter, validateRegistration, userController.createUser);

router.post("/loginuser", authLimiter, userController.loginUser);

router.get("/getallusers", authenticate, authorize("superadmin"), userController.getAllUsers);

router.get("/getuser/:id", authenticate, authorize("superadmin"), userController.getUserById);

router.delete("/deleteuser/:id", authenticate, authorize("superadmin"), userController.deleteUserById);

//Export the router to be used in other files
module.exports = router;
