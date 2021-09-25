const express = require('express');
const passport = require('passport');

const BookTypeController = require('./../controllers/bookType');
const { tables, validateBody, validateParamsBookType } = require('./../helpers/routeHelpers');

const router = express.Router();

router.route('/search').post(
    passport.authenticate('jwt', { session: false }),
    BookTypeController.showSearchBookType
);

router.route('/').post(
    passport.authenticate('jwt', { session: false }),
    validateBody(tables.bookTypeTable),
    BookTypeController.createBookType
);

router.route('/:id')
    .delete(
        passport.authenticate('jwt', { session: false }),
        validateParamsBookType(tables.idTable, 'id'),
        BookTypeController.deleteBookType
    )
    .get(
        passport.authenticate('jwt', { session: false }),
        validateParamsBookType(tables.idTable, 'id'),
        BookTypeController.showBookTypeById
    )
    .put(
        passport.authenticate('jwt', { session: false }),
        validateParamsBookType(tables.idTable, 'id'),
        validateBody(tables.bookTypeUpdateTable),
        BookTypeController.updateBookType
    );

module.exports = router;