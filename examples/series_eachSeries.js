'use strict';
/*global console*/

var Thenjs = require('../then.js');
/**
 以下所有的 'cont'，取义于 continue。'cont' 绑定到了下一个 Thenjs 链，即收集当前任务结果，继续执行下一链。
 它等效于 node.js 的 callback，可以接受多个参数，

 其中第一个参数为 'error'!!!!!!
 */
//主构造函数，返回一个新的 Thenjs 对象
Thenjs(function (cont) {
  //TODO: set err = null, pass taskFnArray into next Thunk, means series() will accept this array !
  cont(null, [
    function (cont, index) {
      console.log(index, 'val1');
      cont();
    },
    function (cont, index) {
      console.log(index, 'val21');
      cont();
    }
  ]);
},false)//debug parameter, optional
.series()         /** Thenjs.series(taskFnArray, [debug])
                      taskFnArray: Array，[taskFn1, taskFn2, taskFn3, ...]，
                      其中，taskFn 形式为 function (cont) {} **/
.then(function () {
  console.log('series1 end');
});

////////////////////    series  //////////////////////////

Thenjs(function (cont) {
  Thenjs.series([
    //TODO: this signature is inconsistent with github doc. Because index is not mentioned there !
    function (cont2, index) {
      console.log(index, 'val1');
      cont2();
    },
    function (cont2, index) {
      console.log(index, 'val2');
      cont2();
    }
  ])
  .fin(cont);   //Un-documented method
})
.then(function () {
  console.log('series2 end');
});

/////////////////   eachSeries   /////////////////

//cont ==> callback

Thenjs(function (cont) {
  cont(null, ['a', 'b', 'c']);
}).
eachSeries(null, function (cont, value, index) {
  console.log(value, index);
  cont();
})
.then(function () {
  console.log('eachSeries end');
});