<template>
<div>
    <div class="row mt-2">
        <div id="parentNoti"></div>
        <div class="col-4">
            <h5>Add user</h5>
            <form @submit.prevent="saveUser">
                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        User name
                    </label>
                    <input 
                        type="text" 
                        class="form-control"
                        v-model.trim="$v.inputName.$model"
                        :class="{
                            'is-invalid': $v.inputName.$error,
                            'is-valid': !$v.inputName.$invalid
                        }"
                    >
                    <div class="valid-feedback">
                        Your name is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.inputName.required"
                        >
                            Name is required.
                        </span>
                        <span
                            v-if="!$v.inputName.minLength"
                        >
                            Name must have at leave {{ $v.inputName.$params.minLength.min }} letters.
                        </span>
                    </div>
                </div>

                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        Password
                    </label>
                    <input  
                        class="form-control"
                        type="password"
                        id="password"
                        v-model.trim="$v.inputPassword.$model"
                        :class="{
                            'is-invalid': $v.inputPassword.$error,
                            'is-valid': !$v.inputPassword.$invalid
                        }"
                    >
                    <div class="valid-feedback">
                        Your password is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.inputPassword.required"
                        >
                            Password is required.
                        </span>
                        <span
                            v-if="!$v.inputPassword.minLength"
                        >
                            Password must have at leave {{ $v.inputName.$params.minLength.min }} letters.
                        </span>
                    </div>
                </div>
                <div class="form-group mb-0">
                    <input
                        class="mr-0"
                        type="checkbox" 
                        id="showpassword" 
                        @click="toggleShowPassword" 
                        v-model="showPassword"
                    />
                    <label for="showpassword">Show password</label>
                </div>

                <div class="form-group mb-2">
                    <label class="mb-0">Repeat password</label>
                    <input 
                        type="password" 
                        class="form-control" 
                        v-model.trim="$v.inputRepeatPassword.$model" 
                        :class="{
                            'is-invalid': $v.inputRepeatPassword.$error, 
                            'is-valid': (inputPassword != '') ? !$v.inputRepeatPassword.$invalid : '' 
                        }" 
                    />
                    <div class="valid-feedback">Your passwords is identical.</div>
                    <div class="invalid-feedback">
                        <span 
                            v-if="!$v.inputRepeatPassword.sameAsPassword">
                            Passwords must be identical.
                        </span>
                    </div>
                </div>

                <div class="form-group mb-2">
                    <label class="mb-0">Role name</label>
                    <select 
                        class="form-control"
                        v-model.trim="$v.selectedRoleId.$model"
                        :class="{
                            'is-invalid': $v.selectedRoleId.$error, 
                            'is-valid': !$v.selectedRoleId.$invalid 
                        }"
                    >
                        <option selected="selected" value="">Choose role name</option>
                        <option
                            v-for="role in roles"
                            :key="role.role_id" 
                            :value="role.role_id"
                        >
                            {{ role.role_name }}
                        </option>
                    </select>
                    <div class="valid-feedback">
                        Your role name is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.selectedRoleId.required"
                        >
                            Role name is required.
                        </span>
                    </div>
                </div>

                <div class="form-group mb-2">
                    <label class="mb-0">Age</label>
                    <input 
                        type="number" 
                        class="form-control"
                        v-model.trim="$v.inputAge.$model"
                        :class="{
                            'is-invalid': $v.inputAge.$error,
                            'is-valid': !$v.inputAge.$invalid
                        }"
                    >
                    <div class="valid-feedback">
                        Your age is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.inputAge.required"
                        >
                            Age is required.
                        </span>
                        <span
                            v-if="!$v.inputAge.isUnique"
                        >
                            Age must be positive integer.
                        </span>
                    </div>
                </div>

                <div class="form-group mb-2">
                    <label class="mb-0">Email</label>
                    <input 
                        type="text" 
                        class="form-control"
                        v-model.trim="$v.inputEmail.$model"
                        :class="{
                            'is-invalid': $v.inputEmail.$error,
                            'is-valid': !$v.inputEmail.$invalid
                        }"
                    >
                    <div class="valid-feedback">
                        Your email is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.inputEmail.required"
                        >
                            Email is required.
                        </span>
                        <span
                            v-if="!$v.inputEmail.isUnique"
                        >
                            Email is not in the correct format.
                        </span>
                    </div>
                </div>

                <input type="hidden" class="form-control" v-model="inputIsDeleted">
                <button type="submit" class="btn btn-primary form-control mt-2">Save</button>
            </form>
            <i 
                class="fas fa-caret-left text-danger"
                data-toggle="tooltip" 
                data-placement="left"
                id="backUserTooltip"
                title="Back to user"
                @click="backUser"
            ></i>
        </div>
    </div>
