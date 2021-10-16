<template>
<div>
    <div class="row mt-4">
        <div class="col-4"></div>
        <div class="col-4">
            <h5 class="text-center">Sign In</h5>
            <form @submit.prevent="signIn">
                <div class="mb-2">
                    <label 
                        class="form-label"
                    >
                        Email
                    </label>
                    <input 
                        type="text" 
                        class="form-control"
                        v-model.trim="$v.email.$model"
                        :class="{
                            'is-invalid': $v.email.$error,
                            'is-valid': !$v.email.$invalid
                        }"
                    />
                    <div class="valid-feedback">
                        Your email is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.email.required"
                        >
                            Email is required.
                        </span>
                        <span
                            v-if="!$v.email.isUnique"
                        >
                            Email is not in the correct format.
                        </span>
                    </div>
                    <div 
                        class="alert alert-danger"
                        role="alert"
                        id="notiEmail"
                        v-show="isShowEmail"
                    ></div>
                </div>
                <div class="mb-2">
                    <label 
                        class="form-label"
                    >
                        Password
                    </label>
                    <input 
                        id="password" 
                        type="password" 
                        class="form-control"
                        v-model.trim="$v.password.$model"
                        :class="{
                            'is-invalid': $v.password.$error,
                            'is-valid': !$v.password.$invalid
                        }"
                    />
                    <div class="valid-feedback">
                        Your password is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.password.required"
                        >
                            Password is required.
                        </span>
                        <span
                            v-if="!$v.password.minLength"
                        >
                            Password {{ $v.password.$params.minLength.min }} characters min.
                        </span>
                    </div>
                    <div 
                        class="alert alert-danger"
                        role="alert"
                        id="notiPassword"
                        v-show="isShowPassword"
                    ></div>
                </div>
                <div>
                    <input 
                        type="checkbox" 
                        id="showPassword" 
                        @click="toggleShowPassword" 
                        v-model="showPassword" 
                    />
                    <label for="showpassword">Show password</label>
                </div>
                <button type="submit" class="btn btn-primary form-control">Sign Up</button>
            </form>
        </div>
        <div class="col-4"></div>
    </div>
</div>
</template>

<script>
import {
    required,
    minLength,
    email
} from 'vuelidate/lib/validators';
export default {
    data() {
        return {
            email: '',
            isShowEmail: false,
            isShowPassword: false,
            password: '',
            showPassword: false,
        }
    },
    validations: {
        email: {
            required,
            email,
            isUnique(value) {
                if (value === '') return true;
                let email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return new Promise((resolve) => {
                    resolve(email_regex.test(value));
                });
            }
        },
        password: {
            required,
            minLength: minLength(6)
        }
    },
    methods: {
        toggleShowPassword() {
            let show = document.getElementById('password');
            if(this.showPassword === false) {
                this.showPassword === true;
                show.type = 'text';
            } else {
                this.showPassword === false;
                show.type = 'password';
            }
        },
        signIn() {
            this.isShowEmail = false;
            this.isShowPassword = false;
            this.$v.$touch();
            if(this.$v.$invalid) {

            } else {
               
                this.$store.dispatch('USER/signIn', {
                    user_email: this.email,
                    user_password: this.password
                })
                .then((response) => {
                    //console.log(response);
                    if(response.data.success) {
                        localStorage.setItem('Authorization', response.data.Authorization);
                        localStorage.setItem('userEmail', response.data.user_email);
                        localStorage.setItem('roleName', response.data.role_name);
                        this.$router.push({
                            name: 'Home'
                        });
                    }
                    if(response.data.notificationEmail) {
                        this.isShowEmail = true;
                        this.isShowPassword = false;
                        let eleEmail = document.getElementById('notiEmail');
                        eleEmail.textContent = `${response.data.notificationEmail}`;
                    }
                    if(response.data.notificationPassword) {
                        this.isShowPassword = true;
                        this.isShowEmail = false;
                        let elePassword = document.getElementById('notiPassword');
                        elePassword.textContent = `${response.data.notificationPassword}`;
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        }
    }
}
</script>
