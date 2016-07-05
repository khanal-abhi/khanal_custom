/**
 * Created by abhi on 7/4/16.
 */

var request = require('request');
var server = require('./server');
var expect = require('chai').expect;

describe("server", function () {
   before(function () {
      server.listen(3000);
   });

    describe("should cater to a web request", function () {
        it("should send a response to a web request", function (done) {
            request('http://localhost:3000', function (err, res, body) {
                var jasonObject = JSON.parse(body);
               expect(jasonObject.result).to.equal("successful");
                done();
            });
        });
    });

    after(function () {
       server.close();
    });
});

