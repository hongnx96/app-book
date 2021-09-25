const express = require('express');
const passport = require('passport');

const AuthorController = require('./../controllers/author');
const { 
    validateBody, 
    validateParamsAuthor, 
    tables 
} = require('../helpers/modules/routeAuthorHelper');

const router = express.Router();

router.route('/search')
    .post(
        passport.authenticate('jwt', { session: false }),
        AuthorController.showSearchAuthor
    );

router.route('/')
    .post(
        passport.authenticate('jwt', { session: false }),
        validateBody(tables.authorTable),
        AuthorController.createAuthor
    );

router.route('/:id')
    .delete(
        passport.authenticate('jwt', { session: false }),
        validateParamsAuthor(tables.idTable, 'id'),
        AuthorController.deleteAuthor
    )
    .get(
        passport.authenticate('jwt', { session: false }),
        validateParamsAuthor(tables.idTable, 'id'),
        AuthorController.showAuthorById
    )
    .put(
        passport.authenticate('jwt', { session: false }),
        validateParamsAuthor(tables.idTable, 'id'),
        validateBody(tables.authorUpdateTable),
        AuthorController.updateAuthor
    );
   
module.exports = router;