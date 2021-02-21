<template>
    <div class="app">
        
        <div :class="{sidebarActive: isSidebarActive}"  class="navbar">
            <add-category @insertedCat = "reload"></add-category>

            <div class="navabar-menu">
                    <router-link class="navbar-item" to="/" exact=""><i class="far fa-bookmark" @click="sidebarHide"></i> All</router-link>
                    <div class="collections">
                        <h2>Collections</h2>
                    </div>
                        <router-link class="navbar-item" 
                        :to="{name: 'Category', params: {id:category.id}}" 
                        v-for="category in categories" 
                        :key="category.id">
                        <div  @click="sidebarHide">
                            {{category.name}}
                        </div>
                            <i class="fas fa-trash-alt" @click.prevent="remove(category.id)" ></i>
                        </router-link>
            </div>
        </div>

        <router-view class="rightPanel" @updatedSuccess="categories" v-on:sidebarActive="sidebarCollapse"></router-view>
    </div>
</template>

<script>
import category from '../models/category';
import AddCategory from '../components/AddCategory';
export default {
    components: { AddCategory},
    name: 'app',
    data(){
        return{
            categories : [],
            form: new Form(),
            isSidebarActive: false,
        };
    },

    watch: {
        categories: function () {
            category.all(categories => this.categories = categories);
        }
    },

    created() {
        category.all(categories => this.categories = categories);
    },

    mounted() {
        document.querySelector('.navbar-item').addEventListener('click', () => {
            this.isSidebarActive = false;
            console.log('closed');
        })
    },
    
    methods: {
        reload(category) {
            this.categories.unshift(category);
            window.scroll(0, 0);
        },

        remove(category) {
            this.form.delete('/api/categories/' + category)
            .then(category => {this.onRemoved(category)})
        },
        onRemoved(category) {
            this.categories = this.categories.filter( (item) => {category.id != item.id});
        },
        sidebarCollapse() {
            (this.isSidebarActive === true) ? this.isSidebarActive = false : this.isSidebarActive = true;
        },
        sidebarHide() {
            this.isSidebarActive = false;
            console.log('close');
        }
    }

}
</script>

<style>

.navbar-item{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.collection-col{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.navbar-item .fa-trash-alt{
    display: none;
    font-size: 1rem;
    margin-left: 1em;
}

.navbar-item:hover .fa-trash-alt{
    display: block;
}

.navbar-item .fa-trash-alt:hover{
    color: #e84545;
}

</style>