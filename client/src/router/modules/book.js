import Book from './../../views/books/Book';
import BookAdd from './../../views/books/BookAdd';
import BookDetail from './../../views/books/BookDetail';
import BookEdit from './../../views/books/BookEdit';
import BookIndex from './../../views/books/Index';

import Header from './../../views/layouts/Header';

const bookRouter = {
    path: '/books',
    name: 'Book',
    components: {
        default: Book,
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
            path: '/books',
            name: 'BookIndex',
            query: {
                book_name: '',
                author_id: '',
                book_type_id: '',
                page: ''
            },
            component: BookIndex
        },
        {
            path: ':id/detail',
            name: 'BookDetail',
            component: BookDetail
        },
        {
            path: 'add',
            name: 'BookAdd',
            component: BookAdd,
            beforeEnter(to, from, next) {
                if(localStorage.getItem('roleName') === 'admin') {
                    next();
                } else {
                    next({
                        name: 'BookIndex'
                    })
                }
            }
        },
        {
            path: ':id/edit',
            name: 'BookEdit',
            component: BookEdit,
            beforeEnter(to, from, next) {
                if(localStorage.getItem('roleName') === 'admin') {
                    next();
                } else {
                    next({
                        name: 'BookIndex'
                    })
                }
            }
        }
    ]
}

export default bookRouter;