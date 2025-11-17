const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const userModel = require('../models/userModel');
const welcomeEmailTemplate = require('../emailTemplates/welcomeMail');

const saltRounds = 10;

const signup = async (req, res) => {
  const { firstName, lastName, phone, password } = req.body;
  const email = req.body.email.toLowerCase();

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: "Email already registered. Please sign in instead." 
      });
    }

    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new userModel({ firstName, lastName, email, phone, password: hashedPassword, accountNumber });
    await user.save();
    console.log("user saved successfully");

    // Send welcome email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: "Welcome to KoinSave! Your Account is Ready",
      html: welcomeEmailTemplate(firstName, lastName, email, phone, accountNumber),
    };

    
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Welcome email sent successfully to ${email}`);
      
      res.status(201).json({ 
        success: true,
        message: "User account has been created! Welcome email sent.", 
        accountNumber 
      });
    } catch (emailError) {
      console.log(`Error sending email: ${emailError.message}`);
      // Still return success since user was created
      res.status(201).json({ 
        success: true,
        message: "User account has been created! (Email notification failed)", 
        accountNumber 
      });
    }
  } catch (err) {
    console.log(err);
    
    // Handle MongoDB duplicate key error
    if (err.code === 11000) {
      return res.status(409).json({ 
        success: false,
        message: "Email already registered. Please sign in instead." 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "User account not created" 
    });
  }
};

function sanitizeUser(userDoc) {
  if (!userDoc) return null;
  const { password, __v, ...rest } = userDoc.toObject ? userDoc.toObject() : userDoc;
  return rest;
}

const signin = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const foundUser = await userModel.findOne({ email });

    if (!foundUser) {
      return res.status(401).json({ 
        success: false,
        message: "User not found. Please check your email or sign up." 
      });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: "Incorrect password. Please try again." 
      });
    }

    const claims = {
      sub: foundUser._id.toString(),
      email: foundUser.email,
      accountNumber: foundUser.accountNumber,
      name: `${foundUser.firstName} ${foundUser.lastName}`
    };

    jwt.sign(claims, process.env.JWT_SECRET, { expiresIn: "10m" }, (err, token) => {
      if (err) {
        console.log(`Token not generated`, err);
        return res.status(500).json({ 
          success: false,
          message: 'Error generating token' 
        });
      }
      return res.status(200).json({
        message: 'Signed in successfully',
        token,
        user: sanitizeUser(foundUser)
      });
    });
  } catch (err) {
    console.log(`Signin error:`, err);
    res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};

module.exports = {
  signup,
  signin
};