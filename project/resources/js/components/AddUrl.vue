<template>
    <div class="addUrl">
        <div :class="{'active': active}" style="display: none">
            <form method="POST" action="/urls" class="container" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
                <div class="field">
                    <div class="control">
                        <select class="input" required="" name="category"  v-model="form.category">
                                <option value="" selected disabled hidden>Select a collection</option>    
                                <option :value="category.id"  v-for="category in categories" :key="category.id">{{category.name}}</option>
                        </select>
                        <p class="help is-danger" v-if="form.errors.has('category')"  v-text="form.errors.get('category')"></p>
                    </div>
                </div>

                <div class="field">
                    <div class="control">
                        <input class="input" type="text" placeholder="Name" name="name" v-model="form.name">
                    </div>
                    <p class="help is-danger" v-if="form.errors.has('name')"  v-text="form.errors.get('name')"></p>
                </div>

                <div class="field">
                    <div class="control">
                        <input class="input" type="text" placeholder="Paste URL" name="url" v-model="form.url">
                    </div>
                    <p class="help is-danger" v-if="form.errors.has('url')"  v-text="form.errors.get('url')"></p>
                </div>
                
                <div class="field">
                  <div class="control" >
                      <button class="button" :disabled="form.errors.any()"><i class="fas fa-plus"></i></button>
                  </div>
                </div>

                <div class="field">
                  <div class="control" >
                      <button class="button" @click.prevent="toggleCollection" type="cancel"><i class="fas fa-times"></i></button>
                  </div>
                </div>
            </form>
    </div>

    <div class="collection-container" :class="{'activeButton': activeButton}">
        <i class="fas fa-plus" @click="toggleCollection"></i>
        <label>New Bookmark</label>
    </div>
    <p class="emptyCategoryLabel" v-if="this.isEmptyCategory">Lets begin by creating a new collection.</p>
    <div v-if="this.isFailed">
        <div class="modal">
          <i class="fas fa-times" @click.prevent="clear"></i>
            <div class="modal-content">
              <h1>An Error Occcurred</h1>
              <ul>
                <li>Check whether there is an active internet connectivity</li>
                <li>Check whether the url entered is an valid one</li>
              </ul>
            </div>
        </div>
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
import category from '../models/category';
export default {
    data() {
        return {
            categories: [],
            active: '',
            activeButton: '',
            isLoading: '',
            isFailed: false,
            isEmptyCategory: '',
            form: new Form({
                name: '',
                url: '',
                category: '',
            }),
        };
    },

    watch: {
        categories: function () {
            category.all(categories => this.categories = categories);
        }
    },

    created() {
        category.all(categories => this.categories = categories);
        (this.categories.length > 0) ? this.isEmptyCategory = false : false;
    },

    methods: {
        onSubmit(){
            this.isLoading = true;
            this.form.post('api/urls')
            .then(url => {this.onAdded(url)})
            .catch((errors) => {this.failed(errors)});
        },

        failed(errors) {
          if(typeof errors == 'undefined') {
            this.isFailed = true;
          }
          this.isLoading = false;
        },

        toggleCollection(){
          if(this.categories.length > 0) {
            if(this.active && this.activeButton){
              this.active = false;
              this.activeButton = false;
              this.form.name = '';
              this.form.url = '';
              this.form.category = '';
              this.isEmptyCategory = false;
            }
            else{
              this.active = true;
              this.activeButton = true;
              this.isEmptyCategory = false
            }
          }
          else {
            this.isEmptyCategory = true
          }
        },

        onAdded(url) {
            this.isLoading = false;
            this.$emit('inserted', url)
        },
        
        clear() {
          this.isFailed = false;
        }
    }
};
</script>

<style>
.active{
    display: block !important;
}

.activeButton{
    display: none !important;
}

.modal{
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
}

.modal .modal-content{
    min-height: 10em;
}

/* loading animation */

.loading{
    display: block !important;
    position: absolute;
    top: 20%;
    left: 50%;
}

:root {
  --animation-shift: 200px;
  --animation-shift-neg: -200px;
  --animation-time: 1.5s;
  --animation-easing: cubic-bezier(.5,.4,.2,.8);
}

</style>