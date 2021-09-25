<template>
    <div class="row mt-2">
        <div id="parentNoti"></div>
        <div class="col-4">
            <h5>Add book stock</h5>
            <form @submit.prevent="saveBookStock">
                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        Book name
                    </label>
                    <select 
                        class="form-control"
                        v-model.trim="$v.selectedBookId.$model"
                        :class="{
                            'is-invalid': $v.selectedBookId.$error,
                            'is-valid': !$v.selectedBookId.$invalid
                        }"
                    >
                        <option selected="selected" value="">Choose book</option>
                        <option 
                            v-for="book in books" 
                            :key="book.book_id" 
                            :value="book.book_id"
                        >
                            {{ book.book_name }}
                        </option>
                    </select>
                    <div class="valid-feedback">
                        Your name is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.selectedBookId.required"
                        >
                            Name is required.
                        </span>
                    </div>
                </div>
                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        Instock
                    </label>
                    <input 
                        class="form-control"
                        @input="changeInstock"
                        type="number"
                        v-model.trim="$v.inputInstock.$model"
                        :class="{
                            'is-invalid': $v.inputInstock.$error,
                            'is-valid': !$v.inputInstock.$invalid
                        }"
                    >
                    <div class="valid-feedback">
                        Your instock is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.inputInstock.required"
                        >
                            Instock is required.
                        </span>
                        <span
                            v-if="!$v.inputInstock.isUniqueIns"
                        >
                            Instock must be positive integer.
                        </span>
                    </div>
                </div>
                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        Rending
                    </label>
                    <input 
                        type="number" 
                        class="form-control"
                        v-model.trim="$v.inputRending.$model"
                        :class="{
                            'is-invalid': $v.inputRending.$error,
                            'is-valid': !$v.inputRending.$invalid
                        }"
                    >
                    <div class="valid-feedback">
                        Your rending is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.inputRending.required"
                        >
                            Rending is required.
                        </span>
                    </div>
                </div>
                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        Quantity
                    </label>
                    <input 
                        class="form-control"
                        type="number"
                        @input="changeQuantity" 
                        v-model.trim="$v.inputQuantity.$model"
                        :class="{
                            'is-invalid': $v.inputQuantity.$error,
                            'is-valid': !$v.inputQuantity.$invalid
                        }"
                    >
                    <div class="valid-feedback">
                        Your quantity is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.inputQuantity.required"
                        >
                            Quantity is required.
                        </span>
                        <span
                            v-if="!$v.inputQuantity.isUniqueQuan"
                        >
                            Quantity must be positive integer.
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
                id="backBookStockTooltip"
                title="Back to book stock"
                @click="backBookStock"
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
            books: [],
            inputInstock: '',
            inputIsDeleted: 0,
            inputQuantity: '',
            inputRending: '',
            msgAdd: '',
            selectedBookId: '',
        }
    },
    validations: {
        inputInstock: {
            required,
            isUniqueIns(value) {
                if(value === '') return true;
                let instock_regex = /^[1-9]\d*$/;
                return new Promise((resolve) => {
                    resolve(instock_regex.test(value));
                });
            }
        },
        inputQuantity: {
            required,
            isUniqueQuan(value) {
                if(value === '') return true;
                let quantity_regex = /^[1-9]\d*$/;
                return new Promise((resolve) => {
                    resolve(quantity_regex.test(value));
                });
            }
        },
        inputRending: {
            required,
        },
        selectedBookId: {
            required,
            
        }
    },
    methods: {
        backBookStock() {
            this.$router.push({ 
                name: 'BookStockIndex' 
            });
        },
        changeInstock() {
            this.inputQuantity = this.inputInstock;
            if(this.inputInstock) {
                this.inputRending = 0;
            } else {
                 this.inputRending = '';
            }
            
        },
        changeQuantity() {
            this.inputInstock = this.inputQuantity;
            if(this.inputInstock) {
                this.inputRending = 0;
            } else {
                 this.inputRending = '';
            }
        },
        getBook() {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('BOOKSTOCK/getBook', {
                headers
            })
            .then((response) => {
                //console.log(response);
                this.books = response.data.books;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        saveBookStock() {
            /* this.inputName = '';
            this.inputDayBirth = ''; */
            this.$v.$touch();
            if(this.$v.$invalid) {

            } else {
                const headers = {
                    Authorization: 'Bearer ' + localStorage.getItem('Authorization')
                };
                this.$store.dispatch('BOOKSTOCK/createBookStock', {
                    book_id: this.selectedBookId,
                    instock: this.inputInstock,
                    rending: this.inputRending,
                    quantity: this.inputQuantity,
                    is_deleted: this.inputIsDeleted,
                    headers
                })
                .then((response) => {
                    if(response.data.success) {
                        this.inputName = '';
                        this.inputDayBirth = '';
                        this.msgAdd = 'Add book stock successfull.';
                        
                        this.$router.push({
                            name: 'BookStockIndex'
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
        this.getBook();
    },
    mounted() {
        $('#backBookStockTooltip').tooltip({ boundary: 'window' });
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