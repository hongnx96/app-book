import Vue from 'vue';
import Router from 'vue-router';

import authorRouter from './modules/author';
import bookRouter from './modules/book';
import bookStockRouter from './modules/bookStock';
import bookTypeRouter from './modules/bookType';
import cartRouter from './modules/cart';
import customerRouter from './modules/customer';
import errorRouter from './modules/404';
import historyRouter from './modules/history';
import historyDetailRouter from './modules/historyDetail';
import homeRouter from './modules/home';
import roleRouter from './modules/role';
import signInRouter from './modules/signIn';
import userRouter from './modules/user';

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        authorRouter,
        bookRouter,
        bookStockRouter,
        bookTypeRouter,
        cartRouter,
        customerRouter,
        errorRouter,
        historyRouter,
        historyDetailRouter,
        homeRouter,
        roleRouter,
        signInRouter,
        userRouter,
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
