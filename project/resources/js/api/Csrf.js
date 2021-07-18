const { default: Axios } = require("axios");

export default {
    getCookie(){
        return Axios.get('/sanctum/csrf-cookie')  
    }
}