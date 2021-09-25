import Cart from './../../views/carts/Cart';
import Header from './../../views/layouts/Header';

const cartRouter = {
    path: '/carts',
    name: 'Cart',
    components: {
        default: Cart,
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
}

export default cartRouter;