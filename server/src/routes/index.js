const express = require('express');

const router = express.Router();

// Controller User
const { addUsers, getUsers, getUser, updateUser, deleteUser } = require('../controller/user');
// Controller Profile
const { getProfile } = require('../controller/profile');
// Controller Auth
const { register, login, checkAuth } = require('../controller/auth');

// Controller Product
const { addProduct, getProduct, getProducts, updateProduct, deleteProduct, searchProduct } = require('../controller/product');

// Controller Category
const { getCategories, getCategory, addCategory, updateCategory, deleteCategory } = require('../controller/category');

// Controller Trasaction
const { addTransaction, getTransactions, notification } = require('../controller/transaction');

// Middlewares
const { auth } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');

// Route User
router.post('/user', addUsers);
router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

// Route Profile
router.get('/profile', auth, getProfile);

// Controller Auth
router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', auth, checkAuth);

// Controller Product
router.get('/products', auth, getProducts);
router.get('/product/:id', auth, getProduct);
router.post('/product', auth, uploadFile('image'), addProduct);
router.patch('/product/:id', auth, uploadFile('image'), updateProduct);
router.delete('/product/:id', auth, deleteProduct);
router.get('/search', searchProduct);

// Controller Category
router.get('/categories', auth, getCategories);
router.get('/category/:id', auth, getCategory);
router.post('/category', auth, addCategory);
router.patch('/category/:id', auth, updateCategory);
router.delete('/category/:id', auth, deleteCategory);

// Controller Transaction
router.post('/transaction', auth, addTransaction);
router.get('/transactions', auth, getTransactions);
router.post('/notification', notification);

module.exports = router;
