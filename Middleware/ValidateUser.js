const { body, validationResult } = require("express-validator");

const validateRegistration = [
    // Validate name
    body("name")
        .isString()
        .withMessage("Name must be text")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .bail()
        .matches(/^[\p{L}]+(?:[ '-][\p{L}]+)*$/u)
        .withMessage("Enter a valid name"),

    //Validate email
    body("email")
        .isString()
        .withMessage("Email must be text")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Enter a valid email address"),

    //Validate phone
    body("phone")
        .isString()
        .withMessage("Phone number must be text")
        .bail()
        .trim()
        .matches(/^\d{11}$/)
        .withMessage("Phone number must contain exactly 11 digits"),

    //Validate password
    body("password")
        .isString()
        .withMessage("Password must be text")
        .bail()
        .isLength({ min: 12 })
        .withMessage("Password must be at least 12 charcters long")
        .bail()
        .matches(/[a-z]/)
        .withMessage("Password must contain a lowercase letter")
        .bail()
        .matches(/[A-Z]/)
        .withMessage("Password must contain an uppercase letter")
        .bail()
        .matches(/\d/)
        .withMessage("Password must contain a number")
        .bail()
        .matches(/[^A-Za-z0-9]/)
        .withMessage("Password must contain a special character"),

        //Return validation errors, if any
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed",
                errors: errors.array().map(error => ({
                    field: error.path,
                    message: error.msg
                }))
            });
        }

        next();

    }
];

module.exports = { validateRegistration };