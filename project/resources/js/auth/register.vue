<template>
    <div class="loginContainer">
        <div class="login">
            <div class="login-header">
                <h6>Bookmark &nbsp;<i class="fas fa-bookmark"></i></h6>
                    <h1>Create an account</h1>
            </div>
            <form action="#" method="POST" @submit.prevent="register">
                <div class="control">
                    <label>Name</label>
                    <input type="text" class="input" name="name" placeholder="Enter your name" autocomplete="name" v-model="form.name">
                    <span class="error" v-if="form.errors.has('name')"  v-text="form.errors.get('name')"></span>
                </div>
                <div class="control">
                    <label>E-Mail</label>
                    <input type="email" class="input" name="email" placeholder="Enter your e-mail" autocomplete="email" v-model="form.email">
                    <span class="error" v-if="form.errors.has('email')"  v-text="form.errors.get('email')"></span>
                </div>
                <div class="control">
                    <div class="control-password">
                        <label>Password</label>
                    </div>
                    <input type="password" class="input" name="password" placeholder="Enter a strong password" autocomplete="new-password" v-model="form.password">
                </div>
                <div class="control">
                    <div class="control-password">
                        <label>Confirm Password</label>
                    </div>
                    <input type="password" class="input" name="password_confirmation" placeholder="Re-enter your password" v-model="form.password_confirmation">
                    <span class="error" v-if="form.errors.has('password')"  v-text="form.errors.get('password')"></span>

                </div>
                <div class="control">
                    <button class="btn btn-login" type="submit">Register</button>
                </div>
            </form>
            <div class="login-footer">
                <p>By signing in, you agree to the <a href="#">Terms and conditions.</a></p>
            </div>
        </div>
    </div>
</template>

<script>
import Csrf from '../api/Csrf';
export default {
    name: 'guest',
    data() {
        return {
            form: new Form({
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            })
        }
    },

    methods: {
        register() {
            Csrf.getCookie().then( () => {
                this.form.post('api/register')
                .then(response => {
                    window.location.href = '/';
                })
            })
        }
    }
}
</script>

<style>

</style>