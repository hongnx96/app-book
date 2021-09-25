<template>
    <div class="row mt-2">
        <div id="parentNoti"></div>
        <div class="col-4">
            <h5>Update customer</h5>
            <form @submit.prevent="updateCustomerById">
                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        Customer name
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
                        Customer email
                    </label>
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
                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        Customer number phone
                    </label>
                    <input 
                        type="text" 
                        class="form-control"
                        v-model.trim="$v.inputPhone.$model"
                        :class="{
                            'is-invalid': $v.inputPhone.$error,
                            'is-valid': !$v.inputPhone.$invalid
                        }"
                    >
                    <div class="valid-feedback">
                        Your number phone is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.inputPhone.required"
                        >
                            Number phone is required.
                        </span>
                        <span
                            v-if="!$v.inputPhone.isUnique"
                        >
                            Number phone is not in the correct format.
                        </span>
                    </div>
                </div>
                <input type="hidden" v-model="inputIsDeleted">
                <button class="btn btn-primary form-control">Update</button>
            </form>
            <i 
                class="fas fa-caret-left text-danger"
                data-toggle="tooltip" 
                data-placement="left"
                id="backCustomerTooltip"
                title="Back to customer"
                @click="backCustomer"
            ></i>
        </div>
    </div>
</template>

<script>
import {
    required,
    minLength
} from 'vuelidate/lib/validators';
export default {
    data() {
        return {
            customer: {},
            inputEmail: '',
            inputIsDeleted: 0,
            inputName: '',
            inputPhone: '',
            msgUpdate: ''
        }
    },
    validations: {
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
        inputPhone: {
            required,
            isUnique(value) {
                if(value === '') return true;
                var phone_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                return new Promise((resolve) => {
                    resolve(phone_regex.test(value));
                });
            }
        }
    },
    methods: {
        backCustomer() {
            this.$router.push({ 
                name: 'CustomerIndex' 
            });
        },
        getCustomerById() {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('CUSTOMER/getCustomerById', {
                id: this.$route.params.id,
                headers
            })
            .then((response) => {
                if(response.data.customer) {
                    this.inputName = response.data.customer[0].customer_name;
                    this.inputEmail = response.data.customer[0].customer_email;
                    this.inputPhone = response.data.customer[0].customer_number_phone;
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
        updateCustomerById() {
            /* this.inputName = '';
            this.inputDayBirth = ''; */
            this.$v.$touch();
            if(this.$v.$invalid) {

            } else {
                const headers = {
                    Authorization: 'Bearer ' + localStorage.getItem('Authorization')
                };
                this.$store.dispatch('CUSTOMER/updateCustomerById', {
                    customer_name: this.inputName,
                    customer_email: this.inputEmail,
                    customer_number_phone: this.inputPhone,
                    id: this.$route.params.id,
                    headers
                })
                .then((response) => {
                    if(response.data.success) {
                        this.inputName = '';
                        this.inputEmail = '';
                        this.inputPhone = '';
                        this.msgUpdate = 'Update customer successfull.';
                        this.$router.push({
                            name: 'CustomerIndex'
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
        }
    },
    created() {
        //console.log(new Date("01-01-1100"));
        this.getCustomerById();
    },
    mounted() {
        $('#backCustomerTooltip').tooltip({ boundary: 'window' });
    }
}
</script>

<style>
    * {
        font-size: 17px;
    }
    i {
        font-size: 28px;
        cursor: pointer;
    }
</style>