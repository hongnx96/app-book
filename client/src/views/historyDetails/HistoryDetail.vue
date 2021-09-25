<template>
    <div class="mt-3">
        <div id="parentMsg">
        </div>
        <div id="parentMsgBookStock">
        </div>
        <h4 class="text-center">
            History Detail Management
        </h4>
        <p class="text-center">
            This is area to manage history detail of website
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
        </div>

        <transition name="slide">
            <router-view
                @msg-update="showMsgUpdate"
                @msg-update-book-stock="showMsgUpdateBookStock"
                :bookIdQuery="bookIdQuery"
                :historyIdQuery="historyIdQuery"
                :statusQuery="statusQuery"
            ></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bookIdQuery: '',
            historyIdQuery: '',
            statusQuery: '',
            roleName: ''
        }
    },
    methods: {
        backHome() {
            this.$router.push({
                name: 'Home'
            });
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
        showMsgUpdateBookStock(msgUpdateBookStock) {
            let parent = document.getElementById('parentMsgBookStock');
            parent.innerHTML = `
                <div id="update_book_stock" class="toast" style="position: absolute; top: 105px; right: 5px; z-index: 9999; border-left: 4px solid #00c02c" data-delay="5000">
                    <div class="toast-header">
                        <i class="fas fa-check-circle pr-1" style="color: #00c02c; font-size: 18px"></i>
                        <strong style="font-size: 18px" class="mr-auto">Success</strong>
                        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div style="font-size: 18px" class="toast-body">
                        ${msgUpdateBookStock}
                    </div>
                </div>
            `;
            $('#update_book_stock').toast('show');
        },
    },
    created() {
        let arrQuery = [
            "page",
            "history_id",
            "book_id",
            "status"
        ];
        let arrPage = [];
        for (let i = 1; i < localStorage.getItem('pageNumberHistoryDetail'); i++) {
            arrPage.push(i);
        }
        let {
            page,
            history_id,
            book_id,
            status
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
                if(key === 'history_id') {
                    this.historyIdQuery = history_id;
                }
                if(key === 'book_id') {
                    this.bookIdQuery = book_id;
                }
                if(key === 'status') {
                    this.statusQuery = status;
                }

            }

        }

        this.roleName = localStorage.getItem('roleName');
    },
    mounted() {
        //$('#update').toast('show');
        //console.log(document.getElementsByClassName('page-item'));
        $('#backTooltip').tooltip({ boundary: 'window' });
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