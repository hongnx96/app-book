<template>
    <div class="mt-2">
        <div id="parentMsg"></div>
        <h4>
            List user
        </h4>
        <form class="row">
            <div class="from-group col-3">
                <label class="mb-0">User name</label>
                <input 
                    type="text" 
                    class="form-control"
                    v-model="inputName"    
                />
            </div>
            <div class="form-group col-3">
                <label class="mb-0">Role name</label>
                <select 
                    class="form-control"
                    v-model="selectedRoleId"
                >
                    <option selected="selected" value="">Choose role</option>
                    <option 
                        v-for="role in roles" 
                        :key="role.role_id" 
                        :value="role.role_id"
                    >
                        {{ role.role_name }}
                    </option>
                </select>
            </div>
            <div class="from-group col-3">
                <label class="mb-0">User email</label>
                <input 
                    type="text" 
                    class="form-control"
                    v-model="inputEmail"    
                />
            </div>
        </form>
        <b-table-simple class="mt-2" response>
            <b-thead>
                <b-tr>
                    <b-th>#</b-th>
                    <b-th>Date created</b-th>
                    <b-th>User name</b-th>
                    <b-th>Role name</b-th>
                    <b-th>User age</b-th>
                    <b-th>User email</b-th>
                    <b-th>Actions</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr
                    v-for="(user, index) in paginatedUsers"
                    :key="index"
                >
                    <b-td>{{ index + 1 }}</b-td>
                    <b-td>{{ user.user_date_created | formatDate }}</b-td>
                    <b-td>{{ user.user_name }}</b-td>
                    <b-td>{{ user.role_name }}</b-td>
                    <b-td>{{ user.user_age }}</b-td>
                    <b-td>{{ user.user_email }}</b-td>
                    <b-td>
                        <router-link
                            class="fas fa-edit text-warning"
                            tag="i"
                            v-show="roleName === 'admin'"
                            :to="{
                                name: 'UserEdit',
                                params: { id: user.user_id }
                            }"
                        ></router-link>
                        <router-link
                            class="fas fa-info text-info"
                            tag="i"
                            :to="{
                                name: 'UserDetail',
                                params: { id: user.user_id }
                            }"
                        ></router-link>
                        <i
                            class="fas fa-trash-alt text-danger"
                            v-show="roleName === 'admin'"
                            @click="deleteUserById(user.user_id)"
                        >
                        </i>

                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
        <b-pagination
            pills align="right"
            v-model="currentPage"
            v-show="users.length > 0"
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
        emailQuery: String,
        nameQuery: String,
        roleIdQuery: String
    },
    data() {
        return {
            users: [],
            currentPage: 1,
            inputName: '',
            inputEmail: '',
            isDeleted: 1,
            paginatedUsers: [], 
            perPage: 1,
            roleName: '',
            roles: [],
            selectedRoleId: ''
        }
    },
    methods: {
        deleteUserById(id) {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('USER/deleteUserById', {
                id,
                headers
            })
            .then((response) => {
                if(response.data.success) {
                    this.searchUser();
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
                                Delete user successfull.
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
        getRole() {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('USER/getRole', {
                headers
            })
            .then((response) => {
                //console.log(response);
                this.roles = response.data.roles;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        onPageChanged(page) {
            this.paginate(this.perPage, page - 1);
            const { 
                name,
                role_id,
                email 
            } = this.$route.query;
             if(name === undefined && role_id === undefined && email === undefined) {
                this.$router.push({
                    name: 'UserIndex',
                    query: {
                        page
                    }
                }).catch(() => {});
            }  
            if(name !== '' && role_id === undefined && email === undefined) {
                this.$router.push({
                    query: {
                        name,
                        page
                    }
                });
            }  
            if(name === undefined && role_id !== '' && email === undefined) {
                this.$router.push({
                    query: {
                        role_id,
                        page
                    }
                });
            }  
            if(name === undefined && role_id === undefined && email !== '') {
                this.$router.push({
                    query: {
                        email,
                        page
                    }
                });
            }  
            if(name !== '' && role_id !== '' && email === undefined) {
                this.$router.push({
                    query: {
                        name,
                        role_id,
                        page
                    }
                });
            }  
            if(name !== '' && role_id === undefined && email !== '') {
                this.$router.push({
                    query: {
                        name,
                        email,
                        page
                    }
                });
            }  
            if(name === undefined && role_id !== '' && email !== '') {
                this.$router.push({
                    query: {
                        role_id,
                        email,
                        page
                    }
                });
            }  
            if(name !== '' && role_id !== '' && email !== '') {
                this.$router.push({
                    query: {
                        name,
                        role_id,
                        email,
                        page
                    }
                });
            } 
        },
        paginate(page_size, page_number) {
            this.paginatedUsers = this.users.slice(
                page_size * page_number,
                (page_number + 1) * page_size
            );
            //console.log('paginate', this.paginatedUsers);
        },
        searchUser() {
            
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            //console.log(headers.Userization);
            if(typeof this.selectedRoleId === "number") {
                this.selectedRoleId = String(this.selectedRoleId);
            }
            this.$store.dispatch('USER/searchUser', {
                user_name: this.inputName,
                role_id: this.selectedRoleId,
                user_email: this.inputEmail,
                headers: headers
            })
            .then((response) => {
                //console.log(response.data['users'][0].user_id);
                this.users = response.data['users'];
                //console.log(this.users);
                let pageNumber = Math.ceil(this.users.length/this.perPage);
                localStorage.setItem('pageNumberUser', pageNumber);
                const { 
                    user_name,
                    role_id,
                    user_email 
                } = response.data['search'];
                if(user_name === '' && role_id === '' && user_email === '') {
                    this.$router.push({
                        name: 'UserIndex'
                    }).catch(() => {});
                }  
                if(user_name === '' && role_id !== '' && user_email === '') {
                    this.$router.push({
                        query: {
                            role_id                        
                        }
                    }).catch(() => {});
                }  
                if(user_name !== '' && role_id === '' && user_email === '') {
                    this.$router.push({
                        query: {
                            name: user_name                        
                        }
                    }).catch(() => {});
                }  
                if(user_name === '' && role_id === '' && user_email !== '') {
                    this.$router.push({
                        query: {
                            email: user_email                        
                        }
                    }).catch(() => {});
                }  
                if(user_name !== '' && role_id !== '' && user_email === '') {
                    this.$router.push({
                        query: {
                            name: user_name,     
                            role_id                   
                        }
                    }).catch(() => {});
                }  
                if(user_name === '' && role_id !== '' && user_email !== '') {
                    this.$router.push({
                        query: {
                            role_id,
                            email: user_email                        
                        }
                    }).catch(() => {});
                }  
                if(user_name !== '' && role_id === '' && user_email !== '') {
                    this.$router.push({
                        query: {
                            name: user_name,
                            role_id                        
                        }
                    }).catch(() => {});
                }  
                if(user_name !== '' && role_id !== '' && user_email !== '') {
                    this.$router.push({
                        query: {
                            name: user_name,
                            role_id,
                            email: user_email                        
                        }
                    }).catch(() => {});
                }
                //console.log(response.data['users']);
                this.paginate(this.perPage, 0);
            })
            .catch((error) => {
                console.log(error);
            })
        },
    },
    created() {
        this.searchUser();
        this.getRole();
        if(this.nameQuery.length > 0) {
            this.inputName = this.nameQuery;
        }
        if(this.roleIdQuery.length > 0) {
            this.selectedRoleId = this.roleIdQuery;
        }
        if(this.emailQuery.length > 0) {
            this.inputEmail = this.emailQuery; 
        }
        this.roleName = localStorage.getItem('roleName');
        //console.log(localStorage.getItem('roleName'));
    },
    watch: {
        inputName(newName, oldName) {
            if(newName.length > 0 || oldName.length > 0) {
                this.searchUser();
            }
        },
        selectedRoleId(newRoleId, oldRoleId) {
            //console.log('inputAuthorId', newAuthorId > 0);
            if(newRoleId > 0 || newRoleId.length > 0 || oldRoleId > 0 || oldRoleId.length > 0) {
                this.searchUser();
            }
        },
        inputEmail(newEmail, oldEmail) {
            if(newEmail.length > 0 || oldEmail.length > 0) {
                this.searchUser();
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
            return this.users.length;
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