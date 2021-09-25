<template>
    <div class="col-4 mt-3">
        <h4>Book stock detail</h4>
        <b class="mb-0 text-center">{{ bookStock.book_name }}</b>
        <p class="mb-0">Date created: {{ bookStock.book_stock_date_created | formatDate }}</p>
        <p class="mb-0">Instock: {{ bookStock.instock }}</p>
        <p class="mb-0">Rending: {{ bookStock.rending }}</p>
        <p class="mb-0">Quantity: {{ bookStock.quantity }}</p>
        <i 
            class="fas fa-caret-left text-danger"
            data-toggle="tooltip" 
            data-placement="left" 
            id="tooltipDetail"
            title="Back to book stock"
            @click="backBookStock"
        ></i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bookStock: {}
        }
    },
    methods: {
        backBookStock() {
            this.$router.push({ 
                name: 'BookStockIndex' 
            });
        },
        getBookStockById() {
            //console.log('getBookStockById');
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            }
            this.$store.dispatch('BOOKSTOCK/getBookStockById', {
                id: this.$route.params.id,
                headers
            })
            .then((response) => {
                //console.log(response);
                if(response.data.bookStock) {
                    this.bookStock = response.data.bookStock[0];
                   /*  this.$router.push({
                        params: {
                            id: (Math.random().toString(36) + response.data.bookstock[0].bookstock_id).split(".")[1]
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
        this.getBookStockById();
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