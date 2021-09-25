<template>
    <div class="row mt-2">
        <div id="parentNoti"></div>
        <div class="col-4">
            <h5>Add history</h5>
            <form @submit.prevent="saveHistory">
                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        History name
                    </label>
                    <select 
                        class="form-control"
                        v-model.trim="$v.customerIdSelected.$model"
                        :class="{
                                'is-invalid': $v.customerIdSelected.$error, 
                                'is-valid': !$v.customerIdSelected.$invalid 
                            }"
                    >
                        <option selected="selected" value="">Choose customer name</option>
                        <option 
                            v-for="customer in customers" 
                            :key="customer.customer_id" 
                            :value="customer.customer_id"
                        >
                            {{ customer.customer_name }}
                        </option>
                    </select>
                    <div class="valid-feedback">
                        Your name is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.customerIdSelected.required"
                        >
                            Name is required.
                        </span>
                    </div>
                </div>
                <input type="hidden" v-model="inputIsDeleted">
                <button class="btn btn-primary form-control">Save</button>
            </form>
            <i 
                class="fas fa-caret-left text-danger"
                data-toggle="tooltip" 
                data-placement="left"
                id="backHistoryTooltip"
                title="Back to history"
                @click="backHistory"
            ></i>
        </div>
    </div>
</template>

<script>
import {
    required,
} from 'vuelidate/lib/validators';
export default {
    data() {
        return {
            customers: [],
            customerIdSelected: '',
            inputIsDeleted: 0,
            msgAdd: ''
        }
    },
    validations: {
        customerIdSelected: {
            required
        }
    },
    methods: {
        backHistory() {
            this.$router.push({ 
                name: 'HistoryIndex' 
            });
        },
        getCustomer() {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('HISTORY/getCustomer', {
                headers
            })
            .then((response) => {
                //console.log(response);
                this.customers = response.data.customers;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        saveHistory() {
            /* this.inputName = '';
            this.inputDayBirth = ''; */
            this.$v.$touch();
            if(this.$v.$invalid) {

            } else {
                const headers = {
                    Authorization: 'Bearer ' + localStorage.getItem('Authorization')
                };
                this.$store.dispatch('HISTORY/createHistory', {
                    customer_id: this.customerIdSelected,
                    is_deleted: this.inputIsDeleted,
                    headers
                })
                .then((response) => {
                    if(response.data.success) {
                        this.inputName = '';
                        this.msgAdd = 'Add history successfull.';
                        
                        this.$router.push({
                            name: 'HistoryIndex'
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
        }
    },
    created() {
        //console.log(new Date("01-01-1100"));
        this.getCustomer();
    },
    mounted() {
        $('#backHistoryTooltip').tooltip({ boundary: 'window' });
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