class Bus{
    constructor(){
        this.data = {};
    }

    on(key, fn) {
        this.data[key] = this.data[key] || [];
        this.data[key].push(fn);
    }
 

    off(key, fn) {
        if (this.data[key]) {
            for (var i = 0; i < this.data[key].length; i++) {
                if (this.data[key][i] === fn) {
                    this.data[key].splice(i, 1);
                    break;
                }
            };
        }
    }
    $on(key,fn) { this.on(key,fn) }
    $off(key,fn) { this.off(key,fn) }

    emit(key, pars) {
        if (this.data[key]) {
            for (var fn of this.data[key]) {
                fn([pars]);
            };
        }
    }
    $on(key,fn) { this.on(key,fn) }
    $off(key,fn) { this.off(key,fn) }
    $emit(key,pars) { this.emit(key,pars) }

}

export default new Bus();