<template>
<div>
    <div class="row mt-2">
        <div id="parentNoti"></div>
        <div class="col-4">
            <h5>Update user</h5>
            <form @submit.prevent="updateUserById">
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

                <button type="submit" class="btn btn-primary form-control mt-2">Update</button>
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
            inputEmail: '',
            inputName: '',
            msgUpdate: '',
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
        getUserById() {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('USER/getUserById', {
                id: this.$route.params.id,
                headers
            })
            .then((response) => {
                if(response.data.user) {
                    console.log(response.data.user);
                    this.inputName = response.data.user[0].user_name;
                    this.selectedRoleId = response.data.user[0].role_id;
                    this.inputEmail = response.data.user[0].user_email;
                    this.inputAge = response.data.user[0].user_age;
                    //this.inputId = response.data.author[0].author_id;
                    // this.$router.push({
                    //     params: {
                    //         id: (Math.random().toString(36) + response.data.author[0].author_id).split(".")[1]
                    //     }
                    // });
                } else {
                    this.$router.push({
                        name: 'Error'
                    });
                }

            })
            .catch((error) => {
                console.log(error);
            })
        },
        updateUserById() {
            /* this.inputName = '';
            this.inputDayBirth = ''; */
            console.log(this.$route.params.id);
            this.$v.$touch();
            if(this.$v.$invalid) {

            } else {
                const headers = {
                    Authorization: 'Bearer ' + localStorage.getItem('Authorization')
                };
                this.$store.dispatch('USER/updateUserById', {
                    user_name: this.inputName,
                    role_id: this.selectedRoleId,
                    user_age: this.inputAge,
                    user_email: this.inputEmail,
                    id: this.$route.params.id,
                    headers
                })
                .then((response) => {
                    if(response.data.success) {
                        this.inputName = '';
                        this.selectedRoleId = '';
                        this.inputAge = '';
                        this.inputEmail = ''; 
                        this.msgUpdate = 'Update user successfull.';
                        
                        this.$router.push({
                            name: 'UserIndex'
                        });
                        this.$emit('msg-update', this.msgUpdate);
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
        this.getUserById();
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
