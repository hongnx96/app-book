<template>
    <div class="row mt-2">
        <div id="parentNoti"></div>
        <div class="col-4">
            <h5>Add book type</h5>
            <form @submit.prevent="saveBookType">
                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        Book type name
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
                <input type="hidden" v-model="inputIsDeleted">
                <button class="btn btn-primary form-control">Save</button>
            </form>
            <i 
                class="fas fa-caret-left text-danger"
                data-toggle="tooltip" 
                data-placement="left"
                id="backBookTypeTooltip"
                title="Back to book type"
                @click="backBookType"
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
            inputIsDeleted: 0,
            inputName: '',
            msgAdd: ''
        }
    },
    validations: {
        inputName: {
            required,
            minLength: minLength(2)
        }
    },
    methods: {
        backBookType() {
            this.$router.push({ 
                name: 'BookTypeIndex' 
            });
        },
        saveBookType() {
            /* this.inputName = '';
            this.inputDayBirth = ''; */
            this.$v.$touch();
            if(this.$v.$invalid) {

            } else {
                const headers = {
                    Authorization: 'Bearer ' + localStorage.getItem('Authorization')
                };
                this.$store.dispatch('BOOKTYPE/createBookType', {
                    book_type_name: this.inputName,
                    is_deleted: this.inputIsDeleted,
                    headers
                })
                .then((response) => {
                    if(response.data.success) {
                        this.inputName = '';
                        this.msgAdd = 'Add book type successfull.';
                        this.$router.push({
                            name: 'BookTypeIndex'
                        });
                        this.$emit('msg-add', this.msgAdd);
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
        //console.log(new Date("01-01-1100"));
    },
    mounted() {
        $('#backBookTypeTooltip').tooltip({ boundary: 'window' });
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