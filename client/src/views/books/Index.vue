<template>
    <div class="mt-2">
        <div id="parentMsg"></div>
        <div id="parentAddToCart"></div>
        <h4>
            List book
        </h4>
        <form class="row">
            <div class="from-group col-3">
                <label class="mb-0">Book name</label>
                <input 
                    type="text" 
                    class="form-control"
                    v-model="inputBookName"    
                />
            </div>
            <div class="form-group col-3">
                <label class="mb-0">Author name</label>
                <select 
                    class="form-control"
                    v-model="inputAuthorId"
                >
                    <option selected="selected" value="">Choose author</option>
                    <option 
                        v-for="author in authors" 
                        :key="author.author_id" 
                        :value="author.author_id"
                    >
                        {{ author.author_name }}
                    </option>
                </select>
            </div>
            <div class="form-group col-3">
                <label class="mb-0">Book type name</label>
                <select 
                    class="form-control"
                    v-model="inputBookTypeId"
                >
                    <option selected="selected" value="">Choose book type</option>
                    <option 
                        v-for="bookType in bookTypes" 
                        :key="bookType.book_type_id" 
                        :value="bookType.book_type_id"
                    >
                        {{ bookType.book_type_name }}
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
                    <b-th>Author name</b-th>
                    <b-th>Book type name</b-th>
                    <b-th>Book publishing house</b-th>
                    <b-th>Book publishing date</b-th>
                    <b-th>Quantity</b-th>
                    <b-th>Actions</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr
                    v-for="(book, index) in paginatedBooks"
                    :key="index"
                >
                    <b-td>{{ index + 1 }}</b-td>
                    <b-td>{{ book.book_date_created | formatDate }}</b-td>
                    <b-td>{{ book.book_name }}</b-td>
                    <b-td>{{ book.author_name }}</b-td>
                    <b-td>{{ book.book_type_name }}</b-td>
                    <b-td>{{ book.book_publishing_house }}</b-td>
                    <b-td>{{ book.book_publishing_date | formatDate }}</b-td>
                    <b-td>{{ book.quantity }}</b-td>
                    <b-td>
                        <router-link
                            class="fas fa-edit text-warning"
                            tag="i"
                            v-show="roleName === 'admin'"
                            :to="{
                                name: 'BookEdit',
                                params: { id: book.book_id }
                            }"
                        ></router-link>
                        <router-link
                            class="fas fa-info text-info"
                            tag="i"
                            :to="{
                                name: 'BookDetail',
                                params: { id: book.book_id }
                            }"
                        ></router-link>
                        <i
                            class="fas fa-trash-alt text-danger"
                            v-show="roleName === 'admin'"
                            type="button"
                            data-toggle="modal" data-target="#deleteModal"
                            :data-id="book.book_id" 
                        >
                        </i>
                        <i 
                            class="fas fa-plus-circle text-success"
                            v-show="book.quantity > 0"
                            @click="addBookToCart(book.book_id, book.book_name)"
                        ></i>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
        <b-pagination
            pills align="right"
            v-model="currentPage"
            v-show="books.length > 0"
            @change="onPageChanged"
            :per-page="perPage"
            :total-rows="rows"
        >
        </b-pagination>

        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Delete book?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this book?
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
        bookNameQuery: String,
        authorIdQuery: String,
        bookTypeIdQuery: String
    },
    data() {
        return {
            authors: [],
            books: [],
            bookTypes: [],
            currentPage: 1,
            inputAuthorId: '',
            inputBookName: '',
            inputBookTypeId: '',
            isDeleted: 1,
            paginatedBooks: [], 
            perPage: 2,
            roleName: ''
        }
    },
    methods: {
        addBookToCart(id, name) {
            //console.log('book id', id);
            //console.log('quantity', quantity);
            //let cart = this.getCart();
            //console.log(cart);
            let book = {
                bookId: id,
                bookName: name,
                bookQuantity: 1
            }
            this.saveCart(id, book);
            // let arrCart = [];
            // arrCart.push(book)
            // localStorage.setItem('list_cart', arrCart);
            //console.log(localStorage.getItem('list_cart'));

            this.$store.state.numberCart = JSON.parse(localStorage.getItem('listCart')).length;

            let parent = document.getElementById('parentAddToCart');
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
                        Add to cart successfull.
                    </div>
                </div>
            `;
            $('#msg').toast('show');
           //console.log(this.$store.state.numberCart);
        },
        deleteBookById(id) {
           const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            }
            this.$store.dispatch('BOOK/deleteBookById', {
                id,
                headers
            })
            .then((response) => {
                if (response.data.success) {
                    this.searchBook();
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
        getCart() {
            let dataCart = localStorage.getItem('listCart');
            if(dataCart) {
                return JSON.parse(dataCart);
            } else {
                return dataCart = [];
            }
        },
        saveCart(id, book) {
            let cart = this.getCart();
            const existingBookIndex = cart.findIndex(book => book.bookId === id);
            //console.log(existingBookIndex);
            if(existingBookIndex >= 0) {
                const existingBook = cart[existingBookIndex];
                existingBook.bookQuantity += 1;
            } else {
                cart.push(book);
            }
            localStorage.setItem('listCart', JSON.stringify(cart));
            //if(cart)
        },
        // deleteBookById(id) {
        //     const headers = {
        //         Authorization: 'Bearer ' + localStorage.getItem('Authorization')
        //     };
        //     this.$store.dispatch('BOOK/deleteBookById', {
        //         id,
        //         headers
        //     })
        //     .then((response) => {
        //         if(response.data.success) {
        //             this.searchBook();
        //             let parent = document.getElementById('parentMsg');
        //             parent.innerHTML = `
        //                 <div id="msg" class="toast" style="position: absolute; top: 5px; right: 5px; z-index: 9999; border-left: 4px solid #00c02c" data-delay="5000">
        //                     <div class="toast-header">
        //                         <i class="fas fa-check-circle pr-1" style="color: #00c02c; font-size: 18px"></i>
        //                         <strong style="font-size: 18px" class="mr-auto">Success</strong>
        //                         <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        //                             <span aria-hidden="true">&times;</span>
        //                         </button>
        //                     </div>
        //                     <div style="font-size: 18px" class="toast-body">
        //                         Delete book successfull.
        //                     </div>
        //                 </div>
        //             `;
        //             $('#msg').toast('show');
        //         } else {
        //             this.$router.push({
        //                 name: 'Error'
        //             });
        //         }
        //     })
            
        //     //console.log(id);
        // },
        getAuthor() {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('BOOK/getAuthor', {
                headers
            })
            .then((response) => {
                //console.log(response);
                this.authors = response.data.authors;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        getBookType() {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('BOOK/getBookType', {
                headers
            })
            .then((response) => {
                this.bookTypes = response.data.bookTypes;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        onPageChanged(page) {
            this.paginate(this.perPage, page - 1);
            const { 
                author_id,
                book_name,
                book_type_id
            } = this.$route.query;
            if(author_id === undefined && book_name === undefined && book_type_id === undefined) {
                this.$router.push({
                    name: 'BookIndex',
                    query: {
                        page
                    }
                }).catch(() => {});
            }  
            if(author_id !== '' && book_name === undefined && book_type_id === undefined) {
                this.$router.push({
                    query: {
                        author_id,
                        page
                    }
                });
            }  
            if(author_id === undefined && book_name !== '' && book_type_id === undefined) {
                this.$router.push({
                    query: {
                        book_name,
                        page
                    }
                });
            }  
            if(author_id === undefined && book_name === undefined && book_type_id !== '') {
                this.$router.push({
                    query: {
                        book_type_id,
                        page
                    }
                });
            }  
            if(author_id !== '' && book_name !== '' && book_type_id === undefined) {
                this.$router.push({
                    query: {
                        
                        book_name,
                        author_id,
                        page
                    }
                });
            }  
            if(author_id !== '' && book_name === undefined && book_type_id !== '') {
                this.$router.push({
                    query: {
                        author_id,
                        book_type_id,
                        page
                    }
                });
            }  
            if(author_id === undefined && book_name !== '' && book_type_id !== '') {
                this.$router.push({
                    query: {
                        book_name,
                        book_type_id,
                        page
                    }
                });
            }  
            if(author_id !== '' && book_name !== '' && book_type_id !== '') {
                this.$router.push({
                    query: {
                        
                        book_name,
                        author_id,
                        book_type_id,
                        page
                    }
                });
            }  
            
        },
        paginate(page_size, page_number) {
            this.paginatedBooks = this.books.slice(
                page_size * page_number,
                (page_number + 1) * page_size
            );
            //console.log('paginate', this.paginatedAuthors);
        },
        searchBook() {
            //console.log('searchBook');
            //console.log(typeof this.inputAuthorId === 'number');
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            //console.log(headers.Authorization);
            if(typeof this.inputAuthorId === "number") {
                this.inputAuthorId = String(this.inputAuthorId);
            }
            if(typeof this.inputBookTypeId === "number") {
                this.inputBookTypeId = String(this.inputBookTypeId);
            }
            //console.log(this.inputAuthorId);
            this.$store.dispatch('BOOK/searchBook', {
                book_name: this.inputBookName,
                author_id: this.inputAuthorId,
                book_type_id: this.inputBookTypeId,
                headers: headers
            })
            .then((response) => {
                //console.log('response', response);
                //console.log(response.data['authors'][0].author_id);
                this.books = response.data['books'];
                //console.log(this.authors);
                let pageNumber = Math.ceil(this.books.length/this.perPage);
                localStorage.setItem('pageNumberBook', pageNumber);
                const { 
                    book_name,
                    author_id,
                    book_type_id     
                } = response.data['search'];
                //console.log('author_name', author_name === '');
                //console.log('book_name', book_name === '');
                //console.log('book_type_name', book_type_name === '');
                if(book_name === '' && author_id === '' && book_type_id === '') {
                    this.$router.push({
                        name: 'BookIndex'
                    }).catch(() => {});
                }  
                if(book_name === '' && author_id !== '' && book_type_id === '') {
                    this.$router.push({
                        query: {
                            author_id                        
                        }
                    }).catch(() => {});
                }  
                if(book_name !== '' && author_id === '' && book_type_id === '') {
                    this.$router.push({
                        query: {
                            book_name                        
                        }
                    }).catch(() => {});
                }  
                if(book_name === '' && author_id === '' && book_type_id !== '') {
                    this.$router.push({
                        query: {
                            book_type_id                        
                        }
                    }).catch(() => {});
                }  
                if(book_name !== '' && author_id !== '' && book_type_id === '') {
                    this.$router.push({
                        query: {
                            book_name,     
                            author_id                   
                        }
                    }).catch(() => {});
                }  
                if(book_name === '' && author_id !== '' && book_type_id !== '') {
                    this.$router.push({
                        query: {
                            author_id,
                            book_type_id                        
                        }
                    }).catch(() => {});
                }  
                if(book_name !== '' && author_id === '' && book_type_id !== '') {
                    this.$router.push({
                        query: {
                            book_name,
                            book_type_id                        
                        }
                    }).catch(() => {});
                }  
                if(book_name !== '' && author_id !== '' && book_type_id !== '') {
                    this.$router.push({
                        query: {
                            book_name,
                            author_id,
                            book_type_id                        
                        }
                    }).catch(() => {});
                } 
                //console.log(response.data['authors']);
                this.paginate(this.perPage, 0);
            })
            .catch((error) => {
                console.log(error);
            })
        },
    },
    created() {
        this.searchBook();
        this.getAuthor();
        this.getBookType();
        // if(this.bookNameQuery.length > 0) {
        //     this.inputBookName = this.bookNameQuery;
        // }
        // if(this.authorNameQuery.length > 0) {
        //     this.inputAuthorName = this.authorNameQuery;
        // }
        // if(this.bookTypeNameQuery.length > 0) {
        //     this.inputBookTypeName = this.bookTypeNameQuery;
        // }
        this.roleName = localStorage.getItem('roleName');

        if(this.bookNameQuery.length > 0) {
            //console.log('enter query');
            this.inputBookName = this.bookNameQuery;
        }
        if(this.authorIdQuery.length > 0) {
            //console.log('enter query');
            this.inputAuthorId = this.authorIdQuery;
        }
        if(this.bookTypeIdQuery.length > 0) {
            //console.log('enter query');
            this.inputBookTypeId = this.bookTypeIdQuery;
        }
        //console.log(localStorage.getItem('roleName'));
    },
    watch: {
        inputBookName(newBookName, oldBookName) {
            if(newBookName.length > 0 || oldBookName.length > 0) {
                this.searchBook();
            }
        },
        inputAuthorId(newAuthorId, oldAuthorId) {
            //console.log('inputAuthorId', newAuthorId > 0);
            if(newAuthorId > 0 || newAuthorId.length > 0 || oldAuthorId > 0 || oldAuthorId.length > 0) {
                this.searchBook();
            }
        },
        inputBookTypeId(newBookTypeId, oldBookTypeId) {
            if(newBookTypeId > 0 || newBookTypeId.length > 0 || oldBookTypeId > 0 || oldBookTypeId.length > 0) {
                this.searchBook();
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
            return this.books.length;
        }
    },
    mounted() {
        let id;
        $('#deleteModal').on('show.bs.modal', function (event) {
            let button = $(event.relatedTarget) // Button that triggered the modal
            id = button.data('id') 
        });
        $('#btnDelete').click(() => {
            this.deleteBookById(id);
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
</style>