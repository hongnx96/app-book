<template>
    <div class="col-4 mt-3">
        <h4>User detail</h4>
        <hr class="mt-0 mb-1">
        <b class="mb-0 text-center">{{ user.user_name }}</b>
        <p class="mb-0">Date created: {{ user.user_date_created | formatDate }}</p>
        <p class="mb-0">Role name: {{ user.role_name }}</p>
        <p class="mb-0">User age: {{ user.user_age }}</p>
        <p class="mb-0">User email: {{ user.user_email }}</p>
        <i 
            class="fas fa-caret-left text-danger"
            data-toggle="tooltip" 
            data-placement="left" 
            id="tooltipDetail"
            title="Back to user"
            @click="backUser"
        ></i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {}
        }
    },
    methods: {
        backUser() {
            this.$router.push({ 
                name: 'UserIndex' 
            });
        },
        getUserById() {
            //console.log('getUserById');
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            }
            this.$store.dispatch('USER/getUserById', {
                id: this.$route.params.id,
                headers
            })
            .then((response) => {
                //console.log(response);
                if(response.data.user) {
                    this.user = response.data.user[0];
                   /*  this.$router.push({
                        params: {
                            id: (Math.random().toString(36) + response.data.user[0].user_id).split(".")[1]
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
        this.getUserById();
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
        font-size: 20px;
    }
</style>