const HistoryDetailModel = require('./../models/HistoryDetail');

module.exports = {
    borrowBook: async(req, res) => {
        try {
            console.log('data book', typeof req.body.book_id);
            let { 
                book_id,
                book_name,
                quantity,
                borrowed_book_date,
                pay_book_date
            } = req.body;
            console.log('borrowed_book_date', borrowed_book_date);
            console.log('pay_book_date', pay_book_date);
            let quantityBookStock = await HistoryDetailModel.getQuantityByBookId(String(book_id));
            console.log('quantityBookStock', quantityBookStock);
            if(quantity <= quantityBookStock[0].quantity) {
                let data = req.body;
                delete data.book_name;
                
                let arrDateBorrow =  borrowed_book_date.split("-");
                data.borrowed_book_date = [arrDateBorrow[2], arrDateBorrow[1], arrDateBorrow[0]].join("-");

                let arrDatePay = pay_book_date.split("-");
                data.pay_book_date = [arrDatePay[2], arrDatePay[1], arrDatePay[0]].join("-");
                await HistoryDetailModel.borrowBook(data);
                return res.status(200).json({
                    success: true,
                    book_id,
                    quantity
                });
            } else {
                return res.json({
                    notification: `${book_name} borrow up to ${quantityBookStock[0].quantity} books.`,
                    book_id
                });
            }
        } catch (error) {
            next(error);
        }
    },

    deleteHistoryDetail: async(req, res) => {
        try {
            let { id } = req.params;
            let data = {};
            data.is_deleted = 1;
            await HistoryDetailModel.deleteHistoryDetailById(data, id);
            return res.json({
                success: true
            });
        } catch (error) {
            next(error);
        }
    },

    payBook: async (req, res) => {
        try {
            let { id } = req.params;
            let data = req.body;
            await HistoryDetailModel.payBook(data, id);
            return res.status(200).json({
                success: true
            });
        } catch (error) {
            next(error);
        }
    },

    showBook: async(req, res) => {
        try {
            let books = await HistoryDetailModel.getBook();
            return res.status(200).json({
                books
            });
        } catch (error) {
            next(error);
        }
    },

    showHistory: async(req, res) => {
        try {
            let histories = await HistoryDetailModel.getHistory();
            return res.status(200).json({
                histories
            });
        } catch (error) {
            next(error);
        }
    },

    showHistoryDetailById: async(req, res) => {
        try {
            let { id } = req.params;
            let historyDetail = await HistoryDetailModel.getHistoryDetailById(id);
            return res.status(200).json({
                historyDetail
            });
        } catch (error) {
            next(error);
        }
    },

    showSearchHistoryDetail: async(req, res) => {
        try {
            let {
                history_id,
                book_id,
                status
            } = req.body;
            if(!history_id) {
                history_id = '';
            }
            if(!book_id) {
                book_id = '';
            }
            if(!status) {
                status = '';
            }
            let historyDetails = await HistoryDetailModel.searchHistoryDetail(
                history_id.trim(),
                book_id.trim(),
                status.trim()
            );
            return res.status(200).json({
                historyDetails,
                search: {
                    history_id: history_id.trim(),
                    book_id: book_id.trim(),
                    status: status.trim()
                }
            });
        } catch (error) {
            next(error)
        }
    },

    updateBorrowBook: async(req, res) => {
        try {
            let { id } = req.params;
            let { 
                book_id,
                quantity,
                borrowed_book_date,
                pay_book_date,
            } = req.body;
            //console.log('server', req.body);
            //console.log('book id', typeof book_id);
            let bookIdAndQuantityHistoryDetail = await HistoryDetailModel.getBookIdAndQuantityByHistoryDetailId(id);
            //console.log('bookIdAndQuantityHistoryDetail', bookIdAndQuantityHistoryDetail);
            //let quantityBookStock = await HistoryDetailModel.getQuantityByBookId(book_id);
            //console.log('quantityBookStock', quantityBookStock);
            let bookStock = await HistoryDetailModel.getBookStockByBookId(book_id);
            //console.log('bookStock', bookStock);

            let data = req.body;
            let arrDateBorrow =  borrowed_book_date.split("-");
            data.borrowed_book_date = [arrDateBorrow[2], arrDateBorrow[1], arrDateBorrow[0]].join("-");
            let arrDatePay = pay_book_date.split("-");
            data.pay_book_date = [arrDatePay[2], arrDatePay[1], arrDatePay[0]].join("-");

            if(book_id === bookIdAndQuantityHistoryDetail[0].book_id) {
                //console.log('ok');
                if(quantity <= bookStock[0].quantity + bookIdAndQuantityHistoryDetail[0].quantity) {
                    let dataBookStock = {};
                    dataBookStock.instock = bookStock[0].instock + bookIdAndQuantityHistoryDetail[0].quantity - parseInt(quantity);
                    dataBookStock.rending = bookStock[0].rending - bookIdAndQuantityHistoryDetail[0].quantity + parseInt(quantity);
                    dataBookStock.quantity = bookStock[0].quantity + bookIdAndQuantityHistoryDetail[0].quantity - parseInt(quantity);

                    //console.log('data update', data);
                    await HistoryDetailModel.updateBorrowBook(data, id);
                    await HistoryDetailModel.updateBookStockUpdateHistoryDetail(dataBookStock, book_id);
                    return res.status(200).json({
                        success: true
                    });
                } else {
                    let bookName = await HistoryDetailModel.getBookNameByBookId(book_id);
                    //console.log('bookName', bookName);
                    return res.json({
                        notification: `${bookName[0].book_name} borrow up to ${bookStock[0].quantity} books.`
                    });
                }
            } else {
                //console.log('fail');
                if(quantity <= bookStock[0].quantity) {
                    let bookStockHistoryDetail = await HistoryDetailModel.getBookStockByBookId(bookIdAndQuantityHistoryDetail[0].book_id);
                    let dataBookStockOld = {};
                    dataBookStockOld.instock = bookStockHistoryDetail[0].instock + bookIdAndQuantityHistoryDetail[0].quantity;
                    dataBookStockOld.rending = bookStockHistoryDetail[0].rending - bookIdAndQuantityHistoryDetail[0].quantity;
                    dataBookStockOld.quantity = bookStockHistoryDetail[0].quantity + bookIdAndQuantityHistoryDetail[0].quantity;

                    let dataBookStockNew = {};
                    dataBookStockNew.instock = bookStock[0].instock - parseInt(quantity);
                    dataBookStockNew.rending = bookStock[0].rending + parseInt(quantity);
                    dataBookStockNew.quantity = bookStock[0].quantity - parseInt(quantity);

                    await HistoryDetailModel.updateBorrowBook(data, id);
                    await HistoryDetailModel.updateBookStockUpdateHistoryDetail(dataBookStockOld, bookIdAndQuantityHistoryDetail[0].book_id);
                    await HistoryDetailModel.updateBookStockUpdateHistoryDetail(dataBookStockNew, book_id);
                    return res.status(200).json({
                        success: true
                    });
                } else {
                    let bookName = await HistoryDetailModel.getBookNameByBookId(book_id);
                    //console.log('bookName', bookName);
                    return res.json({
                        notification: `${bookName[0].book_name} borrow up to ${bookStock[0].quantity} books.`
                    });
                }
            }
        } catch (error) {
            next(error);
        }
    },

    updateBookStockPayBook: async (req, res) => {
        try {
            let {
                book_id,
                quantity
            } = req.body;
            console.log('book id', book_id);
            let bookStock = await HistoryDetailModel.getBookStockByBookId(book_id);
            let dataBookStock = {};
            dataBookStock.instock = bookStock[0].instock + parseInt(quantity);
            dataBookStock.rending = bookStock[0].rending - parseInt(quantity);
            dataBookStock.quantity = bookStock[0].quantity + parseInt(quantity);
            await HistoryDetailModel.updateBookStockPayBook(dataBookStock, book_id);
            return res.status(200).json({
                success: true
            });
        } catch (error) {
            next(error);
        }
    }
}