import Header from './../../views/layouts/Header';

import HistoryDetail from './../../views/historyDetails/HistoryDetail';
import HistoryDetailEdit from './../../views/historyDetails/HistoryDetailEdit';
import HistoryDetailIndex from './../../views/historyDetails/Index';
import HistoryDetailInfo from './../../views/historyDetails/HistoryDetailInfo';


const historyDetailRouter = {
    path: '/history-details',
    name: 'HistoryDetail',
    components: {
        default: HistoryDetail,
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
            path: '/history-details',
            name: 'HistoryDetailIndex',
            component: HistoryDetailIndex
        },
        {
            path: ':id/info',
            name: 'HistoryDetailInfo',
            component: HistoryDetailInfo
        },
        {
            path: ':id/edit',
            name: 'HistoryDetailEdit',
            component: HistoryDetailEdit
        }
    ]
}

export default historyDetailRouter;