</div>
</template>

<script>
import {
    required,
    minLength,
    sameAs
} from 'vuelidate/lib/validators';
export default {
    data() {
        return {
            inputAge: '',
            inputIsDeleted: 0,
            inputEmail: '',
            inputName: '',
            inputPassword: '',
            inputRepeatPassword: '',
            msgAdd: '',
            roles: '',
            showPassword: false,
            selectedRoleId: ''
        }
    },
    validations: {
        inputAge: {
            required,
            isUnique(value) {
                if(value === '') return true;
                var age_regex = /^[1-9]\d*$/;
                return new Promise((resolve) => {
                    resolve(age_regex.test(value));
                });
            }
        },
        inputEmail: {
            required,
            isUnique(value) {
                if(value === '') return true;
                var email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return new Promise((resolve) => {
                    resolve(email_regex.test(value));
                });
            }
        },
        inputName: {
            required,
            minLength: minLength(2)
        },
        inputPassword: {
            required,
            minLength: minLength(2)
        },
        inputRepeatPassword: {
            sameAsPassword: sameAs('inputPassword')
        },
        selectedRoleId: {
            required
        },
    },
    methods: {
        backUser() {
            this.$router.push({ 
                name: 'UserIndex' 
            });
        },
        getRole() {
            const headers = {
                    Authorization: 'Bearer ' + localStorage.getItem('Authorization')
                };
            this.$store.dispatch('USER/getRole', {
                headers
            })
            .then((response) => {
                //console.log(response.data.roles);
                this.roles = response.data.roles;
            })
            .catch((error) => {
                console.log(error);
            })
        },
        saveUser() {
            /* this.inputName = '';
            this.inputDayBirth = ''; */
            this.$v.$touch();
            if(this.$v.$invalid) {

            } else {
                const headers = {
                    Authorization: 'Bearer ' + localStorage.getItem('Authorization')
                };
                this.$store.dispatch('USER/createUser', {
                    user_name: this.inputName,
                    user_password: this.inputPassword,
                    role_id: this.selectedRoleId,
                    user_age: this.inputAge,
                    user_email: this.inputEmail,
                    is_deleted: this.inputIsDeleted,
                    headers
                })
                .then((response) => {
                    if(response.data.success) {
                        this.inputName = '';
                        this.inputPassword = '';
                        this.selectedRoleId = '';
                        this.inputAge = '';
                        this.inputEmail = ''; 
                        this.msgAdd = 'Add user successfull.';
                        
                        this.$router.push({
                            name: 'UserIndex'
                        });
                        this.$emit('msg-add', this.msgAdd);
                    } else {
                        let parent = document.getElementById('parentNoti');
                        parent.innerHTML = `
                            <div id="notification" class="toast" style="position: absolute; top: 5px; right: 5px; z-index: 9999; border-left: 4px solid #ffc004" data-delay="5000">
                                <div class="toast-header">
                                    <i class="far fa-bell pr-1" style="color: #ffc004"></i>
                                    <strong class="mr-auto">Notification</strong>
                                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="toast-body">
                                    ${response.data.notification}
                                </div>
                            </div>
                        `;
                        $('#notification').toast('show');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        },
        toggleShowPassword() {
            let show = document.getElementById('password');
            if(this.showPassword === false) {
                this.showPassword = true;
                show.type = 'text';
            } else {
                this.showPassword = false;
                show.type = 'password';
            }
        }
    },
    created() {
        this.getRole();
    },
     mounted() {
        $('#backUserTooltip').tooltip({ boundary: 'window' });
    }
}
</script>
    
<style scoped>
    * {
        font-size: 17px;
    }
    i {
        font-size: 28px;
        cursor: pointer;
    }
    h5 {
        font-size: 19px;
    }
</style>
