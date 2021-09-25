import Header from './../../views/layouts/Header';

import Home from './../../views/Home';


const homeRouter = {
    path: '/home',
    name: 'Home',
    components: {
        default: Home,
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
    } 
}

export default homeRouter;