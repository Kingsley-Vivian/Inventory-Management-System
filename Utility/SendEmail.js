const nodemailer = require("nodemailer");

const sendWelcomeEmail = async (userEmail, userName) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Boku Supermarket" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: "Welcome to Boku Supermarket!",
            html: `
                <h2>Welcome to Boku Supermarket, ${userName}!</h2>
                
                <p>Your account has been successfully created, and we're excited to have you join us.</p>
                
                <p>
                    You can now access the application and begin managing your inventory more efficiently.
                </p>
                
                <p><strong>Ready to get started?</strong></p>
                
                <a
                    href="${process.env.CLIENT_URL}/login"
                    style="
                        display: inline-block;
                        padding: 12px 20px;
                        background-color: #000;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 5px;
                        "
                >
                    Log In to Your Account
                </a>
                
                <p>If you have any questions or need assistance, please contact our support team.</p>
                
                <p>
                    Best regards,<br/>
                    <strong>The Boku Supermarket Team</strong>
                </p>
            `
        });

        console.log("Welcome email sent successfully");

    } catch (error) {
        console.error("Error sending welcome email:", error.message);
    }
};

module.exports = sendWelcomeEmail;