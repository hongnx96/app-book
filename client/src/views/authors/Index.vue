<template>
    <div class="mt-2">
        <div id="parentMsg"></div>
        <h4>
            List author
        </h4>
        <form class="row">
            <div class="from-group col-3">
                <label class="mb-0">Author name</label>
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
                    <b-th>Day of birth</b-th>
                    <b-th>Actions</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr
                    v-for="(author, index) in paginatedAuthors"
                    :key="index"
                >
                    <b-td>{{ index + 1 }}</b-td>
                    <b-td>{{ author.author_date_created | formatDate }}</b-td>
                    <b-td>{{ author.author_name }}</b-td>
                    <b-td>{{ author.author_day_of_birth | formatDate }}</b-td>
                    <b-td>
                        <router-link
                            class="fas fa-edit text-warning"
                            tag="i"
                            v-show="roleName === 'admin'"
                            :to="{
                                name: 'AuthorEdit',
                                params: { id: author.author_id }
                            }"
                        ></router-link>
                        <router-link
                            class="fas fa-info text-info"
                            tag="i"
                            :to="{
                                name: 'AuthorDetail',
                                params: { id: author.author_id }
                            }"
                        ></router-link>
                        <i 
                            class="fas fa-trash-alt text-danger"
                            type="button"
                            data-toggle="modal" data-target="#deleteModal"
                            :data-id="author.author_id" 
                            v-show="roleName === 'admin'"
                        ></i>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
        <b-pagination
            pills align="right"
            v-model="currentPage"
            v-show="authors.length > 0"
            @change="onPageChanged"
            :per-page="perPage"
            :total-rows="rows"
        >
        </b-pagination>

        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Delete author?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this author?
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
        nameQuery: String
    },
    data() {
        return {
            authors: [],
            currentPage: 1,
            inputName: '',
            isDeleted: 1,
            paginatedAuthors: [], 
            perPage: 2,
            roleName: ''

        }
    },
    methods: {
        deleteAuthorById(id) {
           const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            }
            this.$store.dispatch('AUTHOR/deleteAuthorById', {
                id,
                headers
            })
            .then((response) => {
                if (response.data.success) {
                    this.searchAuthor();
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
        onPageChanged(page) {
            this.paginate(this.perPage, page - 1);
            const { name } = this.$route.query;
            if(name === undefined) {
                this.$router.push({
                    query: {
                        page: page
                    }
                });
            }  
            if(name != ''){
                this.$router.push({
                    query: {
                        name: name,
                        page: page
                    }
                })
            }
        },
        paginate(page_size, page_number) {
            this.paginatedAuthors = this.authors.slice(
                page_size * page_number,
                (page_number + 1) * page_size
            );
            //console.log('paginate', this.paginatedAuthors);
        },
        searchAuthor() {
            
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            //console.log(headers.Authorization);
            this.$store.dispatch('AUTHOR/searchAuthor', {
                author_name: this.inputName,
                headers: headers
            })
            .then((response) => {
                //console.log(response.data['authors'][0].author_id);
                this.authors = response.data['authors'];
                //console.log(this.authors);
                let pageNumber = Math.ceil(this.authors.length/this.perPage);
                localStorage.setItem('pageNumberAuthor', pageNumber);
                const { author_name } = response.data['search'];
                if(author_name === '') {
                    this.$router.push({
                        name: 'AuthorIndex'
                    }).catch(() => {})
                }
                if(author_name !== '') {
                    this.$router.push({
                        query: {
                            name: author_name
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
        this.searchAuthor();
        if(this.nameQuery.length > 0) {
            this.inputName = this.nameQuery;
        }
        this.roleName = localStorage.getItem('roleName');
    },
    watch: {
        inputName(newName, oldName) {
            if(newName.length > 0 || oldName.length > 0) {
                this.searchAuthor();
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
            return this.authors.length;
        }
    },
    mounted() {
        let id;
        $('#deleteModal').on('show.bs.modal', function (event) {
            let button = $(event.relatedTarget) // Button that triggered the modal
            id = button.data('id') 
        });
        $('#btnDelete').click(() => {
            this.deleteAuthorById(id);
        });
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