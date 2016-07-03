var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt');

/* GET login */

router.post('/login', function (req, res, next) {

    var username = req.body.username;
    var password = req.body.password;

    var error = [];

    var users = req.db.collections('users').findOne({'username': username}, function (err, user) {
       if(err){
           error.push(err);
       } else {
           if(user == null){
               error.push("mismatch");
           } else {
               var match = bcrypt.compareSync(password, doc.password);
               if(match){
                   user.password = null;
                   req.session.user = user;
                   res.send(
                       {
                           'result': 'successfull',
                           'user': {
                               'username': user.username,
                               'email': user.email
                           }
                       }
                   );
               } else {
                   error.push("mismatch");
               }
           }
       }

        req.session.user = null;

        res.send({
            'result': 'unsuccessful',
            'error': error
        });
    });


});

/* POST /signup */

router.post('/signup', function (req, res, next) {

    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    password = bcrypt.hashSync(password, 10);
    
    var users = req.db.collection('users');
    users.findOne({'email': email}, function (err, user) {

        if(err){
            console.log(err);
        } else {
            if(user == null){

                user.username = username;
                user.email = email;
                user.password = password;
                
                users.insert(user, function (err, doc) {

                    if(err){
                        res.send({
                            'result': 'unsuccessful',
                            'error': err
                        });
                    } else {
                        res.send({
                           'result': 'successful',
                            'data': doc
                        });
                    }

                });

            } else {
                res.send({
                    'result': 'unsuccessful',
                    'error': 'duplicate'
                });
            }
        }

    });

});

module.exports = router;
