const asyncHandler = require('express-async-handler');
const Product = require('../models/productModal');
const { default: mongoose } = require('mongoose');



const createProducts = asyncHandler(async (req, res) => {

    const {
        name,
        sku,
        category,
        brand,
        quantity,
        description,
        image,
        regularPrice,
        price,
        color,
    } = req.body;


    if (!name || !category || !brand || !quantity || !price || !description || !sku) {
        res.status(400)
        throw new Error("Please fill in all fields")
    }


    try {
        const product = await Product.create({
            name,
            sku,
            category,
            brand,
            quantity,
            description,
            image,
            regularPrice,
            price,
            color,
        });

        res.status(201).json({ product: product })
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }

});


// get Products
const getProducts = asyncHandler(async (req, res) => {


    try {
        const products = await Product.find().sort('-createdAt')

        res.status(200).json(products)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
});

// get Single Products
const getSingleProducts = asyncHandler(async (req, res) => {

    const id = req.params.id;

    try {
        const product = await Product.findById({ _id: id });

        if (!product) {
            res.status(404)
            throw new Error("product not found")
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
});

// delete Products
const deleteProduct = asyncHandler(async (req, res) => {

    const id = req.params.id;

    try {
        const product = await Product.findById({ _id: id });

        if (!product) {
            res.status(404)
            throw new Error("product not found")
        }

        // await Product.findOneAndDelete({ _id: id })
        await Product.findByIdAndDelete({ _id: id })

        res.status(200).json({ message: "product is removed" })
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
});

// update Product
const updateProduct = asyncHandler(async (req, res) => {

    const id = req.params.id;
    console.log(id)

    const {
        name,
        category,
        brand,
        quantity,
        description,
        image,
        regularPrice,
        price,
        color,
    } = req.body;


    try {
        const product = await Product.findById({ _id: id });
        console.log(product)

        if (!product) {
            res.status(404)
            throw new Error("product not found")
        }

        // await Product.findOneAndUpdate({ _id: id })
        const updatedProducts = await Product.findByIdAndUpdate(
            { _id: id },
            {
                name,
                category,
                brand,
                quantity,
                description,
                image,
                regularPrice,
                price,
                color,
            },
            // for skip the required field
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json(updatedProducts)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
});



// review Produts
const reviewProduct = asyncHandler(async (req, res) => {
    const { star, review, reviewDate } = req.body;
    const id = req.params.id;


    // validation 
    if (star < 1 || !review) {
        res.status(400)
        throw new Error("Please add a start and review")
    }


    try {

        const product = await Product.findById({ _id: id });

        if (!product) {
            res.status(400);
            throw new Error("Product Not Found")
        }

        // update Rating
        product.rating.push({
            star,
            review,
            reviewDate,
            name: req.user.name,
            userID: req.user._id
        });
        product.save();

        res.status(200).json({ message: "Product review is added" })
    } catch (error) {
        throw new Error(error)
    }
});

// delete review
const deleteReview = asyncHandler(async (req, res) => {

    const { userId } = req.body;
    const id = req.params.id;
    // console.log("userId ",userId, "id ",id);

    try {
        const product = await Product.findById({ _id: id });

        if (!product) {
            res.status(400)
            throw new Error("Product not found")
        }

        const newRatings = product.rating.filter((rating) => {
            return rating.userID.toString() !== userId.toString()
            // console.log(rating)
        });

        product.rating = newRatings
        product.save();


        res.status(200).json({ message: "Product review has been deleted" });

    } catch (error) {
        res.status(400);
        throw new Error(error)
    }
});


// Update Review

const updateReview = asyncHandler(async (req, res) => {
    const { star, review, reviewDate, userId } = req.body;
    const id = req.params.id;

    // validation 
    if (star < 1 || !review) {
        res.status(400)
        throw new Error("Please add a start and review")
    }


    try {

        const product = await Product.findById({ _id: id });

        if (!product) {
            res.status(400);
            throw new Error("Product Not Found")
        }

        // Match user to review
        if (req.user._id.toString() !== userId) {
            res.status(401);
            throw new Error("User Not Authorised")
        }

        // update product review
        const updatedReview = await Product.findOneAndUpdate(
            {
                _id: product._id,
                "rating.userID": mongoose.Types.ObjectId(userId)
            },
            {
                $set: {
                    "rating.$.star": star,
                    "rating.$.review": review,
                    "rating.$.reviewDate": reviewDate
                }
            }
        );

        if(updateReview){
            res.status(200).json({ message: "Product review updated" })
        }else{
            res.status(400).json({ message: "Product review not updated" })
        }
    } catch (error) {
        throw new Error(error)
    }
});


module.exports = {
    createProducts,
    getProducts,
    getSingleProducts,
    deleteProduct,
    updateProduct,
    reviewProduct,
    deleteReview,
    updateReview
}