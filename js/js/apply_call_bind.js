// var array = ["a", "b"];
// var elements = [1, 2, 3];
// array.push.apply(null, elements);
// console.log(array);
////////////////////////////////////////

// var array = [1, 2, 3, 4, 5];
// console.log(Array.isArray(array));
// console.log(array instanceof Array);
// console.log(Object.prototype.toString.call(array));



// call
Function.prototype.call = function(context) {
    if (!context) {
        context = typeof window === 'undefined' ? global : window;
    }
    context.fn = this;
    let rest = [...arguments].slice(1);
    let result = context.fn(...rest);
    delete context.fn;
    return result;
}

// apply
Function.prototype.apply = function (context, rest) {
    if (!context) {
        context = typeof window === 'undefined' ? global : window;
    }
    context.fn = this;
    let result;
    if (rest === null || rest === undefined) {
        result = context.fn(rest);
    } else if (typeof rest === 'object') {
        result = context.fn(...rest);
    }
    delete context.fn;
    return result;
}

//bind
Function.prototype.bind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError("not a function");
    }
    let self = this;
    let args = [...arguments].slice(1);
    function Fn() {};
    Fn.prototype = this.prototype;
    let bound = function () {
        let res = [...args, ...arguments];
        context = this instanceof Fn ? this : context || this;
        return self.apply(context, res);
    }
    bound.prototype = new Fn();
    return bound;
}

var foo = {
    name: 'Selina'
}
var name = 'Chirs';
function bar(job, age) {
    console.log(this.name);
    console.log(job, age);
}
// bar.call(foo, 'programmer', 20);
// bar.call(null, 'teacher', 25);
bar.apply(foo, ['programmer', 20]);
bar.apply(null, ['teacher', 25]);

var name = 'Jack';
function person(age, job, gender){
    console.log(this.name , age, job, gender);
}
var Yve = {name : 'Yvette'};
let result = person.bind(Yve, 22, 'enginner')('female');






















