/**
 * Created by abhi on 7/4/16.
 */

var request = require('request');
var server = require('./server');

describe("server", function () {
   before(function () {
      server.listen(3000);
   });

    describe("should cater to a web request", function () {
        
    });

    after(function () {
       server.close();
    });
});

