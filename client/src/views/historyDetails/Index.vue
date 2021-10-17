<template>
    <div class="mt-2">
        <div id="parentMsg"></div>
        <h4>
            List history detail
        </h4>
        <form class="row">
            <div class="form-group col-3">
                <label class="mb-0">Customer name</label>
                <select 
                    class="form-control"
                    v-model="selectedHistoryId"
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
            </div>
            <div class="form-group col-3">
                <label class="mb-0">Book name</label>
                <select 
                    class="form-control"
                    v-model="selectedBookId"
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
            </div>
            <div class="from-group col-3">
                <label class="mb-0">Status</label>
                <input 
                    type="text" 
                    class="form-control"
                    v-model="inputStatus"    
                />
            </div>
        </form>
        <b-table-simple class="mt-2" response>
            <b-thead>
                <b-tr>
                    <b-th>#</b-th>
                    <b-th>Date created</b-th>
                    <b-th>Customer name</b-th>
                    <b-th>Borrow book</b-th>
                    <b-th>Author name</b-th>
                    <b-th>Book type name</b-th>
                    <b-th>Quantity</b-th>
                    <b-th>Borrow date</b-th>
                    <b-th>Pay date</b-th>
                    <b-th>Status</b-th>
                    <b-th>Actions</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr
                    v-for="(historyDetail, index) in paginatedHistoryDetails"
                    :key="index"
                >
                    <b-td>{{ index + 1 }}</b-td>
                    <b-td>{{ historyDetail.history_detail_date_created | formatDate }}</b-td>
                    <b-td>{{ historyDetail.customer_name }}</b-td>
                    <b-td>{{ historyDetail.book_name }}</b-td>
                    <b-td>{{ historyDetail.author_name }}</b-td>
                    <b-td>{{ historyDetail.book_type_name }}</b-td>
                    <b-td>{{ historyDetail.quantity }}</b-td>
                    <b-td>{{ historyDetail.borrowed_book_date | formatDate }}</b-td>
                    <b-td>{{ historyDetail.pay_book_date | formatDate }}</b-td>
                    <b-td>{{ historyDetail.status }}</b-td>
                    <b-td>
                        <router-link
                            class="fas fa-edit text-warning"
                            tag="i"
                            v-show="historyDetail.status === 'borrowed'"
                            :to="{
                                name: 'HistoryDetailEdit',
                                params: { id: historyDetail.history_detail_id }
                            }"
                        ></router-link>
                        <router-link
                            class="fas fa-info text-info"
                            tag="i"
                            :to="{
                                name: 'HistoryDetailInfo',
                                params: { id: historyDetail.history_detail_id }
                            }"
                        ></router-link>
                        <i
                            class="fas fa-trash-alt text-danger"
                            v-show="roleName === 'admin'"
                            type="button"
                            data-toggle="modal" data-target="#deleteModal"
                            :data-id="historyDetail.history_detail_id"
                        >
                        </i>
                        <i 
                            v-show="historyDetail.status === 'borrowed'"
                            class="fab fa-amazon-pay"
                            @click="payBook(
                                historyDetail.history_detail_id,
                                historyDetail.book_id,
                                historyDetail.quantity
                            )"
                        >
                        </i>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
        <b-pagination
            pills align="right"
            v-model="currentPage"
            v-show="historyDetails.length > 0"
            @change="onPageChanged"
            :per-page="perPage"
            :total-rows="rows"
        >
        </b-pagination>

        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Delete history detail?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this history detail?
                    </div>
                    <div class="modal-footer">
                        <button id="btnDelete" type="button" class="btn btn-danger" data-dismiss="modal">Delete</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        bookIdQuery: String,
        historyIdQuery: String,
        statusQuery: String
    },
    data() {
        return {
            books: [],
            histories: [],
            historyDetails: [],
            currentPage: 1,
            inputStatus: '',
            isDeleted: 1,
            paginatedHistoryDetails: [], 
            perPage: 1,
            roleName: '',
            selectedBookId: '',
            selectedHistoryId: '',
            status: 'paid'
        }
    },
    methods: {
        deleteHistoryDetailById(id) {
           const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            }
            this.$store.dispatch('HISTORYDETAIL/deleteHistoryDetailById', {
                id,
                headers
            })
            .then((response) => {
                if (response.data.success) {
                    this.searchHistoryDetail();
                }
            })
            .catch((error) => {
                console.log(error);
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
        onPageChanged(page) {
            this.paginate(this.perPage, page - 1);
            const { 
                history_id,
                book_id,
                status
            } = this.$route.query;
            if(history_id === undefined && book_id === undefined && status === undefined) {
                this.$router.push({
                    name: 'HistoryDetailIndex',
                    query: {
                        page
                    }
                }).catch(() => {});
            }  
            if(history_id !== '' && book_id === undefined && status === undefined) {
                this.$router.push({
                    query: {
                        history_id,
                        page
                    }
                });
            }  
            if(history_id === undefined && book_id !== '' && status === undefined) {
                this.$router.push({
                    query: {
                        book_id,
                        page
                    }
                });
            }  
            if(history_id === undefined && book_id === undefined && status !== '') {
                this.$router.push({
                    query: {
                        status,
                        page
                    }
                });
            }  
            if(history_id !== '' && book_id !== '' && status === undefined) {
                this.$router.push({
                    query: {
                        history_id,
                        book_id,
                        page
                    }
                });
            }  
            if(history_id !== '' && book_id === undefined && status !== '') {
                this.$router.push({
                    query: {
                        history_id,
                        status,
                        page
                    }
                });
            }  
            if(history_id === undefined && book_id !== '' && status !== '') {
                this.$router.push({
                    query: {
                        book_id,
                        status,
                        page
                    }
                });
            }  
            if(history_id !== '' && book_id !== '' && status !== '') {
                this.$router.push({
                    query: {
                        history_id,
                        book_id,
                        status,
                        page
                    }
                });
            } 
        },
        paginate(page_size, page_number) {
            this.paginatedHistoryDetails = this.historyDetails.slice(
                page_size * page_number,
                (page_number + 1) * page_size
            );
            //console.log('paginate', this.paginatedHistorys);
        },
        payBook(history_detail_id, book_id, quantity) {
            console.log(history_detail_id);
            console.log(book_id);
            console.log(quantity);

            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };

            this.$store.dispatch('HISTORYDETAIL/payBook', {
                status: this.status,
                history_detail_id,
                headers
            })
            .then((response) => {
                if(response.data.success) {
                    this.$router.push({
                        name: 'HistoryDetailIndex'
                    }).catch(() => {});
                    let parent = document.getElementById('parentMsg');
                    parent.innerHTML = `
                        <div id="msg" class="toast" style="position: absolute; top: 5px; right: 5px; z-index: 9999; border-left: 4px solid #00c02c" data-delay="5000">
                            <div class="toast-header">
                                <i class="fas fa-check-circle pr-1" style="color: #00c02c; font-size: 18px"></i>
                                <strong style="font-size: 18px" class="mr-auto">Success</strong>
                                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div style="font-size: 18px" class="toast-body">
                                Paid book successfull.
                            </div>
                        </div>
                    `;
                    $('#msg').toast('show');

                    this.$store.dispatch('HISTORYDETAIL/updateBookStockPayBook', {
                        book_id,
                        quantity,
                        headers
                    })
                    .then((response) => {
                        if(response.data.success) {
                            setTimeout(function() {
                                let parent = document.getElementById('parentMsg');
                                parent.innerHTML = `
                                    <div id="msg" class="toast" style="position: absolute; top: 5px; right: 5px; z-index: 9999; border-left: 4px solid #00c02c" data-delay="5000">
                                        <div class="toast-header">
                                            <i class="fas fa-check-circle pr-1" style="color: #00c02c; font-size: 18px"></i>
                                            <strong style="font-size: 18px" class="mr-auto">Success</strong>
                                            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div style="font-size: 18px" class="toast-body">
                                            Update book stock successfull.
                                        </div>
                                    </div>
                                `;
                                $('#msg').toast('show');
                            }, 3000);
                            setTimeout(function() {
                                location.reload();
                            }, 4000);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                } else {
                    this.$router.push({
                        name: 'Error'
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
        searchHistoryDetail() {
            
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };

            if(typeof this.selectedHistoryId === "number") {
                this.selectedHistoryId = String(this.selectedHistoryId);
            }
            if(typeof this.selectedBookId === "number") {
                this.selectedBookId = String(this.selectedBookId);
            }

            //console.log(headers.Historyization);
            this.$store.dispatch('HISTORYDETAIL/searchHistoryDetail', {
                history_id: this.selectedHistoryId,
                book_id: this.selectedBookId,
                status: this.inputStatus,
                headers: headers
            })
            .then((response) => {
                //console.log(response.data['historys'][0].history_id);
                this.historyDetails = response.data['historyDetails'];
                //console.log(this.historys);
                let pageNumber = Math.ceil(this.historyDetails.length/this.perPage);
                localStorage.setItem('pageNumberHistoryDetail', pageNumber);
                const { 
                    history_id,
                    book_id,
                    status 
                } = response.data['search'];
                if(history_id === '' && book_id === '' && status === '') {
                    this.$router.push({
                        name: 'HistoryDetailIndex'
                    }).catch(() => {});
                }  
                if(history_id === '' && book_id !== '' && status === '') {
                    this.$router.push({
                        query: {
                            book_id                        
                        }
                    }).catch(() => {});
                }  
                if(history_id !== '' && book_id === '' && status === '') {
                    this.$router.push({
                        query: {
                            history_id                        
                        }
                    }).catch(() => {});
                }  
                if(history_id === '' && book_id === '' && status !== '') {
                    this.$router.push({
                        query: {
                            status                        
                        }
                    }).catch(() => {});
                }  
                if(history_id !== '' && book_id !== '' && status === '') {
                    this.$router.push({
                        query: {
                            history_id,     
                            book_id                 
                        }
                    }).catch(() => {});
                }  
                if(history_id === '' && book_id !== '' && status !== '') {
                    this.$router.push({
                        query: {
                            book_id,
                            status                        
                        }
                    }).catch(() => {});
                }  
                if(history_id !== '' && book_id === '' && status !== '') {
                    this.$router.push({
                        query: {
                            history_id,
                            status                        
                        }
                    }).catch(() => {});
                }  
                if(history_id !== '' && book_id !== '' && status !== '') {
                    this.$router.push({
                        query: {
                            history_id,
                            book_id,
                            status                        
                        }
                    }).catch(() => {});
                } 
                //console.log(response.data['historys']);
                this.paginate(this.perPage, 0);
            })
            .catch((error) => {
                console.log(error);
            });
        },
    },
    created() {
        this.searchHistoryDetail();
        this.getBook();
        this.getHistory();

        if(this.historyIdQuery.length > 0) {
            this.selectedHistoryId = this.historyIdQuery;
        }
        if(this.bookIdQuery.length > 0) {
            this.selectedBookId = this.bookIdQuery;
        }
        if(this.statusQuery.length > 0) {
            this.inputStatus = this.statusQuery;
        }
        this.roleName = localStorage.getItem('roleName');
        //console.log(localStorage.getItem('roleName'));
    },
    watch: {
        selectedHistoryId(newHistoryId, oldHistoryId) {
            console.log(newHistoryId);
            if(newHistoryId > 0 || oldHistoryId > 0 || newHistoryId.length > 0 || oldHistoryId.length > 0) {
                this.searchHistoryDetail();
            }
            // if(newHistoryId.length > 0 || oldHistoryId.length > 0) {
            //     this.searchHistoryDetail();
            // }
        },
        selectedBookId(newBookId, oldBookId) {
            if(newBookId > 0 || oldBookId > 0 || newBookId.length > 0 || oldBookId.length > 0) {
                this.searchHistoryDetail();
            }
            // if(newBookId.length > 0 || oldBookId.length > 0) {
            //     this.searchHistoryDetail();
            // }
        },
        inputStatus(newStatus, oldStatus) {
            if(newStatus.length > 0 || oldStatus.length > 0) {
                this.searchHistoryDetail();
            }
        }
    },
    filters: {
        formatDate(value) {
            //console.log(value);
            let date = new Date(value);
            //console.log('date', date);
            let day = ("0" + date.getDate()).slice(-2);
            let month = ("0" + (date.getMonth() + 1)).slice(-2);
            let year = date.getFullYear();
            return [day, month, year].join("-");
        }
    },
    computed: {
        rows() {
            return this.historyDetails.length;
        }
    },
    mounted() {
        let id;
        $('#deleteModal').on('show.bs.modal', function (event) {
            let button = $(event.relatedTarget) // Button that triggered the modal
            id = button.data('id') 
        });
        $('#btnDelete').click(() => {
            this.deleteHistoryDetailById(id);
        });
    },
}
</script>

<style scoped>
    * {
        font-size: 16px;
    } 
    h4 {
        font-size: 17px;
    }
    .fas {
        padding-right: 7px;
        cursor: pointer;
        /* color: rgba(0,0,0,.5); */
    }
    /* .fas:hover {
        color: rgba(0,0,0,1);
    } */
    .fa-amazon-pay {
        cursor: pointer;
        color: #6f42c1;
        font-weight: 600;
    }
</style>