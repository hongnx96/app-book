const express = require('express');
const passport = require('passport');

const BookStockController = require('../controllers/bookStock');
const { tables, validateParamsBookStock, validateBody } = require('../helpers/routeHelpers');

const router = express.Router();

router.route('/search')
    .post(
        passport.authenticate('jwt', { session: false }),
        BookStockController.showSearchBookStock
    );

router.route('/')
    .post(
        passport.authenticate('jwt', { session: false }),
        validateBody(tables.bookStockTable),
        BookStockController.createBookStock
    )

router.route('/api/:id')
    .delete(
        passport.authenticate('jwt', { session: false }),
        validateParamsBookStock(tables.idTable, 'id'),
        BookStockController.deleteBookStock
    )
    .get(
        passport.authenticate('jwt', { session: false }),
        validateParamsBookStock(tables.idTable, 'id'),
        BookStockController.showBookStockById
    )
    .put(
        passport.authenticate('jwt', { session: false }),
        validateParamsBookStock(tables.idTable, 'id'),
        validateBody(tables.bookStockUpdateTable),
        BookStockController.updateBookStock
    );

router.route('/book')
    .get(
        passport.authenticate('jwt', { session: false }),
        BookStockController.showBook
    );

module.exports = router;