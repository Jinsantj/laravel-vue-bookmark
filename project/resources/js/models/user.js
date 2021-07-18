const { default: Axios } = require("axios")

class user {
    static show(then) {
        return Axios.get('api/user')
        .then(({data}) => then(data))
    }

}

export default user;