<template>
    <div class="row mt-2">
        <div id="parentNoti"></div>
        <div class="col-4">
            <h5>Add author</h5>
            <form @submit.prevent="saveAuthor">
                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        Author name
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
                <div class="form-group">
                    <label 
                        class="mb-0"
                    >
                        Day of birth
                    </label>
                    <input
                        id="date" 
                        type="text" 
                        class="form-control datepicker"
                        v-model.trim="$v.inputDayBirth.$model"
                        :class="{
                            'is-invalid': $v.inputDayBirth.$error,
                            'is-valid': !$v.inputDayBirth.$invalid
                        }"
                    >
                    <div class="valid-feedback">
                        Your day of birth is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.inputDayBirth.required"
                        >
                            Day of birth is required.
                        </span>
                        <span
                            v-if="!$v.inputDayBirth.isUnique"
                        >
                            Day of birth is not in the correct format.
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
                id="backAuthorTooltip"
                title="Back to author"
                @click="backAuthor"
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
            inputDayBirth: '',
            inputIsDeleted: 0,
            inputName: '',
            msgAdd: ''
        }
    },
    validations: {
        inputDayBirth: {
            required,
            isUnique(value) {
                if(value === '') return true;
                var date_regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
                return new Promise((resolve) => {
                    resolve(date_regex.test(value));
                });
            }
        },
        inputName: {
            required,
            minLength: minLength(2)
        }
    },
    methods: {
        backAuthor() {
            this.$router.push({ name: 'AuthorIndex' });
        },
        saveAuthor() {
            /* this.inputName = '';
            this.inputDayBirth = ''; */
            this.$v.$touch();
            if(this.$v.$invalid) {

            } else {
                console.log(this.inputDayBirth.split("-").reverse().join("-"));
                let author_day_of_birth = this.inputDayBirth.split("-").reverse().join("-");
                const headers = {
                    Authorization: 'Bearer ' + localStorage.getItem('Authorization')
                };
                this.$store.dispatch('AUTHOR/createAuthor', {
                    author_name: this.inputName,
                    author_day_of_birth,
                    is_deleted: this.inputIsDeleted,
                    headers
                })
                .then((response) => {
                    if(response.data.success) {
                        this.inputName = '';
                        this.inputDayBirth = '';
                        this.msgAdd = 'Add author successfull.';
                        
                        this.$router.push({
                            name: 'AuthorIndex'
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
        $('#date').datepicker({
            format: 'dd-mm-yyyy'
        });
        $('#backAuthorTooltip').tooltip({ boundary: 'window' });
    }
}
</script>

<style>
    * {
        font-size: 17px;
    }
    input.form-control.datepicker.gj-textbox-md {
        border: 1px solid #d2d8dd;
        height: 40px;
    }
    i.gj-icon {
        padding-top: 8px;
        padding-right: 8px;
    }
    i {
        font-size: 28px;
        cursor: pointer;
    }
</style>