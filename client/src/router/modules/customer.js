import Customer from './../../views/customers/Customer';
import CustomerAdd from './../../views/customers/CustomerAdd';
import CustomerDetail from './../../views/customers/CustomerDetail';
import CustomerEdit from './../../views/customers/CustomerEdit';
import CustomerIndex from './../../views/customers/Index';

import Header from './../../views/layouts/Header';

const customerRouter = {
    path: '/customers',
    name: 'Customer',
    components: {
        default: Customer,
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
            path: '/customers',
            name: 'CustomerIndex',
            component: CustomerIndex
        },
        {
            path: ':id/detail',
            name: 'CustomerDetail',
            component: CustomerDetail
        },
        {
            path: 'add',
            name: 'CustomerAdd',
            component: CustomerAdd,
            beforeEnter(to, from, next) {
                if(localStorage.getItem('roleName') === 'admin') {
                    next();
                } else {
                    next({
                        name: 'CustomerIndex'
                    })
                }
            }
        },
        {
            path: ':id/edit',
            name: 'CustomerEdit',
            component: CustomerEdit,
            beforeEnter(to, from, next) {
                if(localStorage.getItem('roleName') === 'admin') {
                    next();
                } else {
                    next({
                        name: 'CustomerIndex'
                    })
                }
            }
        }
    ]
}

export default customerRouter;