const dns = require("dns");

dns.lookup("api.cloudinary.com", (error, address) => {
    if (error) {
        console.error("DNS Error:", error);
    } else {
        console.log("Cloudinary IP Address:", address);
    }
});