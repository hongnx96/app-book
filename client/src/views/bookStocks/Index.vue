<template>
    <div class="mt-2">
        <div id="parentMsg"></div>
        <h4>
            List book stock
        </h4>
        <form class="row">
            <div class="from-group col-3">
                <label class="mb-0">Book name</label>
                <select 
                    class="form-control"
                    v-model="selectedBookId"
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
            </div>
        </form>
        <b-table-simple class="mt-2" response>
            <b-thead>
                <b-tr>
                    <b-th>#</b-th>
                    <b-th>Date created</b-th>
                    <b-th>Book name</b-th>
                    <b-th>Instock</b-th>
                    <b-th>Rending</b-th>
                    <b-th>Quantity</b-th>
                    <b-th>Actions</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr
                    v-for="(bookStock, index) in paginatedBookStocks"
                    :key="index"
                >
                    <b-td>{{ index + 1 }}</b-td>
                    <b-td>{{ bookStock.book_stock_date_created | formatDate }}</b-td>
                    <b-td>{{ bookStock.book_name }}</b-td>
                    <b-td>{{ bookStock.instock }}</b-td>
                    <b-td>{{ bookStock.rending }}</b-td>
                    <b-td>{{ bookStock.quantity }}</b-td>
                    <b-td>
                        <router-link
                            class="fas fa-edit text-warning"
                            tag="i"
                            v-show="roleName === 'admin'"
                            :to="{
                                name: 'BookStockEdit',
                                params: { id: bookStock.book_stock_id }
                            }"
                        ></router-link>
                        <router-link
                            class="fas fa-info text-info"
                            tag="i"
                            :to="{
                                name: 'BookStockDetail',
                                params: { id: bookStock.book_stock_id }
                            }"
                        ></router-link>
                        <i
                            class="fas fa-trash-alt text-danger"
                            v-show="roleName === 'admin'"
                            @click="deleteBookStockById(bookStock.book_stock_id)"
                        >
                        </i>

                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
        <b-pagination
            pills align="right"
            v-model="currentPage"
            v-show="bookStocks.length > 0"
            @change="onPageChanged"
            :per-page="perPage"
            :total-rows="rows"
        >
        </b-pagination>
    </div>
</template>

<script>
export default {
    props: {
        bookIdQuery: String
    },
    data() {
        return {
            books: [],
            bookStocks: [],
            currentPage: 1,
            isDeleted: 1,
            paginatedBookStocks: [], 
            perPage: 2,
            selectedBookId: '',
            roleName: ''

        }
    },
    methods: {
        deleteBookStockById(id) {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('BOOKSTOCK/deleteBookStockById', {
                id,
                headers
            })
            .then((response) => {
                if(response.data.success) {
                    this.searchBookStock();
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
                                Delete book stock successfull.
                            </div>
                        </div>
                    `;
                    $('#msg').toast('show');
                } else {
                    this.$router.push({
                        name: 'Error'
                    });
                }
            })
            
            //console.log(id);
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
        onPageChanged(page) {
            this.paginate(this.perPage, page - 1);
            const { book_id } = this.$route.query;
            if(book_id === undefined) {
                this.$router.push({
                    query: {
                        page
                    }
                });
            }  
            if(book_id !== ''){
                this.$router.push({
                    query: {
                        book_id,
                        page
                    }
                })
            }
        },
        paginate(page_size, page_number) {
            this.paginatedBookStocks = this.bookStocks.slice(
                page_size * page_number,
                (page_number + 1) * page_size
            );
            //console.log('paginate', this.paginatedBookStocks);
        },
        searchBookStock() {
            
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };

            if(typeof this.selectedBookId === "number") {
                this.selectedBookId = String(this.selectedBookId);
            }
            //console.log(headers.BookStockization);
            this.$store.dispatch('BOOKSTOCK/searchBookStock', {
                book_id: this.selectedBookId,
                headers: headers
            })
            .then((response) => {
                //console.log(response.data['bookstocks'][0].bookstock_id);
                this.bookStocks = response.data['bookStocks'];
                //console.log(this.bookstocks);
                let pageNumber = Math.ceil(this.bookStocks.length/this.perPage);
                localStorage.setItem('pageNumberBookStock', pageNumber);
                const { book_id } = response.data['search'];
                if(book_id === '') {
                    this.$router.push({
                        name: 'BookStockIndex'
                    }).catch(() => {});
                }
                if(book_id !== '') {
                    this.$router.push({
                        query: {
                            book_id
                        }
                    }).catch(() => {});
                }
                //console.log(response.data['bookstocks']);
                this.paginate(this.perPage, 0);
            })
            .catch((error) => {
                console.log(error);
            })
        },
    },
    created() {
        this.searchBookStock();
        this.getBook();
        if(this.bookIdQuery.length > 0) {
            this.selectedBookId = this.bookIdQuery;
        }
        this.roleName = localStorage.getItem('roleName');
        //console.log(localStorage.getItem('roleName'));
    },
    watch: {
        selectedBookId(newBookId, oldBookId) {
            if(newBookId > 0 || newBookId.length > 0 || oldBookId > 0 || oldBookId.length > 0) {
                this.searchBookStock();
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
            return this.bookStocks.length;
        }
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
</style>