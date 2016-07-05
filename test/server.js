/**
 * Created by abhi on 7/4/16.
 */

var http = require('http');
var app = require('../app');

this.server = http.createServer(function (req, res) {
   res.send({
       'result': 'successful',
       'data': {
           'name': 'test',
           'status': 200
       }
   });
});

exports.listen = function(){
    this.server.listen.apply(this.server, arguments);
};

exports.close = function (callback) {
    this.server.close(callback);
};