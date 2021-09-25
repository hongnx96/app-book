<template>
    <div class="col-4 mt-3">
        <h4>Role detail</h4>
        <b class="mb-0 text-center">{{ role.role_name }}</b>
        <p class="mb-0">Date created: {{ role.role_date_created | formatDate }}</p>
        <i 
            class="fas fa-caret-left text-danger"
            data-toggle="tooltip" 
            data-placement="left" 
            id="tooltipDetail"
            title="Back to role"
            @click="backRole"
        ></i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            role: {}
        }
    },
    methods: {
        backRole() {
            this.$router.push({ name: 'RoleIndex' });
        },
        getRoleById() {
            //console.log('getRoleById');
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            }
            this.$store.dispatch('ROLE/getRoleById', {
                id: this.$route.params.id,
                headers
            })
            .then((response) => {
                //console.log(response);
                if(response.data.role) {
                    this.role = response.data.role[0];
                   /*  this.$router.push({
                        params: {
                            id: (Math.random().toString(36) + response.data.role[0].role_id).split(".")[1]
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
        this.getRoleById();
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