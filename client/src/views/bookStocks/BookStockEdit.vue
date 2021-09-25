<template>
    <div class="row mt-2">
        <div id="parentNoti"></div>
        <div class="col-4">
            <h5>Update book stock</h5>
            <form @submit.prevent="updateBookStockById">
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
                            Instock must be integer.
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
                            Quantity must be integer.
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
            msgpdate: '',
            selectedBookId: '',
        }
    },
    validations: {
        inputInstock: {
            required,
            isUniqueIns(value) {
                if(value === '') return true;
                //console.log(typeof Number(value));
                //var instock_regex = /^\d*\.\d+$/;
                //console.log(Number.isInteger(Number(value)));
                return new Promise((resolve) => {
                    //resolve(!instock_regex.test(value));
                    resolve(Number.isInteger(Number(value)));
                });
            }
        },
        inputQuantity: {
            required,
            isUniqueQuan(value) {
                if(value === '') return true;
                //var quantity_regex = /^\d*\.\d+$/;
                return new Promise((resolve) => {
                    //resolve(!quantity_regex.test(value));
                    resolve(Number.isInteger(Number(value)));
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
        getBookStockById() {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('BOOKSTOCK/getBookStockById', {
                id: this.$route.params.id,
                headers
            })
            .then((response) => {
                //console.log(response);
                if(response.data.bookStock) {
                    this.selectedBookId = response.data.bookStock[0].book_id;
                    this.inputInstock = response.data.bookStock[0].instock;
                    this.inputRending = response.data.bookStock[0].rending;
                    this.inputQuantity = response.data.bookStock[0].quantity;
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
        updateBookStockById() {
            /* this.inputName = '';
            this.inputDayBirth = ''; */
            this.$v.$touch();
            if(this.$v.$invalid) {

            } else {
                const headers = {
                    Authorization: 'Bearer ' + localStorage.getItem('Authorization')
                };
                this.$store.dispatch('BOOKSTOCK/updateBookStockById', {
                    book_id: this.selectedBookId,
                    instock: this.inputInstock,
                    rending: this.inputRending,
                    quantity: this.inputQuantity,
                    id: this.$route.params.id,
                    headers
                })
                .then((response) => {
                    if(response.data.success) {
                        this.selectedBookId = '';
                        this.inputInstock = '';
                        this.inputRending = '';
                        this.inputQuantity = '';
                        this.msgUpdate = 'Update book stock successfull.';
                        
                        this.$router.push({
                            name: 'BookStockIndex'
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
        this.getBook();
        this.getBookStockById();
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