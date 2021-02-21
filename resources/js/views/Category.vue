<template>
    <div class="home">
        <nav-bar v-on:sidebarActive="sidebarCollapse"></nav-bar>
        <div class="all-content">
        <div v-if="this.isWindowHalt" class="window-event halt"  @click="inactiveField"></div>
            <form class="updateCategory" @submit.prevent="updateCategory()">
                <div class="wrapper">
                    <input 
                    type="text" 
                    :class="{inputActive: isChecked}"
                    class=" input category-heading" 
                    name="name"
                    @dblclick="activeField"
                    :readonly="!isChecked" 
                    v-model="editCategory.name">
                    <div class="category-underline"></div>
                    <p class="help is-danger" v-if="editCategory.errors.has('name')"  v-text="editCategory.errors.get('name')"></p>
                </div>
                <button type="button" class="editbutton"></button>
            </form>

            <div class="search">
                    <input type="text" class="search-input" placeholder="Search" v-model="search"> <i class="fas fa-search search-icon"></i> 
                </div>
            <div class="cards">
                <div class="cards-item" v-for="url in allurls" :key="url.id">
                    <a :href="url.url" target="_blank" rel="noopener noreferrer">
                        <div class="ogImage">
                                <img :src="url.ogImage" alt="OgImage">
                            </div>
                    </a>
                    <div class="cards-body">
                        <div class="cards-header">
                                <h1>{{url.name}}</h1> <i class="fas fa-trash-alt" @click.prevent="remove(url.id)" ></i>
                        </div>
                        <p>{{url.description | trimDescription}}</p>
                        <a :href="url.url" target="_blank" rel="noopener noreferrer">{{url.url | trim}}</a>
                    </div>
                </div>
            </div>
            <div v-if="this.isEmpty" class="emptyPage">
                    <h1>Nothing found create one !</h1>
            </div>
        </div>
    </div>
</template>
        
<script>
import NavBar from '../components/NavBar';
export default {
    name: 'Category',
    components: { NavBar },
    data() {
        return {
            form: new Form(),
            editCategory: new Form({
                name: '',
            }),
            urls: [],
            id: this.$route.params.id,
            isChecked: '',
            isEmpty: false,
            isWindowHalt: '',
            search:'',
        }
    },

    watch: {
        $route() {
            this.updatePage(this.$route.params.id);
        },

        allurls: function () {
            (this.allurls == '') ? this.isEmpty = true : this.isEmpty = false;
        },
    },

    filters: {
        trim: ((string) => string.substring(0, 52) + '.....'),
        trimDescription: ((string) => string.substring(0, 100) + '.....')
    },

    created() {
        this.updatePage(this.$route.params.id);
        (this.allurls == '') ? this.isEmpty = true : this.isEmpty = false;
    },

    computed: {
        allurls() {
            if(this.search) {
                return this.urls.filter((item) => {
                    return item.name.toLowerCase().includes(this.search.toLowerCase())
                })
            }
            else {
                return this.urls;
            }
        }
    },

    methods: {
        updatePage(id) {
            axios.get('/api/urls/category/' + id)
            .then(urls => this.urls = urls.data);

            axios.get('/api/categories/' + id)
            .then(category => {
                this.editCategory.name = category.data.name;
            });

        },
        updateCategory() {
            this.editCategory.put('api/categories/' + this.id)
            .then((response) => {
                    this.$parent.$emit('updatedSuccess');
                    this.inactiveField();
                });
        },
        activeField() {
            this.isChecked = true;
            this.isWindowHalt = true;
        },
        inactiveField() {
            this.isChecked = true ? this.isChecked = false : false;
            this.isWindowHalt = true ? this.isWindowHalt = false : false;
        },

        remove(url) {
            this.form.delete('/api/urls/' + url)
            .then(url => { this.onRemoved(url); })
            .catch(errors => console.log(errors));
        },
        onRemoved(url) {
            this.urls = this.urls.filter(function (item) {
                return url.id != item.id ;
            })
        },
        sidebarCollapse() {
            this.$emit('sidebarActive')
        },
    }
}
</script>

<style scoped>

.emptyPage { 
    top: 24em !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
}

</style>
