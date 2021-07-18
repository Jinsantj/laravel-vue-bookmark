<template>
    <div>
        <div>
           <div :class="{'active': active}" style="display: none">
                <form method="POST" action="/urls" class="container form-category" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" placeholder="New category" name="name" v-model="form.name">
                    </div>
                    <p class="help is-danger" v-if="form.errors.has('name')"  v-text="form.errors.get('name')"></p>
                </div>
                
                <div class="field" :class="{'loading' : loading}">
                <div class="control" >
                    <button class="button" :disabled="form.errors.any()"><i class="fas fa-plus"></i></button>
                </div>
                </div>
            </form>
            </div>
        </div>

        <div class="collection-container addCategory" :class="{'activeButton': activeButton}">
            <i class="fas fa-plus" @click="addCollection"></i>
            <label>New Collection</label>
        </div>
        <div :class="{loading: isLoading}"  style="display: none">
            <div class="Loader__container">
                <div class="Loader__item"></div>
                <div class="Loader__item"></div>
                <div class="Loader__item"></div>
                <div class="Loader__item"></div>
                <div class="Loader__item"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: new Form({name: ''}),
            active: '',
            activeButton: '',
            loading: '',
            isLoading: '',

        }
    },

    methods: {
        onSubmit() {
            this.isLoading = true;
            this.form.post('api/categories')
            .then(cat => this.onAdded(cat))
            .catch(err => this.isLoading = false);
        },

        addCollection(){
            this.active = true;
            this.activeButton = true;
        },

        onAdded(cat) {
            this.isLoading = false;
            this.$emit('insertedCat', cat)
        }
    }
}
</script>

<style>
.active{
    display: block !important;
}


.activeButton{
    display: none !important;
}

.form-category{
    justify-content: flex-start !important;
    padding: 0.5em !important;
}

.form-category .field .control .input {
    width: 10em;
}

.form-category .field .control i {
    font-size: 1rem !important;
}

.addCategory{
    margin: 1em;  
}

.addCategory .fa-plus,
.addCategory label{
    font-size: 1rem !important;
}

.addCategory .fa-plus {
    cursor: pointer;
    margin-right: 0.5em;
}
</style>