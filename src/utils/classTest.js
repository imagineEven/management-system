// console.log('test')
// class Fun {
//   constructor() {
//   }
//   fun11(callback) {
//     callback()
//   }
// }

// class Fun2 {
//   constructor() {
//   }
//   fun22() {
//     console.log('输出的是谁')
//     console.log(this);
//   }
// }

// let fun = new Fun();
// let fun2 = new Fun2();

// fun.fun11(fun2.fun22);

var o = {
  a:10,
  b:{
      a:12,
      fn:function(){
          console.log(this.a); //12
      }
  }
}
o.b.fn(); // this 指向的是b

