const express = require('express');
const passport = require('passport');

const CartController = require('./../controllers/cart');

const router = express.Router();

router.route('/customer')
    .get(
        passport.authenticate('jwt', { session: false }),
        CartController.showCustomer
    );

router.route('/update-book-stock-borrow-book')
    .put(
        passport.authenticate('jwt', { session: false }),
        CartController.updateBookStockBorrowBook
    )

module.exports = router;