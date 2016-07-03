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

module.exports = router;
