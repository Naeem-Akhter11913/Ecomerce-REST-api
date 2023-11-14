const express = require('express');
const { createProducts, getProducts, getSingleProducts, deleteProduct, updateProduct, reviewProduct, deleteReview, updateReview } = require('../controllers/productController');
const { adminOnly, protect } = require('../middleware/authMiddleware');
const Routers = express.Router();

Routers.post('/', protect, adminOnly, createProducts)
Routers.get('/', getProducts)
Routers.get('/:id', getSingleProducts)
Routers.delete('/:id', protect, adminOnly, deleteProduct)
Routers.put('/:id', protect, adminOnly, updateProduct)

Routers.put('/review/:id', protect, reviewProduct)
Routers.delete('/deleteReview/:id', protect, deleteReview)
Routers.put('/updateReview/:id', protect, updateReview)


module.exports = Routers 