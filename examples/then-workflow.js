'use strict';
/*global */

var Thenjs = require('../then.js');

function start(len, syncMode) {
    var task, list = [], tasks = [];

    if (syncMode) { // 模拟同步任务
        task = function (callback) {
            callback(null, 1);
        };
    } else { // 模拟异步任务
        task = function (callback) {
            setImmediate(function () {
                callback(null, 1);
            });
        };
    }

    // 构造任务队列
    for (var i = 0; i < len; i++) {
        list[i] = i;
        tasks[i] = task;
    }

    return function (callback) {
        // Thenjs 测试主体
        Thenjs.
            each(list, function (cont, i) { // 并行 list 队列
                task(cont);
            }).
            eachSeries(list, function (cont, value, index) { // 串行 list 队列
                console.log(value);
                task(cont);
            }).
            parallel(tasks). // 并行 tasks 队列
            series(tasks). // 串行 tasks 队列
            then(function(cont, index){
                console.log(index);
                cont();
            }).
            fin(function (cont, error) {
                callback(error);
            });
    };
};

start(10, true);
