<template>
    <div class="row mt-2">
        <div id="parentNoti"></div>
        <div class="col-4">
            <h5>Update role</h5>
            <form @submit.prevent="updateRoleById">
                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        Role name
                    </label>
                    <input 
                        type="text" 
                        class="form-control"
                        v-model.trim="$v.inputName.$model"
                        :class="{
                            'is-invalid': $v.inputName.$error,
                            'is-valid': !$v.inputName.$invalid
                        }"
                    >
                    <div class="valid-feedback">
                        Your name is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.inputName.required"
                        >
                            Name is required.
                        </span>
                        <span
                            v-if="!$v.inputName.minLength"
                        >
                            Name must have at leave {{ $v.inputName.$params.minLength.min }} letters.
                        </span>
                    </div>
                </div>
                <!-- <input 
                    type="hidden"
                    v-model="inputId"
                /> -->
                <button class="btn btn-primary form-control">Update</button>
            </form>
            <i 
                class="fas fa-caret-left text-danger"
                data-toggle="tooltip" 
                data-placement="left"
                id="back" 
                title="Back to role"
                @click="backRole"
            ></i>
        </div>
    </div>
</template>

<script>
import {
    required,
    minLength
} from 'vuelidate/lib/validators';
export default {
    data() {
        return {
            //inputId: '',
            inputName: '',
            msgUpdate: ''
        }
    },
    validations: {
        inputName: {
            required,
            minLength: minLength(2)
        }
    },
    methods: {
        backRole() {
            this.$router.push({ 
                name: 'RoleIndex' 
            });
        },
        getRoleById() {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('ROLE/getRoleById', {
                id: this.$route.params.id,
                headers
            })
            .then((response) => {
                if(response.data.role) {
                    this.inputName = response.data.role[0].role_name;
                    //this.inputId = response.data.role[0].role_id;
                    // this.$router.push({
                    //     params: {
                    //         id: (Math.random().toString(36) + response.data.role[0].role_id).split(".")[1]
                    //     }
                    // });
                } else {
                    this.$router.push({
                        name: 'Error'
                    });
                }

            })
            .catch((error) => {
                console.log(error);
            })
        },
        updateRoleById() {
            /* this.inputName = '';
            this.inputDayBirth = ''; */
            this.$v.$touch();
            if(this.$v.$invalid) {

            } else {
                const headers = {
                    Authorization: 'Bearer ' + localStorage.getItem('Authorization')
                };
                this.$store.dispatch('ROLE/updateRoleById', {
                    id: this.$route.params.id,
                    // id: this.inputId,
                    role_name: this.inputName,
                    headers
                })
                .then((response) => {
                    if(response.data.success) {
                        this.inputName = '';
                        this.msgUpdate = 'Update role successfull.';
                        this.$router.push({
                            name: 'RoleIndex'
                        });
                        this.$emit('msg-update', this.msgUpdate);
                    } else {
                        let parent = document.getElementById('parentNoti');
                        parent.innerHTML = `
                            <div id="notification" class="toast" style="position: absolute; top: 5px; right: 5px; z-index: 9999; border-left: 4px solid #ffc004" data-delay="5000">
                                <div class="toast-header">
                                    <i class="far fa-bell pr-1" style="color: #ffc004"></i>
                                    <strong class="mr-auto">Notification</strong>
                                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="toast-body">
                                    ${response.data.notification}
                                </div>
                            </div>
                        `;
                        $('#notification').toast('show');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }
    },
    created() {
        this.getRoleById();
    },
    mounted() {
        $('#back').tooltip({ boundary: 'window' });
    }
}
</script>

<style>
    * {
        font-size: 17px;
    }
    i {
        font-size: 28px;
        cursor: pointer;
    }
</style>