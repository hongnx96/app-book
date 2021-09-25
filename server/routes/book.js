const express = require('express');
const passport = require('passport');

const BookController = require('./../controllers/book');
const { 
    tables, 
    validateParamsBook, 
    validateBody
} = require('./../helpers/modules/routeBookHelper');

const router = express.Router();

router.route('/search')
    .post(
        passport.authenticate('jwt', { session: false }),
        BookController.showSearchBook
    );

router.route('/')
    .post(
        passport.authenticate('jwt', { session: false }),
        validateBody(tables.bookTable),
        BookController.createBook
    );

router.route('/api/:id')
    .delete(
        passport.authenticate('jwt', { session: false }),
        validateParamsBook(tables.idTable, 'id'),
        BookController.deleteBook
    )
    .get(
        passport.authenticate('jwt', { session: false }),
        validateParamsBook(tables.idTable, 'id'),
        BookController.showBookById
    )
    .put(
        passport.authenticate('jwt', { session: false }),
        validateParamsBook(tables.idTable, 'id'),
        validateBody(tables.bookUpdateTable),
        BookController.updateBook
    );

router.route('/author')
    .get(
        passport.authenticate('jwt', { session: false }),
        BookController.showAuthor
    );

router.route('/book-type')
    .get(
        passport.authenticate('jwt', { session: false }),
        BookController.showBookType
    );

module.exports = router;