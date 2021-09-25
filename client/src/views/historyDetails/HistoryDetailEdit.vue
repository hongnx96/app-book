<template>
    <div class="row mt-2">
        <div id="parentNoti"></div>
        <div class="col-4">
            <h5>Update history detail</h5>
            <form @submit.prevent="updateBorrowBook">
                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        Customer name
                    </label>
                    <select 
                        class="form-control"
                        v-model.trim="$v.selectedHistoryId.$model"
                        :class="{
                                'is-invalid': $v.selectedHistoryId.$error, 
                                'is-valid': !$v.selectedHistoryId.$invalid 
                            }"
                    >
                        <option selected="selected" value="">Choose customer name</option>
                        <option 
                            v-for="history in histories" 
                            :key="history.history_id" 
                            :value="history.history_id"
                        >
                            {{ history.customer_name }}
                        </option>
                    </select>
                    <div class="valid-feedback">
                        Your customer name is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.selectedHistoryId.required"
                        >
                            Customer name is required.
                        </span>
                    </div>
                </div>

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
                        <option selected="selected" value="">Choose book name</option>
                        <option 
                            v-for="book in books" 
                            :key="book.book_id" 
                            :value="book.book_id"
                        >
                            {{ book.book_name }}
                        </option>
                    </select>
                    <div class="valid-feedback">
                        Your book name is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.selectedBookId.required"
                        >
                            Book name is required.
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
                            v-if="!$v.inputQuantity.isUnique"
                        >
                            Quantity must be positive integer.
                        </span>
                    </div>
                </div>

                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        Borrow date
                    </label>
                    <input
                        id="dateBorrow" 
                        type="text" 
                        class="form-control datepicker"
                        v-model.trim="$v.inputBorrowDate.$model"
                        :class="{
                            'is-invalid': $v.inputBorrowDate.$error,
                            'is-valid': !$v.inputBorrowDate.$invalid
                        }"
                    >
                    <div class="valid-feedback">
                        Your borrow date is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.inputBorrowDate.required"
                        >
                            Borrow date is required.
                        </span>
                        <span
                            v-if="!$v.inputBorrowDate.isUnique"
                        >
                            Borrow date is not in the correct format.
                        </span>
                    </div>
                </div>

                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        Pay date
                    </label>
                    <input
                        id="datePay" 
                        type="text" 
                        class="form-control datepicker"
                        v-model.trim="$v.inputPayDate.$model"
                        :class="{
                            'is-invalid': $v.inputPayDate.$error,
                            'is-valid': !$v.inputPayDate.$invalid
                        }"
                    >
                    <div class="valid-feedback">
                        Your pay date is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.inputPayDate.required"
                        >
                            Pay date is required.
                        </span>
                        <span
                            v-if="!$v.inputPayDate.isUnique"
                        >
                            Pay date is not in the correct format.
                        </span>
                    </div>
                </div>
                <button class="btn btn-primary form-control">Update</button>
            </form>
            <i 
                class="fas fa-caret-left text-danger"
                data-toggle="tooltip" 
                data-placement="left"
                id="backHistoryDetailTooltip"
                title="Back to history detail"
                @click="backHistoryDetail"
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
            histories: [],
            historyDetail: {},
            inputBorrowDate: '',
            inputPayDate: '',
            inputQuantity: '',
            msgUpdate: '',
            msgUpdateBookStock: '', 
            selectedBookId: '',
            selectedHistoryId: ''
        }
    },
    validations: {
        inputBorrowDate: {
            required,
            isUnique(value) {
                if(value === '') return true;
                let date_regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
                return new Promise((resolve) => {
                    resolve(date_regex.test(value));
                });
            }
        },
        inputPayDate: {
            required,
            isUnique(value) {
                if(value === '') return true;
                let date_regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
                return new Promise((resolve) => {
                    resolve(date_regex.test(value));
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
        selectedBookId: {
            required
        },
        selectedHistoryId: {
            required
        }
    },
    methods: {
        backHistoryDetail() {
            this.$router.push({ 
                name: 'HistoryDetailIndex' 
            });
        },
        getBook() {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('HISTORYDETAIL/getBook', {
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
        getHistory() {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('HISTORYDETAIL/getHistory', {
                headers
            })
            .then((response) => {
                //console.log(response);
                this.histories = response.data.histories;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        getHistoryDetailById() {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('HISTORYDETAIL/getHistoryDetailById', {
                id: this.$route.params.id,
                headers
            })
            .then((response) => {
                if(response.data.historyDetail) {
                    let dateBorrow = new Date(response.data.historyDetail[0].borrowed_book_date);
                    let dayBorrow = ("0" + dateBorrow.getDate()).slice(-2);
                    let monthBorrow = ("0" + (dateBorrow.getMonth() + 1)).slice(-2);
                    let yearBorrow = dateBorrow.getFullYear();

                    let datePay = new Date(response.data.historyDetail[0].pay_book_date);
                    let dayPay = ("0" + datePay.getDate()).slice(-2);
                    let monthPay = ("0" + (datePay.getMonth() + 1)).slice(-2);
                    let yearPay = datePay.getFullYear();

                    this.inputBorrowDate = [dayBorrow, monthBorrow, yearBorrow].join("-");
                    this.inputPayDate = [dayPay, monthPay, yearPay].join("-");
                    this.inputQuantity = response.data.historyDetail[0].quantity;
                    this.selectedBookId = response.data.historyDetail[0].book_id;
                    this.selectedHistoryId = response.data.historyDetail[0].history_id;
                    //this.inputId = response.data.role[0].role_id;
                    // this.$router.push({
                    //     params: {
                    //         id: (Math.random().toString(36) + response.data.role[0].role_id).split(".")[1]
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
        updateBorrowBook() {
            /* this.inputName = '';
            this.inputDayBirth = ''; */
            this.$v.$touch();
            if(this.$v.$invalid) {

            } else {
                const headers = {
                    Authorization: 'Bearer ' + localStorage.getItem('Authorization')
                };
                this.$store.dispatch('HISTORYDETAIL/updateBorrowBook', {
                    history_id: this.selectedHistoryId,
                    book_id: this.selectedBookId,
                    quantity: this.inputQuantity,
                    borrowed_book_date: this.inputBorrowDate,
                    pay_book_date: this.inputPayDate,
                    id: this.$route.params.id,
                    headers
                })
                .then((response) => {
                    if(response.data.success) {
                        this.inputBorrowDate = '';
                        this.inputPayDate = '';
                        this.inputQuantity = '';
                        this.selectedBookId = '';
                        this.selectedHistoryId = '';
                        this.msgUpdate = 'Update borrow book successfull.';
                        this.msgUpdateBookStock = 'Update the book store successfully after updating to borrow book.'
                        
                        this.$router.push({
                            name: 'HistoryDetailIndex'
                        });
                        this.$emit('msg-update', this.msgUpdate);
                        this.$emit('msg-update-book-stock', this.msgUpdateBookStock);
                    } 
                    if(response.data.notification) {                
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
        this.getHistory();
        this.getHistoryDetailById();
    },
    mounted() {
        $('#dateBorrow').datepicker({
            format: 'dd-mm-yyyy'
        });
        $('#datePay').datepicker({
            format: 'dd-mm-yyyy'
        });
        $('#backHistoryDetailTooltip').tooltip({ boundary: 'window' });
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

    input.form-control.datepicker.gj-textbox-md {
        border: 1px solid #d2d8dd;
        height: 40px;
    }
    i.gj-icon {
        padding-top: 8px;
        padding-right: 8px;
    }
</style>