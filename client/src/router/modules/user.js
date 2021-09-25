import Header from './../../views/layouts/Header';

import User from './../../views/users/User';
import UserAdd from './../../views/users/UserAdd';
import UserDetail from './../../views/users/UserDetail'; 
import UserEdit from './../../views/users/UserEdit'; 
import UserIndex from './../../views/users/Index';

const userRouter = {
    path: '/users',
    name: 'User',
    components: {
        default: User,
        'header': Header
    },
    beforeEnter(to, from, next) {
        if(localStorage.getItem('Authorization') === null) {
            next({
                name: 'SignIn'
            });
        } else {
            if(localStorage.getItem('roleName') === 'admin') {
                next();
            } else {
                next({
                    name: 'Home'
                })
            }
        }
    },
    children: [
        {
            path: '/users',
            name: 'UserIndex',
            query: {
                page: '',
                name: '',
                role_id: '',
                email: ''
            },
            component: UserIndex
        },
        {
            path: ':id/detail',
            name: 'UserDetail',
            component: UserDetail
        },
        {
            path: 'add',
            name: 'UserAdd',
            component: UserAdd
        },
        {
            path: ':id/edit',
            name: 'UserEdit',
            component: UserEdit
        }
    ]
}

export default userRouter;