<template>
    <div class="col-4 mt-3">
        <h4>Author detail</h4>
        <b class="mb-0 text-center">{{ author.author_name }}</b>
        <p class="mb-0">Date created: {{ author.author_date_created | formatDate }}</p>
        <p class="mb-0">Day of birth: {{ author.author_day_of_birth | formatDate }}</p>
        <i 
            class="fas fa-caret-left text-danger"
            data-toggle="tooltip" 
            data-placement="left" 
            id="tooltipDetail"
            title="Back to author"
            @click="backAuthor"
        ></i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            author: {}
        }
    },
    methods: {
        backAuthor() {
            this.$router.push({ name: 'AuthorIndex' });
        },
        getAuthorById() {
            //console.log('getAuthorById');
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            }
            this.$store.dispatch('AUTHOR/getAuthorById', {
                id: this.$route.params.id,
                headers
            })
            .then((response) => {
                //console.log(response);
                if(response.data.author) {
                    this.author = response.data.author[0];
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
        this.getAuthorById();
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