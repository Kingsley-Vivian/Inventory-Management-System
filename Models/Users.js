const mongose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongose.Schema({
    name: {
        type: String,
        requires: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["superadmin", "storekeeper", "salesperson"], //Define the allowed roles
        default: "salesperson"
    }


},
{timestamps: true} //Date created and updated

);

//Create Model
const User = mongose.model("User", userSchema);

module.exports = User;