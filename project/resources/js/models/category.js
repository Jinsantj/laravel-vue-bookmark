const { default: Axios } = require("axios")

class category {
    static all(then) {
        return Axios.get('/api/categories')
        .then(({data}) => then(data))
    }
}

export default category;