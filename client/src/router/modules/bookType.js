import BookType from './../../views/bookTypes/BookType';
import BookTypeAdd from './../../views/bookTypes/BookTypeAdd';
import BookTypeDetail from './../../views/bookTypes/BookTypeDetail';
import BookTypeEdit from './../../views/bookTypes/BookTypeEdit';
import BookTypeIndex from './../../views/bookTypes/Index';

import Header from './../../views/layouts/Header';

const bookTypeRouter = {
    path: '/book-types',
    name: 'BookType',
    components: {
        default: BookType,
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
            path: '/book-types',
            name: 'BookTypeIndex',
            query: { name: '', page: '' },
            component: BookTypeIndex
        },
        {
            path: 'add',
            name: 'BookTypeAdd',
            component: BookTypeAdd,
            beforeEnter(to, from, next) {
                if(localStorage.getItem('roleName') === 'admin') {
                    next();
                } else {
                    next({
                        name: 'BookTypeIndex'
                    })
                }
            }
        },
        {
            path: ':id/detail',
            name: 'BookTypeDetail',
            component: BookTypeDetail
        },
        {
            path: ':id/edit',
            name: 'BookTypeEdit',
            component: BookTypeEdit,
            beforeEnter(to, from, next) {
                if(localStorage.getItem('roleName') === 'admin') {
                    next();
                } else {
                    next({
                        name: 'BookTypeIndex'
                    })
                }
            }
        },
    ]
}

export default bookTypeRouter;