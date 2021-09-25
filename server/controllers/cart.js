const CartModel = require('./../models/Cart');

module.exports = {
    showCustomer: async (req, res) => {
        try {
            let customers = await CartModel.getCustomer();
            return res.status(200).json({
                customers
            });
        } catch (error) {
            next(error)
        }
    },
    updateBookStockBorrowBook: async (req, res) => {
        try {
            let {
                book_id,
                quantity
            } = req.body;
            let bookStock = await CartModel.getBookStockByBookId(book_id);
            let data = {};
            data.instock = bookStock[0].instock - Number(quantity);
            data.rending = bookStock[0].rending + Number(quantity);
            data.quantity = bookStock[0].quantity - Number(quantity);
            await CartModel.updateBookStockBorrowBook(data, book_id);
            return res.status(200).json({
                success: true
            });
        } catch (error) {
            next(error)
        }
    }
}