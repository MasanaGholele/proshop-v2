import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Read the JWT from the cookie (our token is called jwt in userController)
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password'); // will be in the request object in all the routes
        next();
        } catch (error) {
            console.error(error)
            res.status(401);
            throw new Error('Not authorised, token failed');
        }

    } else {
        res.status(401);
        throw new Error('Not authorised, no token');
    }
})

// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error(' Not authorised as Admin');
    }
}


export { protect, admin };