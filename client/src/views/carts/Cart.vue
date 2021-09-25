<template>
    <div class="mt-3">
        <div id="parentMsg">
        </div>
        <div id="parentNoti">
        </div>
        <h4 class="text-center">
            Cart Management
        </h4>
        <p class="text-center">
            This is area to manage cart of website
        </p>
        <i 
            class="fa fa-backward text-primary"
            data-toggle="tooltip" 
            data-placement="top"
            id="backTooltip" 
            title="Back to book"
            @click="backBook"
        ></i>
        <h5>List cart</h5>
        <b v-show="carts.length === 0">
            The cart is empty, please add the book to the cart.
        </b>
        <table 
            class="table table-hover table-sm"
            v-show="carts.length > 0"
        >
            <thead>
                <tr>
                    <th scope="col">
                        <input 
                            type="checkbox"
                            @click="select"
                            id="selectAll" 
                        />
                    </th>
                    <th scope="col">Customer name</th>
                    <th v-show="showIdBook"></th>
                    <th scope="col">Book name</th>
                    <th style="width: 10%" scope="col">Quantity</th>
                    <th scope="col">Borrowed date</th>
                    <th scope="col">Pay date</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(cart, index) in carts"
                    :key="index"
                >
                    <td style="padding-top: 12px">
                        <input
                            name="record" 
                            type="checkbox"
                            class="checkAll"
                        />
                    </td>
                    <td>
                        <select 
                            class="form-control history_id"
                            :id="'errCustomer' + cart.bookId"
                        >
                            <option selected="selected" value="">Choose customer</option>
                            <option 
                                v-for="customer in customers" 
                                :key="customer.history_id" 
                                :value="customer.history_id"
                            >
                                {{ customer.customer_name }}
                            </option>
                        </select>
                        <span
                            class="text-danger spanCustomer"
                            style="font-size: 17px"
                            :id="'customer' + cart.bookId"
                        ></span>
                    </td>
                    <td
                        class="book_id"
                        v-show="showIdBook"
                    >
                        {{ cart.bookId }}
                    </td>
                    <td 
                        class="book_name"
                        style="padding-top: 12px"
                        :id="'book' + cart.bookId"
                    >
                        {{ cart.bookName }}
                    </td>
                    <td>
                        <input  
                            class="form-control quantity"
                            type="number"
                            :value="cart.bookQuantity"
                        />
                        <span
                            :id="'qty' + cart.bookId"
                            class="text-danger"
                            style="font-size: 17px"
                        ></span>
                    </td>
                    <td>
                        <input
                            :id="'borrowDate' + cart.bookId"
                            type="text" 
                            class="form-control datepicker borrow_date"
                        >
                        <span
                            :id="'borrow' + cart.bookId"
                            class="text-danger"
                            style="font-size: 17px"
                        ></span>
                    </td>
                    <td>
                        <input
                            :id="'payDate' + cart.bookId" 
                            type="text" 
                            class="form-control datepicker pay_date"
                        >
                        <span
                            :id="'pay' + cart.bookId"
                            class="text-danger"
                            style="font-size: 17px"
                        ></span>
                    </td>
                    <td style="padding-top: 13px">
                        <i
                            class="fas fa-trash-alt text-danger"
                            @click="deleteCartById(cart.bookId)"
                        ></i>
                    </td>
                </tr>
            </tbody>
        </table>
        <button 
            style="font-size: 20px" 
            class="btn btn-success btn-sm"
            @click="borrowBook"
            v-show="carts.length > 0"
        >
            Book loan confirmation
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            carts: [],
            customers: [],
            showIdBook: false,
            is_deleted: 0,
            status: 'borrowed'
        }
    },
    methods: {
        backBook() {
            this.$router.push({
                name: 'BookIndex'
            });
        },
        borrowBook(){
            const vm = this;
            //console.log('vm', vm);
            //console.log(document.getElementsByClassName('checkAll').checked);
            let rowTable = $('.table tr').length;
            //console.log(rowTable);
            let checkArr = [];
            for(let i = 0; i < rowTable - 1; i++) {
                let check = document.getElementsByClassName('checkAll')[i].checked;
                //console.log(check);
                checkArr.push(check);
                //document.getElementsByClassName('spanCustomer')[i + 1].innerHTML = '';
            }
            //console.log(check);
            let countFalse = 0;
            for(var i = 0; i < checkArr.length; ++i){ 
                if(checkArr[i] === false) 
                countFalse++; 
            }
            if(countFalse === rowTable - 1) {
                let parent = document.getElementById('parentNoti');
                parent.innerHTML = `
                    <div id="notification" class="toast" style="position: absolute; top: 5px; right: 5px; z-index: 9999; border-left: 4px solid #ffc004" data-delay="5000">
                        <div class="toast-header">
                            <i class="far fa-bell pr-1" style="color: #ffc004"></i>
                            <strong style="font-size: 18px" class="mr-auto">Notification</strong>
                            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                <span style="color: #ffc004" aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div style="font-size: 18px" class="toast-body">
                            Please select the book you want to borrow.
                        </div>
                    </div>
                `;
                $('#notification').toast('show');
            }
            if(countFalse < rowTable -1) {
                $("table tbody").find('input[name="record"]').each(function () {
                    if ($(this).is(":checked")) {
                        const parent = $(this).parent().parent();
                        //console.log(parent);
                        let historyId = parent.find('.history_id').val().trim();
                        //console.log('history id', historyId);
                        let bookId = parent.find('td.book_id')[0].innerText.trim();
                        console.log('book id', bookId);
                        let bookName = parent.find('td.book_name')[0].innerText.trim();
                        //console.log('book name', bookName);
                        let quantity = parent.find('.quantity').val().trim();
                        //console.log('quantity', quantity);
                        let borrowDate = parent.find('.borrow_date').val().trim();
                        //console.log('borrow date', borrowDate);
                        let payDate = parent.find('.pay_date').val().trim();
                        console.log('pay date', payDate);
                        const headers = {
                            Authorization: 'Bearer ' + localStorage.getItem('Authorization')
                        };
                        //console.log(vm.is_deleted);
                        vm.$store.dispatch('CART/borrowBook', {
                            history_id: historyId,
                            book_id: bookId,
                            quantity,
                            borrowed_book_date: borrowDate,
                            pay_book_date: payDate,
                            status: vm.status,
                            is_deleted: vm.is_deleted,
                            book_name: bookName,
                            headers
                        })
                        .then((response) => {
                            console.log(response);
                            //console.log('response', response.data._original.book_id);
                            //console.log(response.data.details[0].message.indexOf('"history_id"') !== -1);
                            if(response.data.details) {
                                if(response.data.details[0].message.indexOf('"history_id"') !== -1) {
                                document.getElementById(`customer${response.data._original.book_id}`).innerHTML = 'Customer has not been selected.';
                                // document.getElementById(`errCustomer${response.data._original.book_id}`).style.border = "2px solid #dc3545";
                                // document.getElementById(`errCustomer${response.data._original.book_id}`).style.borderRadius = "5px";
                                // document.getElementById(`errCustomer${response.data._original.book_id}`).addEventListener("focus", function () {
                                //     this.style.boxShadow = "0px 0px 0px 3px #ea7883";
                                //     this.style.border = "1px solid #d00014";
                                // });
                                //boxShadow = "2px 2px #dc3545"; //  box-shadow: none;
                                } else {
                                    document.getElementById(`customer${response.data._original.book_id}`).innerHTML = '';
                                    //document.getElementById(`errCustomer${response.data._original.book_id}`).style.border = "2px solid #dde1e5";
                                    //document.getElementById(`errCustomer${response.data._original.book_id}`).style.borderRadius = "none";
                                    // document.getElementById(`errCustomer${response.data._original.book_id}`).addEventListener("focus", function () {
                                    //     this.style.boxShadow = "0px 0px 0px 3px #007bff";
                                    //     this.style.border = "1px solid #007bff";
                                    // });
                                    
                                }

                                if(response.data.details[0].message.indexOf('"quantity"') !== -1) {
                                    console.log(response.data.details[0].message.slice(11));
                                    let strErr = response.data.details[0].message.slice(11);
                                    document.getElementById(`qty${response.data._original.book_id}`).innerHTML = 'Quantity ' + strErr + '.';
                                } else {
                                    document.getElementById(`qty${response.data._original.book_id}`).innerHTML = '';
                                }

                                // if(response.data.details[0].message.indexOf('"borrowed_book_date"') !== -1) {
                                //     console.log(response.data.details[0].message.slice(21, 1000));
                                //     let strErr = response.data.details[0].message.slice(21, 1000);
                                //     document.getElementById(`borrow${response.data._original.book_id}`).innerHTML = 'Borrowing date ' + strErr + '.';
                                // } else {
                                //     document.getElementById(`borrow${response.data._original.book_id}`).innerHTML = '';
                                // }

                                if(response.data.details[0].message.indexOf('"borrowed_book_date"') !== -1) {
                                    console.log(response.data.details[0].message.slice(21));
                                    let strErr = response.data.details[0].message.slice(21);
                                    if(response.data.details[0].message.indexOf('empty') !== -1) {
                                        document.getElementById(`borrow${response.data._original.book_id}`).innerHTML = 'Borrowing date ' + strErr + '.';
                                    }
                                    if(response.data.details[0].message.indexOf('value') !== -1) {
                                        document.getElementById(`borrow${response.data._original.book_id}`).innerHTML = 'Borrowing date is not in the correct format.';
                                    }
                                } else {
                                    document.getElementById(`borrow${response.data._original.book_id}`).innerHTML = '';
                                }

                                if(response.data.details[0].message.indexOf('"pay_book_date"') !== -1) {
                                    console.log(response.data.details[0].message.slice(16));
                                    let strErr = response.data.details[0].message.slice(16);
                                    if(response.data.details[0].message.indexOf('empty') !== -1) {
                                        document.getElementById(`pay${response.data._original.book_id}`).innerHTML = 'Pay date ' + strErr + '.';
                                    }
                                    if(response.data.details[0].message.indexOf('value') !== -1) {
                                        document.getElementById(`pay${response.data._original.book_id}`).innerHTML = 'Pay date is not in the correct format.';
                                    }

                                } else {
                                    document.getElementById(`pay${response.data._original.book_id}`).innerHTML = '';
                                }
                            }

                            if(response.data.notification) {
                                document.getElementById(`customer${response.data.book_id}`).innerHTML = '';
                                document.getElementById(`qty${response.data.book_id}`).innerHTML = '';
                                document.getElementById(`borrow${response.data.book_id}`).innerHTML = '';
                                document.getElementById(`pay${response.data.book_id}`).innerHTML = '';
                                let parentNoti = document.getElementById('parentNoti');
                                parentNoti.innerHTML = `
                                    <div id="notification" class="toast" style="position: absolute; top: 105px; right: 5px; z-index: 9999; border-left: 4px solid #ffc004" data-delay="5000">
                                        <div class="toast-header">
                                            <i class="far fa-bell pr-1" style="color: #ffc004"></i>
                                            <strong style="font-size: 18px" class="mr-auto">Notification</strong>
                                            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                                <span style="color: #ffc004" aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div style="font-size: 18px" class="toast-body">
                                            ${response.data.notification}
                                        </div>
                                    </div>
                                `;
                                $('#notification').toast('show');
                            }

                            if(response.data.success) {
                                document.getElementById(`customer${response.data.book_id}`).innerHTML = '';
                                document.getElementById(`borrow${response.data.book_id}`).innerHTML = '';
                                document.getElementById(`pay${response.data.book_id}`).innerHTML = '';
                                document.getElementById(`qty${response.data.book_id}`).innerHTML = '';
                                let parent = document.getElementById('parentMsg');
                                parent.innerHTML = `
                                    <div id="msg" class="toast" style="position: absolute; top: 5px; right: 5px; z-index: 9999; border-left: 4px solid #00c02c" data-delay="5000">
                                        <div class="toast-header">
                                            <i class="fas fa-check-circle pr-1" style="color: #00c02c; font-size: 18px"></i>
                                            <strong style="font-size: 18px" class="mr-auto">Success</strong>
                                            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                                <span style="color: #00c02c" aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div style="font-size: 18px" class="toast-body">
                                            Borrowing book successfully.
                                        </div>
                                    </div>
                                `;
                                $('#msg').toast('show');

                                console.log('book id', response.data.book_id);

                                let dataCart = JSON.parse(localStorage.getItem('listCart'));
                                for(let i = 0; i < dataCart.length; i++) {
                                    if(dataCart[i].bookId === response.data.book_id) {
                                        dataCart.splice(i, 1);
                                    }
                                }
                                localStorage.setItem('listCart', JSON.stringify(dataCart));
                                vm.getCart();
                                vm.$store.state.numberCart = JSON.parse(localStorage.getItem('listCart')).length;

                                const Header = {
                                    Authorization: 'Bearer ' + localStorage.getItem('Authorization')
                                }
                                vm.$store.dispatch('CART/updateBookStockBorrowBook', {
                                    quantity: response.data.quantity,
                                    book_id: response.data.book_id,
                                    headers: Header    
                                })
                                .then((response) => {
                                    if(response.data.success) {
                                        setTimeout(function() {
                                            let parentMsg = document.getElementById('parentMsg');
                                            parentMsg.innerHTML = `
                                                <div id="msg" class="toast" style="position: absolute; top: 5px; right: 5px; z-index: 9999; border-left: 4px solid #00c02c" data-delay="5000">
                                                    <div class="toast-header">
                                                        <i class="fas fa-check-circle pr-1" style="color: #00c02c; font-size: 18px"></i>
                                                        <strong style="font-size: 18px" class="mr-auto">Success</strong>
                                                        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                                            <span style="color: #00c02c" aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div style="font-size: 18px" class="toast-body">
                                                        Update book store successfully when borrowed book.
                                                    </div>
                                                </div>
                                            `;
                                            $('#msg').toast('show');
                                        }, 4000);
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                            }
                            
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    }
                });
            }
        },
        // validateInput(parent) {
            
        //     console.log(parent);
        // },
        deleteCartById(id) {
            console.log(id);
            let dataCart = JSON.parse(localStorage.getItem('listCart'));
            for(let i = 0; i < dataCart.length; i++) {
                if(dataCart[i].bookId === id) {
                    dataCart.splice(i, 1);
                }
            }
            localStorage.setItem('listCart', JSON.stringify(dataCart));
            this.getCart();
            this.$store.state.numberCart = JSON.parse(localStorage.getItem('listCart')).length;

            let parent = document.getElementById('parentMsg');
            parent.innerHTML = `
                <div id="msg" class="toast" style="position: absolute; top: 5px; right: 5px; z-index: 9999; border-left: 4px solid #00c02c" data-delay="5000">
                    <div class="toast-header">
                        <i class="fas fa-check-circle pr-1" style="color: #00c02c; font-size: 18px"></i>
                        <strong style="font-size: 18px" class="mr-auto">Success</strong>
                        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span style="color: #00c02c" aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div style="font-size: 18px" class="toast-body">
                        The book is successfully removed from the cart.
                    </div>
                </div>
            `;
            $('#msg').toast('show');
        },
        getCart() {
            if(localStorage.getItem('listCart') !== null) {
                this.carts = JSON.parse(localStorage.getItem('listCart'));
                console.log(this.carts);
            }
        },
        getCustomer() {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('CART/getCustomer', {
                headers
            })
            .then((response) => {
                console.log('customer', response);
                this.customers = response.data.customers;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        select() {
            //console.log('all');
            /* this.selectedBook = [];
            if(!this.selectAll) {
                for(let cart in this.carts) {
                    this.selectedBook.push(this.carts[cart]);
                }
            } */
        }
    },
    created() {
        //console.log(localStorage.getItem('listCart'));
        this.getCart();
        this.getCustomer();
    },
    mounted() {
        //$('#update').toast('show');
        //console.log(document.getElementsByClassName('page-item'));
        $('#backTooltip').tooltip({ boundary: 'window' });

        for(let i = 0; i < this.carts.length; i++) {
            $('#borrowDate' + this.carts[i].bookId).datepicker({
                format: 'dd-mm-yyyy'
            });
        }

        for(let i = 0; i < this.carts.length; i++) {
            $('#payDate' + this.carts[i].bookId).datepicker({
                format: 'dd-mm-yyyy'
            });
        }

        $("#selectAll").change(function () {
            $(".checkAll").prop('checked', $(this).prop("checked"));
        });

        $('#notification').toast('show');
        $('#msg').toast('show');
    }
}
</script>

<style scoped>
    * {
        font-size: 22px;
    }
    .fa-backward {
        font-size: 21px;
        cursor: pointer;
    }
    .fa-trash-alt {
        cursor: pointer;
    }
    td {
        font-size: 17px !important;
    }

    th {
        font-size: 18px !important;
    }
    input.form-control {
        height: 40px;
        font-size: 17px;
    }
    select.form-control {
        height: 40px;
    }
    select.form-control {
        padding-top: 2px;
    }
    select.form-control {
        font-size: 17px;
    }
    input.datepicker {
        border: 1px solid #dbdfe4;
        padding-left: 12px;
    }
    .gj-datepicker i.gj-icon {
        padding-top: 8px !important;
        padding-right: 8px !important;
    }
    /* .errCustomer {
        border: 2px solid red !important;
        border-radius: 5px !important;
    } */
</style>