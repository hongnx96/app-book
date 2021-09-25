<template>
    <div class="mt-2">
        <div id="parentMsg"></div>
        <h4>
            List history
        </h4>
        <form class="row">
            <div class="from-group col-3">
                <label class="mb-0">Name</label>
                <input 
                    type="text" 
                    class="form-control"
                    v-model="inputName"    
                />
            </div>
            <div class="from-group col-3">
                <label class="mb-0">Email</label>
                <input 
                    type="text" 
                    class="form-control"
                    v-model="inputEmail"    
                />
            </div>
            <div class="from-group col-3">
                <label class="mb-0">Phone</label>
                <input 
                    type="text" 
                    class="form-control"
                    v-model="inputPhone"    
                />
            </div>
        </form>
        <b-table-simple class="mt-2" response>
            <b-thead>
                <b-tr>
                    <b-th>#</b-th>
                    <b-th>Date created</b-th>
                    <b-th>Name</b-th>
                    <b-th>Email</b-th>
                    <b-th>Phone</b-th>
                    <b-th>Actions</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr
                    v-for="(history, index) in paginatedHistories"
                    :key="index"
                >
                    <b-td>{{ index + 1 }}</b-td>
                    <b-td>{{ history.history_date_created | formatDate }}</b-td>
                    <b-td>{{ history.customer_name }}</b-td>
                    <b-td>{{ history.customer_email }}</b-td>
                    <b-td>{{ history.customer_number_phone }}</b-td>
                    <b-td>
                        <router-link
                            class="fas fa-edit text-warning"
                            tag="i"
                            v-show="roleName === 'admin'"
                            :to="{
                                name: 'HistoryEdit',
                                params: { id: history.history_id }
                            }"
                        ></router-link>
                        <router-link
                            class="fas fa-info text-info"
                            tag="i"
                            :to="{
                                name: 'HistoryDetail',
                                params: { id: history.history_id }
                            }"
                        ></router-link>
                        <i
                            class="fas fa-trash-alt text-danger"
                            v-show="roleName === 'admin'"
                            @click="deleteHistoryById(history.history_id)"
                        >
                        </i>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
        <b-pagination
            pills align="right"
            v-model="currentPage"
            v-show="histories.length > 0"
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
        nameQuery: String,
        emailQuery: String,
        phoneQuery: String
    },
    data() {
        return {
            histories: [],
            currentPage: 1,
            inputEmail: '',
            inputName: '',
            inputPhone: '',
            isDeleted: 1,
            paginatedHistories: [], 
            perPage: 1,
            roleName: ''

        }
    },
    methods: {
        deleteHistoryById(id) {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('HISTORY/deleteHistoryById', {
                id,
                headers
            })
            .then((response) => {
                if(response.data.success) {
                    this.searchHistory();
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
                                Delete history successfull.
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
            const { 
                name,
                email,
                phone
            } = this.$route.query;
            if(name === undefined && email === undefined && phone === undefined) {
                this.$router.push({
                    name: 'HistoryIndex',
                    query: {
                        page
                    }
                }).catch(() => {});
            }  
            if(name !== '' && email === undefined && phone === undefined) {
                this.$router.push({
                    query: {
                        name,
                        page
                    }
                });
            }  
            if(name === undefined && email !== '' && phone === undefined) {
                this.$router.push({
                    query: {
                        email,
                        page
                    }
                });
            }  
            if(name === undefined && email === undefined && phone !== '') {
                this.$router.push({
                    query: {
                        phone,
                        page
                    }
                });
            }  
            if(name !== '' && email !== '' && phone === undefined) {
                this.$router.push({
                    query: {
                        name,
                        email,
                        page
                    }
                });
            }  
            if(name !== '' && email === undefined && phone !== '') {
                this.$router.push({
                    query: {
                        name,
                        phone,
                        page
                    }
                });
            }  
            if(name === undefined && email !== '' && phone !== '') {
                this.$router.push({
                    query: {
                        email,
                        phone,
                        page
                    }
                });
            }  
            if(name !== '' && email !== '' && phone !== '') {
                this.$router.push({
                    query: {
                        name,
                        email,
                        phone,
                        page
                    }
                });
            } 
        },
        paginate(page_size, page_number) {
            this.paginatedHistories = this.histories.slice(
                page_size * page_number,
                (page_number + 1) * page_size
            );
            //console.log('paginate', this.paginatedHistorys);
        },
        searchHistory() {
            
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            //console.log(headers.Historyization);
            this.$store.dispatch('HISTORY/searchHistory', {
                customer_name: this.inputName,
                customer_email: this.inputEmail,
                customer_number_phone: this.inputPhone,
                headers: headers
            })
            .then((response) => {
                //console.log(response.data['historys'][0].history_id);
                this.histories = response.data['histories'];
                //console.log(this.historys);
                let pageNumber = Math.ceil(this.histories.length/this.perPage);
                localStorage.setItem('pageNumberHistory', pageNumber);
                const { 
                    customer_name,
                    customer_email,
                    customer_number_phone 
                } = response.data['search'];
                if(customer_name === '' && customer_email === '' && customer_number_phone === '') {
                    this.$router.push({
                        name: 'HistoryIndex'
                    }).catch(() => {});
                }  
                if(customer_name === '' && customer_email !== '' && customer_number_phone === '') {
                    this.$router.push({
                        query: {
                            email: customer_email                        
                        }
                    }).catch(() => {});
                }  
                if(customer_name !== '' && customer_email === '' && customer_number_phone === '') {
                    this.$router.push({
                        query: {
                            name: customer_name                        
                        }
                    }).catch(() => {});
                }  
                if(customer_name === '' && customer_email === '' && customer_number_phone !== '') {
                    this.$router.push({
                        query: {
                            phone: customer_number_phone                        
                        }
                    }).catch(() => {});
                }  
                if(customer_name !== '' && customer_email !== '' && customer_number_phone === '') {
                    this.$router.push({
                        query: {
                            name: customer_name,     
                            email: customer_email                   
                        }
                    }).catch(() => {});
                }  
                if(customer_name === '' && customer_email !== '' && customer_number_phone !== '') {
                    this.$router.push({
                        query: {
                            email: customer_email,
                            phone: customer_number_phone                        
                        }
                    }).catch(() => {});
                }  
                if(customer_name !== '' && customer_email === '' && customer_number_phone !== '') {
                    this.$router.push({
                        query: {
                            name: customer_name,
                            phone: customer_number_phone                        
                        }
                    }).catch(() => {});
                }  
                if(customer_name !== '' && customer_email !== '' && customer_number_phone !== '') {
                    this.$router.push({
                        query: {
                            name: customer_name,
                            email: customer_email,
                            phone: customer_number_phone                        
                        }
                    }).catch(() => {});
                } 
                //console.log(response.data['historys']);
                this.paginate(this.perPage, 0);
            })
            .catch((error) => {
                console.log(error);
            })
        },
    },
    created() {
        this.searchHistory();
        if(this.nameQuery.length > 0) {
            this.inputName = this.nameQuery;
        }
        if(this.emailQuery.length > 0) {
            this.inputEmail = this.emailQuery;
        }
        if(this.phoneQuery.length > 0) {
            this.inputPhone = this.phoneQuery;
        }
        this.roleName = localStorage.getItem('roleName');
        //console.log(localStorage.getItem('roleName'));
    },
    watch: {
        inputName(newName, oldName) {
            if(newName.length > 0 || oldName.length > 0) {
                this.searchHistory();
            }
        },
        inputEmail(newEmail, oldEmail) {
            if(newEmail.length > 0 || oldEmail.length > 0) {
                this.searchHistory();
            }
        },
        inputPhone(newPhone, oldPhone) {
            if(newPhone.length > 0 || oldPhone.length > 0) {
                this.searchHistory();
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
            return this.histories.length;
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