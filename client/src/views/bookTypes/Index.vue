<template>
    <div class="mt-2">
        <div id="parentMsg"></div>
        <h4>
            List book type
        </h4>
        <form class="row">
            <div class="from-group col-3">
                <label class="mb-0">Book type name</label>
                <input 
                    type="text" 
                    class="form-control"
                    v-model="inputName"    
                />
            </div>
        </form>
        <b-table-simple class="mt-2" response>
            <b-thead>
                <b-tr>
                    <b-th>#</b-th>
                    <b-th>Date created</b-th>
                    <b-th>Name</b-th>
                    <b-th>Actions</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr
                    v-for="(bookType, index) in paginatedBookTypes"
                    :key="index"
                >
                    <b-td>{{ index + 1 }}</b-td>
                    <b-td>{{ bookType.book_type_date_created | formatDate }}</b-td>
                    <b-td>{{ bookType.book_type_name }}</b-td>
                    <b-td>
                        <router-link
                            class="fas fa-edit text-warning"
                            tag="i"
                            v-show="roleName === 'admin'"
                            :to="{
                                name: 'BookTypeEdit',
                                params: { id: bookType.book_type_id }
                            }"
                        ></router-link>
                        <router-link
                            class="fas fa-info text-info"
                            tag="i"
                            :to="{
                                name: 'BookTypeDetail',
                                params: { id: bookType.book_type_id }
                            }"
                        ></router-link>
                        <i
                            class="fas fa-trash-alt text-danger"
                            v-show="roleName === 'admin'"
                            @click="deleteBookTypeById(bookType.book_type_id)"
                        >
                        </i>

                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
        <b-pagination
            pills align="right"
            v-model="currentPage"
            v-show="bookTypes.length > 0"
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
        nameQuery: String
    },
    data() {
        return {
            bookTypes: [],
            currentPage: 1,
            inputName: '',
            isDeleted: 1,
            paginatedBookTypes: [], 
            perPage: 1,
            roleName: ''

        }
    },
    methods: {
        deleteBookTypeById(id) {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('BOOKTYPE/deleteBookTypeById', {
                id,
                headers
            })
            .then((response) => {
                if(response.data.success) {
                    this.searchBookType();
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
                                Delete book type successfull.
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
        onPageChanged(page) {
            this.paginate(this.perPage, page - 1);
            const { name } = this.$route.query;
            if(name === undefined) {
                this.$router.push({
                    query: {
                        page
                    }
                });
            }  
            if(name != ''){
                this.$router.push({
                    query: {
                        name,
                        page
                    }
                })
            }
        },
        paginate(page_size, page_number) {
            this.paginatedBookTypes = this.bookTypes.slice(
                page_size * page_number,
                (page_number + 1) * page_size
            );
            //console.log('paginate', this.paginatedAuthors);
        },
        searchBookType() {
            
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            //console.log(headers.Authorization);
            this.$store.dispatch('BOOKTYPE/searchBookType', {
                book_type_name: this.inputName,
                headers: headers
            })
            .then((response) => {
                //console.log(response.data['authors'][0].author_id);
                this.bookTypes = response.data['bookTypes'];
                //console.log(this.authors);
                let pageNumber = Math.ceil(this.bookTypes.length/this.perPage);
                localStorage.setItem('pageNumberBookType', pageNumber);
                const { book_type_name } = response.data['search'];
                if(book_type_name === '') {
                    this.$router.push({
                        name: 'BookTypeIndex'
                    }).catch(() => {})
                }
                if(book_type_name !== '') {
                    this.$router.push({
                        query: {
                            name: book_type_name
                        }
                    });
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
        this.searchBookType();
        if(this.nameQuery.length > 0) {
            this.inputName = this.nameQuery;
        }
        this.roleName = localStorage.getItem('roleName');
        //console.log(localStorage.getItem('roleName'));
    },
    watch: {
        inputName(newName, oldName) {
            if(newName.length > 0 || oldName.length > 0) {
                this.searchBookType();
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
            return this.bookTypes.length;
        }
    }
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