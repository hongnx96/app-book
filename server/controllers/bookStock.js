const BookStockModel = require('./../models/BookStock');

module.exports = {
    createBookStock: async (req, res) => {
        try {
            let { book_id } = req.body;
            let resultCount = await BookStockModel.getBookStockByIdBook(book_id);
            if(resultCount[0].count_id_book === 0) {
                let data = req.body;
                data.is_deleted = 0;
                await BookStockModel.insertBookStock(data);
                return res.status(201).json({
                    success: true
                });
            } else {
                return res.json({
                    notification: 'This book already exist in book stock.'
                });
            }
        } catch (error) {
            next(error);
        }
    },
    deleteBookStock: async (req, res) => {
        try {
            let { id } = req.params;
            let data = {};
            data.is_deleted = 1;
            await BookStockModel.deleteBookStockById(data, id);
            return res.status(200).json({
                success: true
            })
        } catch (error) {
            next(error);
        }
    },
    showBook: async (req, res) => {
        try {
            let books = await BookStockModel.getBook();
            return res.status(200).json({
                books
            });
        } catch (error) {
            next(error);
        }
    },
    showBookStockById: async (req, res) => {
        try {
            let { id } = req.params;
            let bookStock = await BookStockModel.getBookStockById(id);
            return res.status(200).json({
                bookStock
            });
        } catch (error) {
            next(error)
        }
    },
    showSearchBookStock: async (req, res) => {
        try {
            let { book_id } = req.body;
            if(!book_id) {
                book_id = '';
            }
            let bookStocks = await BookStockModel.searchBookStock(book_id.trim());
            // let book = await BookStockModel.getBookById(book_id.trim());
            // let book_name = null;
            // if(book.length === 0) {
            //     book_name = '';
            // } else {
            //     book_name = book[0].book_name;
            // }
            return res.status(200).json({
                bookStocks,
                search: {
                    book_id
                }
            });
        } catch (error) {
            next(error)
        }
    },
    updateBookStock: async(req, res) => {
        try {
            let { id } = req.params;
            let { 
                book_id,
                instock,
                rending,
                quantity
            } = req.body;
            console.log('data', req.body);
            let resultCount = await BookStockModel.getBookStockByIdBookAndBookStock(id, book_id);
            if(resultCount[0].count_id === 0) {
                let bookStock = await BookStockModel.getBookStockById(id);
                console.log('bookStock', bookStock);
                let data = {
                    book_id,
                    instock: parseInt(bookStock[0].instock) + parseInt(instock),
                    rending: parseInt(bookStock[0].rending) + parseInt(rending),
                    quantity: parseInt(bookStock[0].quantity) + parseInt(quantity)
                }
                await BookStockModel.updateBookStockById(data, id);
                return res.status(200).json({
                    success: true
                });
            } else {
                return res.json({
                    notification: 'This book already exist in book stock.'
                });
            }
        } catch (error) {
            next(error)
        }
    },
}