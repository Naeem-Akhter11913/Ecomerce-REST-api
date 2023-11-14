const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "please add a name"]
    },
    email: {
        type: String,
        require: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "please enter a valid email"
        ]
    },
    password: {
        type: String,
        require: [true, "Please add a password"],
        minLength: [6, "Password must be up to 6 characters"],
    },
    role: {
        type: String,
        require: [true],
        default: "customer",
        enum: ["customer", "admin"],
    },
    photo: {
        type: String,
        require: [true, "Please add a photo"],
        default: 'https://i.ibb.co/4pDNDK1/avatar.png'
    },
    phone: {
        type: String,
        default: '+91'
    },
    address: {
        type: Object
    }
}, {
    timestamps: true
});

// encrypt password before save the DB


const User = mongoose.model('User', userSchema)
module.exports = User;

