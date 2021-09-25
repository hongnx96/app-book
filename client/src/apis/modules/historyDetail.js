import Api from './../index';

export default {
    payBook(data) {
        return Api().put(`/history-details/pay-book/${data.history_detail_id}`, {
            status: data.status
        }, {
            headers: data.headers
        });
    },
    deleteHistoryDetailById(data) {
        return Api().delete(`/history-details/api/${data.id}`, {
            headers: data.headers
        });
    },
    getBook(data) {
        return Api().get(`/history-details/book`, {
            headers: data.headers
        });
    },
    getHistory(data) {
        return Api().get(`/history-details/history`, {
            headers: data.headers
        });
    },
    getHistoryDetailById(data) {
        return Api().get(`/history-details/api/${data.id}`, {
            headers: data.headers
        });
    },
    searchHistoryDetail(data) {
        return Api().post('/history-details/search', {
            history_id: data.history_id,
            book_id: data.book_id,
            status: data.status
        }, {
            headers: data.headers
        });
    },
    updateBorrowBook(data) {
        console.log('api', data);
        return Api().put(`/history-details/api/${data.id}`, {
            history_id: data.history_id,
            book_id: data.book_id,
            quantity: data.quantity,
            borrowed_book_date: data.borrowed_book_date,
            pay_book_date: data.pay_book_date
        }, {
            headers: data.headers
        });
    },
    updateBookStockPayBook(data) {
        return Api().put('/history-details/update-book-stock-pay-book', {
            book_id: data.book_id,
            quantity: data.quantity
        }, {
            headers: data.headers
        });
    }
}