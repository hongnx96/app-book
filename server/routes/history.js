const express = require('express');
const passport = require('passport');

const HistoryController = require('./../controllers/history');
const { 
    tables, 
    validateParamsHistory, 
    validateBody 
} = require('./../helpers/routeHelpers');

const router = express.Router();

router.route('/search')
    .post(
        passport.authenticate('jwt', { session: false }),
        HistoryController.showSearchHistory
    )

router.route('/')
    .post(
        passport.authenticate('jwt', { session: false }),
        validateBody(tables.historyTable),
        HistoryController.createHistory
    )

router.route('/api/:id')
    .delete(
        passport.authenticate('jwt', { session: false }),
        validateParamsHistory(tables.idTable, 'id'),
        HistoryController.deleteHistory
    )
    .get(
        passport.authenticate('jwt', { session: false }),
        validateParamsHistory(tables.idTable, 'id'),
        HistoryController.showHistoryById
    )
    .put(
        passport.authenticate('jwt', { session: false }),
        validateParamsHistory(tables.idTable, 'id'),
        validateBody(tables.historyUpdateTable),
        HistoryController.updateHistory
    );

router.route('/customer')
    .get(
        passport.authenticate('jwt', { session: false }),
        HistoryController.showCustomer
    )

module.exports = router;