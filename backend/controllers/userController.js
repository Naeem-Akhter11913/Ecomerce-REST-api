const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bycript = require('bcrypt')
const User = require('../models/userModel')



// generate webtoke
const generateWebToken = (payLoad) => {
    const option = {
        expiresIn: '1d'
    }
    return jwt.sign(payLoad, process.env.JWT_SECRET, option)
}


// REGISTER THE NEW USER
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;


    // validation

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill the entire fields")
    }

    if (password.length < 6) {
        res.status(400)
        throw new Error("password must be up to 6 Characters")
    }


    //  check the user is exist 
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error("User Already Exist")
    }


    const bycriptPass = await bycript.hash(password, parseInt(process.env.SALT))
    // create new User
    const user = await User.create({
        name,
        email,
        password: bycriptPass
    })

    // calling generate Tocken method
    const payLoad = {
        _id: user._id,
        name: user.name
    }
    // console.log("hhh", payLoad)
    const token = generateWebToken(payLoad);

    if (user) {
        const { _id, name, email, role } = user;

        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            // secure: true,
            // sameSite: 'none'
        })

        // send user Data
        res.status(201).json({
            _id,
            name,
            email,
            role,
            token
        })
    } else {
        res.status(400)
        throw new Error("Invalid user Data")
    }
})


// LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        res.status(400)
        throw new Error("Please fill the entire fields")
    }

    // check user is exist 
    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error("User Dosn't exist")
    }

    const passIsCorrect = await bycript.compare(password, user.password);

    // genereate tocken
    const payLoad = {
        _id: user._id,
        name: user.name
    }

    // console.log("hello",user.name)
    const token = generateWebToken(payLoad);

    if (user && passIsCorrect) {
        // removing the password form the user object
        const newUser = await User.findOne({ email }).select("-password");

        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            // secure: true,
            // sameSite: 'none'
        })

        // send user Data
        res.status(201).json(newUser)
    } else {
        res.status(400);
        throw new Error("Invalid email or password");
    }
})

// lLOGOUT USER
const logOUtUser = asyncHandler(async (req, res) => {
    res.cookie('token', "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({
        message: "Successfully Logged out"
    })
})



// GET ALL USER
const getUser = async (req, res) => {
    const user = await User.findById(req.user._id).select("-password")

    if (user) {
        res.status(200).json(user)
    } else {
        throw new Error("User Not found")
    }
}


// GET LOGIN STATUS
const getLoginStatus = asyncHandler(async (req, res) => {
    // res.send("login status...")
    const token = req.cookies.token;
    if (!token) {
        return res.json(false)
    }

    // verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
        res.json(true)
    } else {
        res.json(false)
    }
})


// Update User 

const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (user) {
        const { name, phone, address } = user;

        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.address = req.body.address || address;


        const updatedUser = await user.save();
        //send the user's information in frontend
        res.status(200).json(updatedUser)
    }else{
        res.status(404);
        throw new Error("User Not Found")
    }
})

const updatePhoto = asyncHandler(async(req,res) =>{
    // res.send("Update User Photo....")
    const {photo} = req.body;

    const user = await User.findById(req.user._id);
    user.photo = photo
    // saving
    const updatePhoto = await user.save();

    // send the user's Details in frontend
    res.status(200).json(updatePhoto);
})


module.exports = { registerUser, loginUser, logOUtUser, getUser, getLoginStatus, updateUser , updatePhoto }  