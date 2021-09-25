import Vue from 'vue';
import Vuex from 'vuex';

import AuthorStore from './modules/author';
import BookStore from './modules/book';
import BookStockStore from './modules/bookStock';
import BookTypeStore from './modules/bookType';
import CartStore from './modules/cart';
import CustomerStore from './modules/customer';
import HistoryStore from './modules/history';
import HistoryDetailStore from './modules/historyDetail';
import RoleStore from './modules/role';
import UserStore from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        numberCart: localStorage.getItem('listCart') ? JSON.parse(localStorage.getItem('listCart')).length : 0
    },
    modules: {
        AUTHOR: AuthorStore,
        BOOK: BookStore,
        BOOKTYPE: BookTypeStore,
        BOOKSTOCK: BookStockStore,
        CART: CartStore,
        CUSTOMER: CustomerStore,
        HISTORY: HistoryStore,
        HISTORYDETAIL: HistoryDetailStore,
        ROLE: RoleStore,
        USER: UserStore
    }
});