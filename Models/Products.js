const mongose = require('mongoose');
const productSchema = new mongose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    color: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    brand: {
        type: String,
        required: false
    },
    IsAvailable: {
        type: Boolean,
        default: false
    }

},
{timestamps: true} //Date created and updated

);

//Create Model
const Product = mongose.model("Product", productSchema);

module.exports = Product; //export the model to other files