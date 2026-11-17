const { rateLimit } = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Maximum of 100 requests per IP

    message: { message: "Too many requests. Please try again later." },

    standardHeaders: true,
    legacyHeaders: false
});


// Rate limiting for Authentication Routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,

    message: { message: "Too many authentication attempts. Please try again after 15 minutes." },

    standardHeaders: true,
    legacyHeaders: false
});

module.exports = apiLimiter;
module.exports = authLimiter;