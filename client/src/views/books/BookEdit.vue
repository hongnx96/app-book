<template>
    <div class="row mt-2">
        <div id="parentNoti"></div>
        <div class="col-4">
            <h5>Update book</h5>
            <form @submit.prevent="updateBookById">
                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        Book name
                    </label>
                    <input 
                        type="text" 
                        class="form-control"
                        v-model.trim="$v.inputBookName.$model"
                        :class="{
                            'is-invalid': $v.inputBookName.$error,
                            'is-valid': !$v.inputBookName.$invalid
                        }"
                    >
                    <div class="valid-feedback">
                        Your book name is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.inputBookName.required"
                        >
                            Book name is required.
                        </span>
                        <span
                            v-if="!$v.inputBookName.minLength"
                        >
                            Book name must have at leave {{ $v.inputName.$params.minLength.min }} letters.
                        </span>
                    </div>
                </div>
                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        Author name
                    </label>
                    <select 
                        class="form-control"
                        v-model.trim="$v.authorIdSelected.$model"
                        :class="{
                                'is-invalid': $v.authorIdSelected.$error, 
                                'is-valid': !$v.authorIdSelected.$invalid 
                            }"
                    >
                        <option selected="selected" value="">Choose author name</option>
                        <option 
                            v-for="author in authors" 
                            :key="author.author_id" 
                            :value="author.author_id"
                        >
                            {{ author.author_name }}
                        </option>
                    </select>
                    <div class="valid-feedback">
                        Your author name is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.authorIdSelected.required"
                        >
                            Author name is required.
                        </span>
                    </div>
                </div>
                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        Book type name
                    </label>
                    <select 
                        class="form-control"
                        v-model.trim="$v.bookTypeIdSelected.$model"
                        :class="{
                                'is-invalid': $v.bookTypeIdSelected.$error, 
                                'is-valid': !$v.bookTypeIdSelected.$invalid 
                            }"
                    >
                        <option selected="selected" value="">Choose book type name</option>
                        <option 
                            v-for="bookType in bookTypes" 
                            :key="bookType.book_type_id" 
                            :value="bookType.book_type_id"
                        >
                            {{ bookType.book_type_name }}
                        </option>
                    </select>
                    <div class="valid-feedback">
                        Your book type name is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.bookTypeIdSelected.required"
                        >
                            Book type name is required.
                        </span>
                    </div>
                </div>
                <div class="form-group mb-2">
                    <label 
                        class="mb-0"
                    >
                        Book publishing house
                    </label>
                    <input 
                        type="text" 
                        class="form-control"
                        v-model.trim="$v.inputBookPublishingHouse.$model"
                        :class="{
                            'is-invalid': $v.inputBookPublishingHouse.$error,
                            'is-valid': !$v.inputBookPublishingHouse.$invalid
                        }"
                    >
                    <div class="valid-feedback">
                        Your book publishing house is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.inputBookPublishingHouse.required"
                        >
                            Book publishing house is required.
                        </span>
                        <span
                            v-if="!$v.inputBookPublishingHouse.minLength"
                        >
                            Book publishing house must have at leave {{ $v.inputBookPublishingHouse.$params.minLength.min }} letters.
                        </span>
                    </div>
                </div>
                <div class="form-group">
                    <label 
                        class="mb-0"
                    >
                        Book publishing date
                    </label>
                    <input
                        id="date" 
                        type="text" 
                        class="form-control datepicker"
                        v-model.trim="$v.inputBookPublishingDate.$model"
                        :class="{
                            'is-invalid': $v.inputBookPublishingDate.$error,
                            'is-valid': !$v.inputBookPublishingDate.$invalid
                        }"
                    >
                    <div class="valid-feedback">
                        Your book publishing date is valid.
                    </div>
                    <div class="invalid-feedback">
                        <span
                            v-if="!$v.inputBookPublishingDate.required"
                        >
                            Book publishing date is required.
                        </span>
                        <span
                            v-if="!$v.inputBookPublishingDate.isUnique"
                        >
                            Book publishing date is not in the correct format.
                        </span>
                    </div>
                </div>
                <button class="btn btn-primary form-control">Update</button>
            </form>
            <i 
                class="fas fa-caret-left text-danger"
                data-toggle="tooltip" 
                data-placement="left"
                id="backBookTooltip"
                title="Back to book"
                @click="backBook"
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
            authorIdSelected: '',
            authors: {},
            bookTypeIdSelected: '',
            bookTypes: {},
            inputBookName: '',
            inputBookPublishingDate: '',
            inputBookPublishingHouse: '',
            msgUpdate: ''
        }
    },
    validations: {
        authorIdSelected: {
            required
        },
        bookTypeIdSelected: {
            required
        },
        inputBookName: {
            required,
            minLength: minLength(3)
        },
        inputBookPublishingDate: {
            required,
            isUnique(value) {
                if(value === '') return true;
                var date_regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
                return new Promise((resolve) => {
                    resolve(date_regex.test(value));
                });
            }
        },
        inputBookPublishingHouse: {
            required,
            minLength: minLength(3)
        },
    },
    methods: {
        backBook() {
            this.$router.push({ 
                name: 'BookIndex' 
            });
        },
        getAuthor() {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('BOOK/getAuthor', {
                headers
            })
            .then((response) => {
                //console.log(response);
                this.authors = response.data.authors;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        getBookById() {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('BOOK/getBookById', {
                id: this.$route.params.id,
                headers
            })
            .then((response) => {
                if(response.data.book) {
                    
                    let date = new Date(response.data.book[0].book_publishing_date);
                    let day = ("0" + date.getDate()).slice(-2);
                    let month = ("0" + (date.getMonth() + 1)).slice(-2);
                    let year = date.getFullYear();
                    this.inputBookName = response.data.book[0].book_name;
                    this.authorIdSelected = response.data.book[0].author_id;
                    this.bookTypeIdSelected = response.data.book[0].book_type_id;
                    this.inputBookPublishingHouse = response.data.book[0].book_publishing_house;
                    this.inputBookPublishingDate = [day, month, year].join("-");
                    //this.inputId = response.data.author[0].author_id;
                    // this.$router.push({
                    //     params: {
                    //         id: (Math.random().toString(36) + response.data.author[0].author_id).split(".")[1]
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
        getBookType() {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            };
            this.$store.dispatch('BOOK/getBookType', {
                headers
            })
            .then((response) => {
                this.bookTypes = response.data.bookTypes;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        updateBookById() {
            //console.log('updateBookById');
            /* this.inputName = '';
            this.inputDayBirth = ''; */
            this.$v.$touch();
            if(this.$v.$invalid) {

            } else {
                //console.log(this.inputDayBirth.split("-").reverse().join("-"));
                let book_publishing_date = this.inputBookPublishingDate.split("-").reverse().join("-");
                const headers = {
                    Authorization: 'Bearer ' + localStorage.getItem('Authorization')
                };
                this.$store.dispatch('BOOK/updateBookById', {
                    book_name: this.inputBookName,
                    author_id: this.authorIdSelected,
                    book_type_id: this.bookTypeIdSelected,
                    book_publishing_house: this.inputBookPublishingHouse,
                    book_publishing_date,
                    id: this.$route.params.id,
                    headers
                })
                .then((response) => {
                    if(response.data.success) {
                        //console.log(response);
                        this.inputBookName = '';
                        this.authorIdSelected = '';
                        this.bookTypeIdSelected = '';
                        this.inputBookPublishingHouse = '';
                        this.inputBookPublishingDate = '';
                        this.msgUpdate = 'Update book successfull.';
                        
                        this.$router.push({
                            name: 'BookIndex'
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
        //console.log(new Date("01-01-1100"));
        this.getAuthor();
        this.getBookById();
        this.getBookType();
    },
    mounted() {
        $('#date').datepicker({
            format: 'dd-mm-yyyy'
        });
        $('#backBookTooltip').tooltip({ boundary: 'window' });
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