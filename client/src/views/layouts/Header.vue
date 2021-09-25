<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand">BookApp</a>
            <button 
                class="navbar-toggler" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <router-link 
                        tag="li" 
                        class="nav-item" 
                        to="/home" 
                        active-class="active" 
                        exact
                    >
                        <a class="nav-link">Home</a>
                    </router-link>
                    <li class="nav-item dropdown">
                        <a 
                            class="nav-link dropdown-toggle" 
                            id="navbarDropdown" 
                            role="button" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                        >
                            Book
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link
                                tag="a"
                                class="dropdown-item"
                                to="/authors"
                                active-class="active"
                            >
                                Author
                            </router-link>
                            <router-link
                                tag="a"
                                class="dropdown-item"
                                to="/books"
                                active-class="active"
                            >
                                Book
                            </router-link>
                            <router-link
                                tag="a"
                                class="dropdown-item"
                                to="/book-types"
                                active-class="active"
                            >
                                Book type
                            </router-link>
                        </div>
                    </li>
                    <li class="nav-item dropdown" v-show="roleName === 'admin'">
                        <a 
                            class="nav-link dropdown-toggle" 
                            id="navbarDropdown" 
                            role="button" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                        >
                            User
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link
                                tag="a"
                                class="dropdown-item"
                                to="/roles"
                                active-class="active"
                            >
                                Role
                            </router-link>
                            <router-link
                                tag="a"
                                class="dropdown-item"
                                to="/users"
                                active-class="active"
                            >
                                User
                            </router-link>
                        </div>
                    </li>
                    <router-link
                        tag="li"
                        class="nav-item"
                        to="/customers"
                        active-class="active"
                    >
                        <a class="nav-link">Customer</a>
                    </router-link>
                    <router-link
                        tag="li"
                        class="nav-item"
                        to="/book-stocks"
                        active-class="active"
                    >
                        <a class="nav-link">Book stock</a>
                    </router-link>
                    <li class="nav-item dropdown">
                        <a 
                            class="nav-link dropdown-toggle" 
                            id="navbarDropdown" 
                            role="button" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                        >
                            History
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link
                                tag="a"
                                class="dropdown-item"
                                to="/histories"
                                active-class="active"
                            >
                                History
                            </router-link>
                            <router-link
                                tag="a"
                                class="dropdown-item"
                                to="/history-details"
                                active-class="active"
                            >
                                History detail
                            </router-link>
                        </div>
                    </li>
                </ul>
                <div class="form-inline my-2 my-lg-0">
                    <router-link
                        tag="i"
                        class="fas fa-shopping-cart"
                        to="/carts"
                    ></router-link>
                    <p class="mb-4">{{ numberCart }}</p>
                    <div class="dropdown"
                        data-toggle="tooltip" 
                        data-placement="left" 
                        title="User info" 
                        id="dropTooltip"
                    >
                        <button 
                            class="btn btn-secondary dropdown-toggle" 
                            type="button" 
                            id="dropdownMenuButton" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                        >
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <div class="dropdown-item">
                                <i class="fas fa-user-circle"></i>
                                <span class="text_item">{{ userEmail }}</span>
                            </div>
                            <div class="dropdown-item logout" @click="logout">
                                <i class="fas fa-sign-in-alt"></i>
                                <span class="text_item">Logout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</div>
</template>

<script>
export default {
    data() {
        return {
            roleName: '',
            userEmail: ''
        }
    },
    methods: {
        logout() {
            console.log('logout');
            localStorage.removeItem('Authorization');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('roleName');
            localStorage.removeItem('listCart');
            this.$router.push({ name: "SignIn" });
        }
    },
    created() {
        this.userEmail = localStorage.getItem('userEmail');
        this.roleName = localStorage.getItem('roleName');

        
    },
    computed: {
        numberCart() {
            return this.$store.state.numberCart;
        }
    },
    mounted() {
        $('#dropTooltip').tooltip({ boundary: 'window' });
    },
    updated() {
        /* if(localStorage.getItem('list_cart')) {
            console.log(JSON.parse(localStorage.getItem('list_cart')).length);
            this.numberCart = JSON.parse(localStorage.getItem('list_cart')).length;
        } */
    }
}
</script>

<style scoped>
    nav.navbar.navbar-expand-lg.navbar-light.bg-light {
        height: 70px;
    }
    a.navbar-brand {
        font-size: 22px;
        font-weight: 500;
    }
    a.nav-link {
        font-size: 18px;
        font-weight: 500;
    }
    .dropdown, .navbar-brand{
        cursor: pointer;
    }
    button#dropdownMenuButton {
        background-color: #f8f9fa;
        color: black;
        border-color: #f8f9fa;
        box-shadow: none;
    }
    .dropdown-item {
        color: rgba(0,0,0,.7);
    }
    .dropdown-item:hover {
        color: black;
    }
    i {
        font-size: 18px;
    }
    .fa-shopping-cart, p {
        cursor: pointer;
    }
    .fa-shopping-cart {
        font-size: 25px;
    }
    p {
        font-weight: bold;
        width: 23px;
        height: 23px;
        margin-left: -8px;
        padding-left: 7px;
        padding-bottom: 24px;
        background-color: #dee2e6;
        border-radius: 50%;
    }
</style>
