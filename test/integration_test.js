/**
 * Created by abhi on 7/4/16.
 */

var http = require('http');
var app = require('../app');
var request = require('request');
var server = null;

var user = null;

describe("The server", function () {
    before(function () {
        server = http.createServer(app);
        server.listen(3000);
    });

    describe("Should respond to requests", function () {

        it("should add a test user ", function (done) {
           request.post({url: "http://localhost.com:3000/users/signup", form: {username: "testuser", email: "testuser@test.com", password: "testpassword"}}, function(err, res, body){
               expect(err).to.equal(null);
               user = JSON.parse(body).data;
               expect(user.username).to.equal("testuser");
               done();
           });
        });

        it("should let the test user log in", function (done) {
            request.post({uri: 'http://localhost.com:3000/users/login', form: {username:"testuser", password: "testpassword"}}, function(err, res, body){
                expect(err).to.equal(null);
                var data = JSON.parse(body);
                expect(data.result).to.equal("successfull");
                done();
            });
        });
        
        it("should delete the test user", function(done){
            request.delete({uri: "http://localhost.com:3000/users/delete_user", form: {id: user._id}}, function(err, res, body){
                expect(JSON.parse(body).resut).to.equal("successfull");
            });
        });

    });
    
    after(function () {
       server.close();
    });
});