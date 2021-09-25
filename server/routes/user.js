const express = require('express');
const passport = require('passport');

const UserController = require('./../controllers/user');
const { validateSignIn } = require('./../services/validateSignIn');
const { 
    tables, 
    validateParamsUser, 
    validateBody 
} = require('./../helpers/routeHelpers');

const router = express.Router();

router.route('/search')
    .post(
        passport.authenticate('jwt', { session: false }),
        UserController.showSearchUser
    );

router.route('/')
    .post(
        passport.authenticate('jwt', { session: false }),
        validateBody(tables.userTable),
        UserController.createUser
    );

router.route('/sign-in')
    .post(
        validateBody(tables.userSignInTable),
        validateSignIn,
        UserController.signIn
    );

router.route('/api/:id')
    .delete(
        passport.authenticate('jwt', { session: false }),
        validateParamsUser(tables.idTable, 'id'),
        UserController.deleteUser
    )
    .get(
        passport.authenticate('jwt', { session: false }),
        validateParamsUser(tables.idTable, 'id'),
        UserController.showUserById
    )
    .put(
        passport.authenticate('jwt', { session: false }),
        validateParamsUser(tables.idTable, 'id'),
        validateBody(tables.userUpdateTable),
        UserController.updateUser
    );

router.route('/role')
    .get(
        passport.authenticate('jwt', { session: false }),
        UserController.showRole
    );

module.exports = router;