const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name'],
        trim: true
    },
    sku: {
        type: String,
        required: true,
        default: 'SKU',
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        trim: true
    },
    brand: {
        type: String,
        required: [true, 'Please add a brand'],
        trim: true
    },
    color: {
        type: String,
        required: [true, 'please add a color'],
        default: 'As seen',
        trim: true
    },
    quantity: {
        type: Number,
        required: [true, 'Please add a quanlity'],
        trim: true,
    },
    sold: {
        type: Number,
        default: 0,
        trim: true
    },
    regularPrice: {
        type: Number,
        trim: true
    },
    price: {
        type: Number,
        require: [true, 'Please add a price'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please Add a description'],
        trim: true
    },
    image: {
        type: [String]
    },
    rating: {
        type: [Object]
    }
}, {
    timestamps: true
});

const Product = mongoose.model('products', productsSchema)
module.exports = Product