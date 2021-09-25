<template>
    <div class="col-4 mt-3">
        <h4>History detail info</h4>
        <hr class="mt-0 mb-2">
        <b class="mb-0 text-center">{{ historyDetail.customer_name }}</b>
        <p class="mb-0">Date created: {{ historyDetail.history_detail_date_created | formatDate }}</p>
        <p class="mb-0">Borrow book: {{ historyDetail.book_name }}</p>
        <p class="mb-0">Author name: {{ historyDetail.author_name }}</p>
        <p class="mb-0">Book type name: {{ historyDetail.book_type_name }}</p>
        <p class="mb-0">Quantity: {{ historyDetail.quantity }}</p>
        <p class="mb-0">Borrow date: {{ historyDetail.borrowed_book_date | formatDate }}</p>
        <p class="mb-0">Pay date: {{ historyDetail.pay_book_date | formatDate }}</p>
        <p class="mb-0">Status: {{ historyDetail.status }}</p>
        <i 
            class="fas fa-caret-left text-danger"
            data-toggle="tooltip" 
            data-placement="left" 
            id="tooltipDetail"
            title="Back to history detail"
            @click="backHistoryDetail"
        ></i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            historyDetail: {}
        }
    },
    methods: {
        backHistoryDetail() {
            this.$router.push({ 
                name: 'HistoryDetailIndex' 
            });
        },
        getHistoryDetailById() {
            //console.log('getCustomerById');
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            }
            this.$store.dispatch('HISTORYDETAIL/getHistoryDetailById', {
                id: this.$route.params.id,
                headers
            })
            .then((response) => {
                //console.log(response);
                if(response.data.historyDetail) {
                    this.historyDetail = response.data.historyDetail[0];
                   /*  this.$router.push({
                        params: {
                            id: (Math.random().toString(36) + response.data.customer[0].customer_id).split(".")[1]
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
        this.getHistoryDetailById();
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
    h4 {
        font-size: 19px;
    }
</style>