const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); //Load environmental variables from .env file

const connectDB = require('./Config/databaseConfig');
const apiLimiter = require("./Middleware/RateLimiter");
const productRoute = require("./Routes/ProductRoutes");
const userRoute = require("./Routes/UserRoutes");

connectDB(); //Connect to MongoDB

app.use(express.json()); //Middleware to parse JSON request
app.use("/api", apiLimiter);

app.use("/api/products", productRoute); //use the product route for all requests starting with /products
app.use("/api/users", userRoute); //use the user route for all requests starting with /users


app.listen(process.env.PORT, () => {
    console.log('Server is running on port ${process.env.PORT}');
});