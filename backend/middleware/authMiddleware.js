const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');



const protect = asyncHandler(async (req, res, next) => {


    try {
        const token = await req.cookies.token;

        if (!token) {
            res.status(401)
            throw new Error("Not Autorized, Please Login")
        }

        // verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // get user id from token
        const user = await User.findById(verified._id).select("-password");

        if (!user) {
            res.status(401)
            throw new Error("User not found")
        }
        // console.log(user)

        req.user = user;
        next()

    } catch (error) {
        res.status(401)
        throw new Error(error)
    }
});


// Admin Only
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    }else{
        res.status(401)
        throw new Error("Not authorized as an admin")
    }
}

module.exports = { protect,adminOnly  }