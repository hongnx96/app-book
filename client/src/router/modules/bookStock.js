import BookStock from './../../views/bookStocks/BookStock';
import BookStockAdd from './../../views/bookStocks/BookStockAdd';
import BookStockDetail from './../../views/bookStocks/BookStockDetail';
import BookStockEdit from './../../views/bookStocks/BookStockEdit';
import BookStockIndex from './../../views/bookStocks/Index';

import Header from './../../views/layouts/Header';

const bookStockRouter = {
    path: '/book-stocks',
    name: 'BookStock',
    components: {
        default: BookStock,
        'header': Header
    },
    beforeEnter(to, from, next) {
        if(localStorage.getItem('Authorization') === null) {
            next({
                name: 'SignIn'
            });
        } else {
            next();
        }
    },
    children: [
        {
            path: '/book-stocks',
            name: 'BookStockIndex',
            component: BookStockIndex
        },
        {
            path: ':id/detail',
            name: 'BookStockDetail',
            component: BookStockDetail
        },
        {
            path: 'add',
            name: 'BookStockAdd',
            component: BookStockAdd,
            beforeEnter(to, from, next) {
                if(localStorage.getItem('roleName') === 'admin') {
                    next();
                } else {
                    next({
                        name: 'BookStockIndex'
                    })
                }
            }
        },
        {
            path: ':id/edit',
            name: 'BookStockEdit',
            component: BookStockEdit,
            beforeEnter(to, from, next) {
                if(localStorage.getItem('roleName') === 'admin') {
                    next();
                } else {
                    next({
                        name: 'BookStockIndex'
                    })
                }
            }
        }
    ]
}

export default bookStockRouter;