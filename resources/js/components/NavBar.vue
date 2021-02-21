<template>
    <div>
        <div v-if="this.isWindowHalt" class="window-event freeze"  @click="modalDisable"></div>
            <div class="topnav">
                <i class="fas fa-bars" @click="sidebarCollapse"></i>
                <div class="topnavItem">
                    <div class="item"  @click="topnavModal">
                        <i class="fas fa-user-circle"></i>
                        <label>{{user.name}}</label>
                        <i class="fas fa-caret-down"></i>
                    </div>
                </div>
            </div>
            <div v-if="isTopnavModal" class="topnavModal">
                <label>Account</label>
                <ul>
                    <li><a href="#" @click.prevent="logoutUser">Logout</a></li>
                </ul>
            </div>
    </div>
</template>
<script>
import user from '../models/user';
export default {
     name: 'navbar',
    data() {
        return {
            isTopnavModal: false,
            isWindowHalt: false,
            user: [],
            logout: new Form(),
        }
    },
     mounted () {
        user.show(user => this.user = user)
    },
    methods: {
        topnavModal() {
            !this.isTopnavModal ? this.isTopnavModal = true : this.isTopnavModal = false;
            !this.isWindowHalt ? this.isWindowHalt = true : this.isWindowHalt = false;
        },
        modalDisable() {
            (this.isTopnavModal) ? this.isTopnavModal = false : false;
            this.isWindowHalt = false;
        },
        logoutUser() {
            this.logout.post('api/logout')
            .then(response => {
                window.location.href = '/';
            })
        },
        sidebarCollapse() {
            this.$emit('sidebarActive');
        }
    }
    
}
</script>