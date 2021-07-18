
class Errors {
    constructor() {
        this.errors = {};
    }

    record(errors) {
        if(this.errors) {
            this.errors = errors;
        }
    }

    get(field) {
        if(this.errors[field]) {
            return this.errors[field][0];
        }
    }
    
    has(field) { 
        if(this.errors[field]){
            return this.errors.hasOwnProperty(field);
        }
    }

    any(){
       if(Object.keys(this.errors).length > 0) {
        return Object.keys(this.errors).length > 0;
       }
    }

    clear(field) {
        if(field) {
            delete this.errors[field];
            this.errors = {}
            return 
        }
       
    }

}

export default Errors;