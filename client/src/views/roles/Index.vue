<template>
    <div class="mt-2">
        <div id="parentMsg"></div>
        <h4>
            List role
        </h4>
        <form class="row">
            <div class="from-group col-3">
                <label class="mb-0">Role name</label>
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
                    v-for="(role, index) in paginatedRoles"
                    :key="index"
                >
                    <b-td>{{ index + 1 }}</b-td>
                    <b-td>{{ role.role_date_created | formatDate }}</b-td>
                    <b-td>{{ role.role_name }}</b-td>
                    <b-td>
                        <router-link
                            class="fas fa-edit text-warning"
                            tag="i"
                            v-show="roleName === 'admin'"
                            :to="{
                                name: 'RoleEdit',
                                params: { id: role.role_id }
                            }"
                        ></router-link>
                        <router-link
                            class="fas fa-info text-info"
                            tag="i"
                            :to="{
                                name: 'RoleDetail',
                                params: { id: role.role_id }
                            }"
                        ></router-link>
                        <i
                            class="fas fa-trash-alt text-danger"
                            v-show="roleName === 'admin'"
                            type="button"
                            data-toggle="modal" data-target="#deleteModal"
                            :data-id="role.role_id"
                        >
                        </i>

                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
        <b-pagination
            pills align="right"
            v-model="currentPage"
            v-show="roles.length > 0"
            @change="onPageChanged"
            :per-page="perPage"
            :total-rows="rows"
        >
        </b-pagination>

        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Delete role?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this role?
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
            roles: [],
            currentPage: 1,
            inputName: '',
            isDeleted: 1,
            paginatedRoles: [], 
            perPage: 2,
            roleName: ''

        }
    },
    methods: {
        deleteRoleById(id) {
           const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            }
            this.$store.dispatch('ROLE/deleteRoleById', {
                id,
                headers
            })
            .then((response) => {
                if (response.data.success) {
                    this.searchRole();
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
            if(name !== ''){
                this.$router.push({
                    query: {
                        name: name,
                        page: page
                    }
                })
            }
        },
        paginate(page_size, page_number) {
            this.paginatedRoles = this.roles.slice(
                page_size * page_number,
                (page_number + 1) * page_size
            );
            //console.log('paginate', this.paginatedAuthors);
        },
        searchRole() {
            
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            //console.log(headers.Authorization);
            this.$store.dispatch('ROLE/searchRole', {
                role_name: this.inputName,
                headers: headers
            })
            .then((response) => {
                //console.log(response.data['authors'][0].author_id);
                this.roles = response.data['roles'];
                //console.log(this.authors);
                let pageNumber = Math.ceil(this.roles.length/this.perPage);
                localStorage.setItem('pageNumberRole', pageNumber);
                const { role_name } = response.data['search'];
                if(role_name === '') {
                    this.$router.push({
                        name: 'RoleIndex'
                    }).catch(() => {})
                }
                if(role_name !== '') {
                    this.$router.push({
                        query: {
                            name: role_name
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
        this.searchRole();
        if(this.nameQuery.length > 0) {
            this.inputName = this.nameQuery;
        }
        this.roleName = localStorage.getItem('roleName');
        //console.log(localStorage.getItem('roleName'));
    },
    watch: {
        inputName(newName, oldName) {
            if(newName.length > 0 || oldName.length > 0) {
                this.searchRole();
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
            return this.roles.length;
        }
    },
    mounted() {
        let id;
        $('#deleteModal').on('show.bs.modal', function (event) {
            let button = $(event.relatedTarget) // Button that triggered the modal
            id = button.data('id') 
        });
        $('#btnDelete').click(() => {
            this.deleteRoleById(id);
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