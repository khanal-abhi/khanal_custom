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
            request('localhost:3000', function (err, res, body) {
               expect(0).to.equal(res);
                done();
            });
        });
    });

    after(function () {
       server.close();
    });
});

