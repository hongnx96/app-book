import Header from './../../views/layouts/Header';


import Role from './../../views/roles/Role';
import RoleAdd from './../../views/roles/RoleAdd';
import RoleDetail from './../../views/roles/RoleDetail';
import RoleEdit from './../../views/roles/RoleEdit';
import RoleIndex from './../../views/roles/Index';

const roleRouter = {
    path: '/roles',
    name: 'Role',
    components: {
        default: Role,
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
            path: '/roles',
            name: 'RoleIndex',
            component: RoleIndex
        },
        {
            path: ':id/detail',
            name: 'RoleDetail',
            component: RoleDetail
        },
        {
            path: 'add',
            name: 'RoleAdd',
            component: RoleAdd
        },
        {
            path: ':id/edit',
            name: 'RoleEdit',
            component: RoleEdit
        }
    ]
}

export default roleRouter;