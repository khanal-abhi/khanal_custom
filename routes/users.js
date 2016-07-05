var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt');

/* POST login */

router.post('/login', function (req, res, next) {

    console.log(req.session);

    if(req.session && req.session.user){
        console.log('dangerzone');
        res.send({
            'result': 'unsuccessful',
            'error': 'already logged in'
        });
    } else {

        var username = req.body.username;
        var password = req.body.password;

        var error = [];

        var users = req.db.collection('users').findOne({'username': username}, function (err, user) {
            if (err) {
                error.push(err);
            } else {
                if (user == null) {
                    error.push("mismatch");
                } else {
                    var match = bcrypt.compareSync(password, user.password);
                    if (match) {
                        user.password = null;
                        req.session.user = user;
                        res.send(
                            {
                                'result': 'successful',
                                'user': {
                                    'username': user.username,
                                    'email': user.email
                                }
                            }
                        );
                    } else {
                        error.push("mismatch");

                        req.session.user = null;

                        res.send({
                            'result': 'unsuccessful',
                            'error': error
                        });
                    }
                }
            }

        });
    }


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

                user = {};

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

/* GET logout */

router.get('/logout', function (req, res, next) {

    if(req.session.user){
        delete req.session.user;
        req.session.reset();
        res.send({
            'result': 'successful',
        });
    } else {
        res.send({
            'result': 'unsuccessful',
            'error': 'not logged in'
        });
    }

});

/* DELETE user */

router.delete('/delete', function(req, res, next){
    var _id = req.ObjectID(req.body.id);
    req.db.collection('users').remove({_id: _id}, function (err, user) {
       if(err){
           res.send({
              'result': 'unsuccessful',
               'error': err
           });
       } else {
           res.send({
              'result': 'successful',
               'data': user
           });
       }
    });
});

module.exports = router;
