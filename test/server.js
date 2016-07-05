/**
 * Created by abhi on 7/4/16.
 */

var http = require('http');
var app = require('../app');

this.server = http.createServer(function (req, res) {

    res.writeHead(200, {'Content-Type': 'application/javascript'});
    var jres = JSON.stringify({
        result: "successful"
    });
    res.end(jres);


});

exports.listen = function(){
    this.server.listen.apply(this.server, arguments);
};

exports.close = function (callback) {
    this.server.close(callback);
};