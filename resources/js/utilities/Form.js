import Errors from './Errors';

class Form {
    constructor(data) {
        this.originalData = data;

        for(let field in data) {

            this[field] = data[field];
        }

        this.errors = new Errors();

    }

    data() {
        let data = {};

        for(let property in this.originalData) {
            data[property] = this[property];
        }

        return data;

    }

    post(url) {
        return this.submit('post', url);
    }

    put(url) {
        return this.submit('put', url);
    }

    delete(url) {
        return this.submit('delete', url);
    }

    submit(requestType, url) {
        return new Promise((resolve, reject) => {
            axios[requestType](url, this.data())
                .then(response => {
                    if(requestType != 'put') {
                        this.onSuccess(response.data);
                    }
                    resolve(response.data);
                })
                .catch(error => {
                    this.onFail(error.response.data.errors);
                    reject(error.response.data.errors);
                });
        });
    }

    onFail(errors) {
        if(typeof errors != 'undefined') {
            this.errors.record(errors);
        }
    }

    onSuccess(data){
        this.reset();
    }

    reset(){

        for(let field in this.originalData) {
            this[field] = '';
        }

        this.errors.clear();


    }
}

export default Form;