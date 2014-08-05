define(function(require){
    var Thenjs = require('../then.js');

    //simplified function signature
    function request(url) {
        //entry-point for the main constructor Thenjs()
        return function (callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) return;
                callback(this.status === 200 ? null : xhr, xhr);
            };
            xhr.send();
        };
    }

    Thenjs(
        request('http://localhost/') //put project folder under IIS directory
    ).
    then(function (cont, data) {
        console.log("--------------step 1: print raw data");
        console.log(data);
        cont(null, data.responseText);
    }).
    then(function (cont, data) {
        console.log("--------------step 2: print data.responseText");
        console.log(data);
    }).
    fail(function (cont, error) {
        console.error(error.statusText);
    });
});