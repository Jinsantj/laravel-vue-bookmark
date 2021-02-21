<template>

        <div class="home">
        <div v-if="this.isWindowHalt" class="window-event halt"  @click="fieldInactive"></div>
        <nav-bar v-on:sidebarActive="sidebarCollapse"></nav-bar>

            <add-url @inserted = "reload"></add-url>
            <div class="all-content">   

                <div class="search">
                    <input type="text" class="search-input" placeholder="Search" v-model="search"> <i class="fas fa-search search-icon"></i> 
                </div>

                <div class="cards">
                    <div class="cards-item" v-for="(url, index) in allurls" :key="index">
                        <a :href="url.url" target="_blank" rel="noopener noreferrer">
                            <div class="ogImage">
                                <img :src="url.ogImage" alt="OgImage">
                            </div>
                        </a>
                        <form class="cards-body" @submit.prevent="update(url.id)">
                            <div class="cards-header">
                                    <input :class="{inputActive: url.checked}"
                                    class="input"
                                    name="name"
                                    type="text"
                                    @dblclick="fieldActive(url.id)"
                                    :readonly="!url.checked"
                                    v-model="url.form.name"
                                    >
                                    <i class="fas fa-trash-alt" @click.prevent="remove(url.id)"></i>
                            </div>
                            <p>{{url.description | trimDescription}}</p>
                            <a :href="url.url" target="_blank" rel="noopener noreferrer">{{url.url | trim}}</a>
                            <button style="display: none" type="submit">Save</button>
                        </form>
                    </div>
                </div>

                <div v-if="this.empty" class="emptyPage">
                    <h1>Nothing found create one!</h1>
                </div>

            </div>

        </div>

</template>

<script>
import AddUrl from '../components/AddUrl.vue';
import url from '../models/url';
import NavBar from '../components/NavBar';
export default {
    components: { AddUrl, NavBar },
    data() {
        return {
            form: new Form(),
            urls: [],
            favicons: [],
            search: null,
            empty: false,
            isWindowHalt: '',
        }
    },

    filters: {
        trim: ((string) => string.substring(0, 52) + '.....'),
        trimDescription: ((string) => string.substring(0, 100) + '.....')
    },

    computed : {
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

    watch: {
        allurls: function () {
            (this.allurls == '') ? this.empty = true : this.empty = false;
        },
        urls: function () {
            this.urls.map((val, index) => {
                if(!this.urls[index].checked && !this.urls[index].form) {
                    this.$set(this.urls[index], "checked", false), 
                    this.$set(this.urls[index], "form", new Form({
                    name: this.urls[index].name,
                    description: this.urls[index].description
                }));
                }
            })
        }
    },

    created() {
        url.all(urls => {
            this.urls =urls,
            this.urls.map((val, index) => {
                this.$set(this.urls[index], "checked", false), 
                this.$set(this.urls[index], "form", new Form({
                    name: this.urls[index].name,
                    description: this.urls[index].description
                }));
            });
        });
        (this.allurls == '') ? this.empty = true : this.empty = false;
    },

    methods: {
        update(url) {

            this.urls.map((val, index) => {
                if((this.urls[index].checked) == true) {
                    this.urls[index].form.put('api/urls/' + url)
                    .then(url => {
                        this.urls[index].checked = false;
                        this.urls[index].name = this.urls[index].form.name;
                    })
                }
                
            });

        },
        fieldInactive() {
            this.urls.map((val, index) => {
                this.urls[index].checked = false;
            });

            this.isWindowHalt = false;
        },
        fieldActive(id){
            this.urls.map((val, index) => {
                this.urls[index].checked = false;
            });

            this.urls.map(url => {
                const currentIndex = this.urls.findIndex(index => index.id == id);
                this.urls[currentIndex].checked = true;
            });

            this.isWindowHalt = true;
        },
        reload(url) {
            this.urls.unshift(url);
            window.scroll(0, 0);
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
            this.$emit('sidebarActive');
        }
    }

}
</script>