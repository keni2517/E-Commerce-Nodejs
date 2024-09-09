

// otpService.js
const nodemailer = require('nodemailer');

// Create a transporter with your Gmail credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nodemailer26@gmail.com',  // Your Gmail email
        pass: 'izjq eavf yiiz sskk',     // Your generated app password from Google
    },
});

// Function to send OTP
const sendOTP = async (email, otp) => {
    try {
        // Ensure that the email address is provided
        if (!email) {
            throw new Error('No email address provided');
        }

        // Send the email with OTP
        await transporter.sendMail({
            from: 'srushtikathiriya2003@gmail.com',  // Sender's email address
            to: email,                     // Recipient's email address
            subject: 'Your OTP Code',      // Email subject
            text: `Your OTP is ${otp}`,    // Email body (plain text)
        });

        console.log('OTP sent successfully');
        return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
        console.error('Error sending OTP:', error);
        return { success: false, message: 'Error sending OTP' };
    }
};

module.exports = { sendOTP };