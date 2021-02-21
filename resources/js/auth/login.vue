<template>
    <div class="loginContainer">
        <div class="login">
            <div class="login-header">
                <h6>Welcome Back</h6>
                    <h1>Log into your account</h1>
            </div>
            <form action="#" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
                <div class="control">
                    <label>E-Mail or Username</label>
                    <input type="text" class="input" name="email" placeholder="Enter your e-mail or username" autocomplete="email" v-model="form.email">
                    <span class="error" v-if="form.errors.has('email')"  v-text="form.errors.get('email')"></span>
                </div>
                <div class="control">
                    <div class="control-password">
                        <label>Password</label>
                        <a href="#"> Forgot password?</a>
                    </div>
                    <input type="password" class="input" name="password" placeholder="Enter your password" v-model="form.password">
                    <span class="error" v-if="form.errors.has('password')"  v-text="form.errors.get('password')"></span>
                </div>
                <div class="control">
                    <button class="btn btn-login" type="submit" :disabled="form.errors.any()">Login now</button>
                </div>
            </form>
            <div class="login-footer">
                <a href="/create-new-account">Not registered yet? Register <i class="fas fa-long-arrow-alt-right"></i></a>
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
                email: '',
                password: ''
            }),
        }
    },
    methods: {
        onSubmit() {
            Csrf.getCookie().then(response => {
                this.form.post('api/login')
                .then(response => {
                window.location.href = '/';
                })
            })
        },
    }
}
</script>

<style>

</style>