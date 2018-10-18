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

//   console.log(111);
//   console.log(filterData(testData));

