const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
const secretKey = process.env.WhatIsYourName; // Update your `.env` file to have this key


const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", req.headers.authorization);


    // Check if the token is provided
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Authorization token is required" });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format

    try {
        // Verify the token
        const decoded = jwt.verify(token, secretKey);
        console.log("Decoded Token:", decoded);
console.log("Vendor ID in Token:", decoded.vendorId);


        // Find the vendor from the decoded token
        const vendor = await Vendor.findById(decoded.vendorId);
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        // Attach vendor ID to the request object for further use
        req.vendorId = vendor._id;
        next(); // Call the next middleware/route handler
    } catch (error) {
        console.error("Error verifying token:", error.message);

        // Return an appropriate error response
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = verifyToken;
