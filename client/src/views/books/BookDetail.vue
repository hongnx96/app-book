<template>
    <div class="col-6 mt-3">
        <h4>Book detail</h4>
        <b class="mb-0 text-center">{{ book.book_name }}</b>
        <p class="mb-0">Date created: {{ book.book_date_created | formatDate }}</p>
        <p class="mb-0">Book name: {{ book.book_name }}</p>
        <p class="mb-0">Author name: {{ book.author_name }}</p>
        <p class="mb-0">Book type name: {{ book.book_type_name }}</p>
        <p class="mb-0">Book publishing house: {{ book.book_publishing_house }}</p>
        <p class="mb-0">Book publishing date: {{ book.book_publishing_date | formatDate }}</p>
        <i 
            class="fas fa-caret-left text-danger"
            data-toggle="tooltip" 
            data-placement="left" 
            id="tooltipDetail"
            title="Back to book"
            @click="backBook"
        ></i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            book: {}
        }
    },
    methods: {
        backBook() {
            this.$router.push({ 
                name: 'BookIndex' 
            });
        },
        getBookById() {
            //console.log('getAuthorById');
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            }
            this.$store.dispatch('BOOK/getBookById', {
                id: this.$route.params.id,
                headers
            })
            .then((response) => {
                //console.log(response);
                if(response.data.book) {
                    this.book = response.data.book[0];
                   /*  this.$router.push({
                        params: {
                            id: (Math.random().toString(36) + response.data.author[0].author_id).split(".")[1]
                        }
                    }); */
                } else {
                    this.$router.push({
                        name: 'Error'
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
    },
    created() {
        this.getBookById();
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
    mounted() {
        $('#tooltipDetail').tooltip({ boundary: 'window' });
    }
}
</script>

<style scoped>
    * {
        font-size: 17px;
    }
    i {
        font-size: 28px;
        cursor: pointer;
    }
</style>