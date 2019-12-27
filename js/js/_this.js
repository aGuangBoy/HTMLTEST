// var car = {
//     make: "Lamborghini",
//     model: "Huracan",
//     fullName: function() {
//         console.log(this.make + " - " + this.model);
//         console.log(car.make + " - " + car.model);
//     }
// }
//
// car.fullName();
///////////////////////////////////

// var car = {
//     make: "Lamborghini",
//     model: "Huracan",
//     name: null,
//     fullName: function() {
//         this.name = this.make + " - " + this.model;
//         console.log(this.name);
//     }
// }
// var anotherCar = {
//     make: "Ferrari",
//     model: "Italia",
//     name: null
// }
// // anotherCar.name = car.fullName();
// // 使用call
// car.fullName.call(anotherCar);
// console.log(car.name);
// console.log(anotherCar.name);
///////////////////////////////////

// var cars = [
//     { make: "Mclaren", model: "720s"},
//     { make: "Ferrari", model: "Italia"}
//     ];
// var car = {
//     cars: [{ make: "Lamborghini", model: "Huracan" }],
//     fullName: function () {
//         console.log(this.cars[0].make + " " + this.cars[0].model);
//     }
// };
// var vehicle = car.fullName;
// vehicle();
///////////////////////////////////

// var car = {
//     make: "Ferrari",
//     model: "Italia",
//     fullName: function (cars) {
//         cars.forEach((vehicle) => {
//             console.log(vehicle + " - " + this.model);
//         })
//     }
// };
// car.fullName(["Lam", "Fer", "Mcl"]);
///////////////////////////////////

// var car = {
//     make: "Lamborghini",
//     model: "Huracán",
//     fullName: function () {
//         console.log(this.make +" "+ this.model);
//     }
// }
// var truck =  {
//     make: "Tesla",
//     model: "Truck",
//     fullName: function (callback) {
//         console.log(this.make +" "+ this.model);
//         callback();
//     }
// }
// truck.fullName(car.fullName);
///////////////////////////////////

// function identify(){
//     console.log(this.name)
//     return this.name.toUpperCase();
// }
//
// function speak() {
//     var gretting = 'Hello I am ' + identify.call(this);
//     console.log(gretting);
// }
//
// var me = {
//     name:'Neal'
// }
//
// var you = {
//     name:'Nealyang'
// }
// identify.call(me); // Neal
// identify.call(you); // Nealyang
//
// speak.call(me); // Neal - Hello I am NEAL
// speak.call(you);
//////////////////////////////////////

// function foo(num) {
//     console.log("foo:"+num);
//     this.count++;
// }
//
// foo.count = 0;
//
// for(var i = 0;i<10;i++){
//     foo(i);
// }
//
// console.log(foo.count);

// function foo() {
//     var a = 2;
//     this.bar();
// }
//
// function bar() {
//     console.log( this.a );
// }
//
// foo(); //undefined

// function foo() {
//     console.log(this.a);
// }
// var a = 2;
// var o = {
//     a:3,
//     foo:foo
// }
// var p = {a:4};
// (p.foo = o.foo)();
///////////////////////////////////

var a = 10;
var foo = {
    a: 20,
    bar: function() {
        var a = 30;
        console.log(this)
    }
};
foo.bar();
(foo.bar)();
(foo.bar = foo.bar)(); // 重新给函数赋值，this发生变化。
(foo.bar, foo.bar)();  // ,: 逗号操作符用于赋值时总会返回表达式中的最后一项。

// foo
// foo
// window
// window


function t(){
    this.x=2;
}
t();
console.log(window.x);
// 2


var obj = {
    x: 1,
    y: 2,
    t: function() {
        console.log(this.x);
    }
}
obj.t();

var dog = {
    x: 11
};
dog.t = obj.t;
dog.t();
show = function(){
    console.log('show' + this.x);
}
dog.t = show;
dog.t();
// 1
// 11
// show11


var name = 'this is window';
var obj1 = {
    name: 'php',
    t: function() {
        console.log(this.name);
    }
};
var dog1 = {
    name: 'huzi'
};

obj1.t();

dog1.t = obj1.t;

var tmp = dog1.t;
tmp(); //this本来指向window

(dog1.t = obj1.t)();
dog1.t.call(obj1);
// php
// this is window
// this is window
// php


var number = 2;
var obj = {
    number: 4,
    /*匿名函数自调*/
    fn1: (function(){
        var number;
        this.number *= 2;
        number = number * 2;
        number = 3;
        return function() {
            var num = this.number;
            this.number *= 2;
            console.log(num);
            number *= 3;
            alert(number); // 3 9 27
        }
    })(),
    db2: function() {
        this.number *= 2;
    }
}
var fn1 = obj.fn1;
alert(number);
fn1(); // this->window
obj.fn1(); // this->obj
alert(window.number);
alert(obj.number);

















