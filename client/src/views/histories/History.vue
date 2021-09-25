<template>
    <div class="mt-3">
        <div id="parentMsg">
        </div>
        <h4 class="text-center">
            History Management
        </h4>
        <p class="text-center">
            This is area to manage history of website
        </p>
        <div class="row">
            <div class="col-3">
                <i 
                    class="fa fa-backward text-primary"
                    data-toggle="tooltip" 
                    data-placement="top"
                    id="backTooltip" 
                    title="Back to home"
                    @click="backHome"
                ></i>
                
            </div>
            <div class="col-3 offset-6 text-right">
                <i 
                    class="fas fa-plus text-success"
                    data-toggle="tooltip" 
                    data-placement="top"
                    id="addTooltip" 
                    title="Add history"
                    v-show="roleName === 'admin'"
                    @click="addHistory"
                ></i>
            </div>
        </div>

        <transition name="slide">
            <router-view
                @msg-add="showMsgAdd"
                @msg-update="showMsgUpdate"
                :nameQuery="nameQuery"
                :emailQuery="emailQuery"
                :phoneQuery="phoneQuery"
            ></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            emailQuery: '',
            nameQuery: '',
            phoneQuery: '',
            roleName: ''
        }
    },
    methods: {
        addHistory() {
            this.$router.push({
                name: 'HistoryAdd'
            });
        },
        backHome() {
            this.$router.push({
                name: 'Home'
            });
        },
        showMsgAdd(msgAdd) {
            console.log(msgAdd);
            let parent = document.getElementById('parentMsg');
            parent.innerHTML = `
                <div id="add" class="toast" style="position: absolute; top: 5px; right: 5px; z-index: 9999; border-left: 4px solid #00c02c" data-delay="5000">
                    <div class="toast-header">
                        <i class="fas fa-check-circle pr-1" style="color: #00c02c; font-size: 18px"></i>
                        <strong style="font-size: 18px" class="mr-auto">Success</strong>
                        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div style="font-size: 18px" class="toast-body">
                        ${msgAdd}
                    </div>
                </div>
            `;
            $('#add').toast('show');
        },
        showMsgUpdate(msgUpdate) {
            let parent = document.getElementById('parentMsg');
            parent.innerHTML = `
                <div id="update" class="toast" style="position: absolute; top: 5px; right: 5px; z-index: 9999; border-left: 4px solid #00c02c" data-delay="5000">
                    <div class="toast-header">
                        <i class="fas fa-check-circle pr-1" style="color: #00c02c; font-size: 18px"></i>
                        <strong style="font-size: 18px" class="mr-auto">Success</strong>
                        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div style="font-size: 18px" class="toast-body">
                        ${msgUpdate}
                    </div>
                </div>
            `;
            $('#update').toast('show');
        },
    },
    created() {
        let arrQuery = [
            "page",
            "name",
            "email",
            "phone"
        ];
        let arrPage = [];
        for (let i = 1; i < localStorage.getItem('pageNumberHistory'); i++) {
            arrPage.push(i);
        }
        let {
            page,
            name,
            email,
            phone
        } = this.$route.query;
        for(const key in this.$route.query) {
            console.log(key);
            if(arrQuery.indexOf(key) === -1) {
                this.$router.push({
                    name: 'Error'
                });
            } else {
                if(key === 'page' && arrPage.indexOf(Number(page)) === -1) {
                    this.$router.push({
                        name: 'Error'
                    });
                }
                /* if(key === 'page' && arrPage.indexOf(Number(page)) !== -1) {
                    this.pageQuery = page;
                } */
                if(key === 'name') {
                    this.nameQuery = name;
                }
                if(key === 'email') {
                    this.emailQuery = email;
                }
                if(key === 'phone') {
                    this.phoneQuery = phone;
                }

            }

        }

        this.roleName = localStorage.getItem('roleName');
    },
    mounted() {
        //$('#update').toast('show');
        //console.log(document.getElementsByClassName('page-item'));
        $('#backTooltip').tooltip({ boundary: 'window' });
        $('#addTooltip').tooltip({ boundary: 'window' });
    }
}
</script>
<style scoped>
    * {
        font-size: 22px;
    }
    .fa-backward, .fa-plus {
        font-size: 21px;
        cursor: pointer;
    }
</style>