<template>
    <div class="col-6 mt-3">
        <h4>Customer detail</h4>
        <b class="mb-0 text-center">{{ customer.customer_name }}</b>
        <p class="mb-0">Date created: {{ customer.customer_date_created | formatDate }}</p>
        <p class="mb-0">Customer email: {{ customer.customer_email }}</p>
        <p class="mb-0">Customer name: {{ customer.customer_number_phone }}</p>
        <i 
            class="fas fa-caret-left text-danger"
            data-toggle="tooltip" 
            data-placement="left" 
            id="tooltipDetail"
            title="Back to customer"
            @click="backCustomer"
        ></i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            customer: {}
        }
    },
    methods: {
        backCustomer() {
            this.$router.push({ 
                name: 'CustomerIndex' 
            });
        },
        getCustomerById() {
            //console.log('getCustomerById');
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            }
            this.$store.dispatch('CUSTOMER/getCustomerById', {
                id: this.$route.params.id,
                headers
            })
            .then((response) => {
                //console.log(response);
                if(response.data.customer) {
                    this.customer = response.data.customer[0];
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
        this.getCustomerById();
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