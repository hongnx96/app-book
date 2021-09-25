const express = require('express');
const passport = require('passport');

const HistoryDetailController = require('./../controllers/historyDetail');
const { tables, validateBody, validateParamsHistoryDetail } = require('./../helpers/routeHelpers');

const router = express.Router();

router.route('/borrow-book')
    .post(
        passport.authenticate('jwt', { session: false }),
        validateBody(tables.historyDetailTable),
        HistoryDetailController.borrowBook
    );

router.route('/search')
    .post(
        passport.authenticate('jwt', { session: false }),
        HistoryDetailController.showSearchHistoryDetail
    );

router.route('/api/:id')
    .delete(
        passport.authenticate('jwt', { session: false }),
        validateParamsHistoryDetail(tables.idTable, 'id'),
        HistoryDetailController.deleteHistoryDetail
    )
    .get(
        passport.authenticate('jwt', { session: false }),
        validateParamsHistoryDetail(tables.idTable, 'id'),
        HistoryDetailController.showHistoryDetailById
    )
    .put(
        passport.authenticate('jwt', { session: false }),
        validateParamsHistoryDetail(tables.idTable, 'id'),
        validateBody(tables.historyDetailUpdateTable),
        HistoryDetailController.updateBorrowBook
    );

router.route('/pay-book/:id')
    .put(
        passport.authenticate('jwt', { session: false }),
        validateParamsHistoryDetail(tables.idTable, 'id'),
        validateBody(tables.historyDetailPayBookTable),
        HistoryDetailController.payBook
    );

router.route('/update-book-stock-pay-book')
    .put(
        passport.authenticate('jwt', { session: false }),
        validateBody(tables.historyDetailBookStockUpdatePayBookTable),
        HistoryDetailController.updateBookStockPayBook 
    );

router.route('/book')
    .get(
        passport.authenticate('jwt', { session: false }),
        HistoryDetailController.showBook
    );

router.route('/history')
    .get(
        passport.authenticate('jwt', { session: false }),
        HistoryDetailController.showHistory
    );

module.exports = router;