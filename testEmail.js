require("dotenv").config();

const sendWelcomeEmail = require("./Utility/SendEmail");

const testEmail = async () => {
  await sendWelcomeEmail(
    "your-real-email@gmail.com",
    "John Doe"
  );
};

testEmail();