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

// var o = {
//   a:10,
//   b:{
//       a:12,
//       fn:function(){
//           console.log(this.a); //12
//       }
//   }
// }
// o.b.fn(); // this 指向的是b


let testData = [
  {
    name: "even",
    children: [
      {
        name: 'levi'
      },
      {
        name: "name",
        children: [
          {
            name: "even"
          }
        ]
      }
    ]
  },
  {
    name: "even",
    children: [
      {
        name: 'levi'
      },
      {
        name: "even",
        children: [
          {
            name: "even"
          }
        ]
      }
    ]
  }
]

function filterData(data) {
  let accessedData = data.filter(item => {
    if (item.name === 'even') {
      if (item.children && item.children.length > 0) {
        item.children = filterData(item.children)
      }
      return true
    } else {
      return false
    }
  })
  return accessedData
}

console.log('dateStart');
var myDate = new Date()
// console.log(myDate.getDate());
var moment = require('moment');
moment().format('MMMM Do YYYY, h:mm:ss a'); // March 20th 2017, 11:52:12 am
moment().format('dddd');                    // Monday
moment().format("MMM Do YY");               // Mar 20th 17
moment().format('YYYY [escaped] YYYY');     // 2017 escaped 2017
moment().format();                          // 2018-10-18T10:23:52+08:00
moment(myDate).format("Y/M/D-h:m:s")        // 2018/10/18-10:52:31
moment(myDate).valueOf()                    // 1539831178960
moment(myDate).format('LL')                 // 2018年10月18日

//console.log(moment(myDate).format("YYYY/MMM/dddd-h:m:s"));

//console.log(moment(myDate).format('LL'));

// function combine(fn) {
//   return function () {
//     let arg1 = arguments;
//     console.log(arg1)
//     return function () {
//       fn([...arg1], [...arguments]);
//     };
//   };
// }


console.log('dateEnd');


