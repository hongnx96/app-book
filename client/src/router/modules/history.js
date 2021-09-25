import Header from './../../views/layouts/Header';

import History from './../../views/histories/History';
import HistoryAdd from './../../views/histories/HistoryAdd';
import HistoryDetail from './../../views/histories/HistoryDetail';
import HistoryEdit from './../../views/histories/HistoryEdit';
import HistoryIndex from './../../views/histories/Index';

const historyRouter = {
    path: '/histories',
    name: 'History',
    components: {
        default: History,
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
            path: '/histories',
            name: 'HistoryIndex',
            component: HistoryIndex
        },
        {
            path: ':id/detail',
            name: 'HistoryDetail',
            component: HistoryDetail
        },
        {
            path: 'add',
            name: 'HistoryAdd',
            component: HistoryAdd
        },
        {
            path: ':id/edit',
            name: 'HistoryEdit',
            component: HistoryEdit
        }
    ]
}

export default historyRouter;