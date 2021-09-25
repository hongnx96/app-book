const express = require('express');
const passport = require('passport');

const CustomerController = require('./../controllers/customer');
const { tables, validateParamsCustomer, validateBody } = require('./../helpers/routeHelpers')

const router = express.Router();

router.route('/search')
    .post(
        passport.authenticate('jwt', { session: false }),
        CustomerController.showSearchCustomer
    );

router.route('/')
    .post(
        passport.authenticate('jwt', { session: false }),
        validateBody(tables.customerTable),
        CustomerController.createCustomer
    );

router.route('/:id')
    .delete(
        passport.authenticate('jwt', { session: false }),
        validateParamsCustomer(tables.idTable, 'id'),
        CustomerController.deleteCustomer
    )
    .get(
        passport.authenticate('jwt', { session: false }),
        validateParamsCustomer(tables.idTable, 'id'),
        CustomerController.showCustomerById
    )
    .put(
        passport.authenticate('jwt', { session: false }),
        validateParamsCustomer(tables.idTable, 'id'),
        validateBody(tables.customerUpdateTable),
        CustomerController.updateCustomer
    );

module.exports = router;