import Error from './../../views/404';

const errorRouter = {
    path: '/404',
    name: 'Error',
    component: Error,
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

export default errorRouter;