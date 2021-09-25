import Author from './../../views/authors/Author';
import AuthorAdd from './../../views/authors/AuthorAdd';
import AuthorDetail from './../../views/authors/AuthorDetail';
import AuthorEdit from './../../views/authors/AuthorEdit';
import AuthorIndex from './../../views/authors/Index';

import Header from './../../views/layouts/Header';

const authorRouter = {
    path: '/authors',
    name: 'Author',
    components: {
        default: Author,
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
            path: '/authors',
            name: 'AuthorIndex',
            query: { name: '', page: '' },
            component: AuthorIndex
        },
        {
            path: 'add',
            name: 'AuthorAdd',
            component: AuthorAdd,
            beforeEnter(to, from, next) {
                if(localStorage.getItem('roleName') === 'admin') {
                    next();
                } else {
                    next({
                        name: 'AuthorIndex'
                    })
                }
            }
        },
        {
            path: ':id/detail',
            name: 'AuthorDetail',
            component: AuthorDetail
        },
        {
            path: ':id/edit',
            name: 'AuthorEdit',
            component: AuthorEdit,
            beforeEnter(to, from, next) {
                if(localStorage.getItem('roleName') === 'admin') {
                    next();
                } else {
                    next({
                        name: 'AuthorIndex'
                    })
                }
            }
        },
        
    ]
}

export default authorRouter;