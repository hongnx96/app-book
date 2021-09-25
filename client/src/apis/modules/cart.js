import Api from './../index';

export default {
    borrowBook(data) {
        //console.log('api', data);
        return Api().post('/history-details/borrow-book', {
            history_id: data.history_id,
            book_id: data.book_id,
            quantity: data.quantity,
            borrowed_book_date: data.borrowed_book_date,
            pay_book_date: data.pay_book_date,
            status: data.status,
            is_deleted: data.is_deleted,
            book_name: data.book_name
        }, {
            headers: data.headers
        });
    },
    getCustomer(data) {
        return Api().get('/carts/customer', {
            headers: data.headers
        });
    },
    updateBookStockBorrowBook(data) {
        return Api().put('/carts/update-book-stock-borrow-book', {
            quantity: data.quantity,
            book_id: data.book_id
        }, {
            headers: data.headers
        });
    }
}