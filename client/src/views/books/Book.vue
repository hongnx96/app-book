<template>
    <div class="mt-3">
        <div id="parentMsg">
        </div>
        <h4 class="text-center">
            Book Management
        </h4>
        <p class="text-center">
            This is area to manage book of website
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
                    title="Add book"
                    v-show="roleName === 'admin'"
                    @click="addBook"
                ></i>
            </div>
        </div>

        <transition name="slide">
            <router-view
                @msg-add="showMsgAdd"
                @msg-update="showMsgUpdate"
                :bookNameQuery="bookNameQuery"
                :authorIdQuery="authorIdQuery"
                :bookTypeIdQuery="bookTypeIdQuery"
            ></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            authorIdQuery: '',
            bookNameQuery: '',
            bookTypeIdQuery: '',
            roleName: ''
        }
    },
    methods: {
        addBook() {
            this.$router.push({
                name: 'BookAdd'
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
            "book_name",
            "author_id",
            "book_type_id"
        ];
        let arrPage = [];
        for (let i = 1; i < localStorage.getItem('pageNumberBook'); i++) {
            arrPage.push(i);
        }
        let {
            page,
            book_name,
            author_id,
            book_type_id
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
                if(key === 'book_name') {
                    this.bookNameQuery = book_name;
                }
                if(key === 'author_id') {
                    this.authorIdQuery = author_id;
                    console.log('authorIdQuery', this.authorIdQuery);
                }
                if(key === 'book_type_id') {
                    this.bookTypeIdQuery = book_type_id;
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
        color: black;
        font-size: 21px;
        cursor: pointer;
    }
</style>