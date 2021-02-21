const { default: Axios } = require("axios");

class url {
    static all(then) {

        return Axios.get('/api/urls')
        .then(({data}) => then(data))

    }
}

export default url;