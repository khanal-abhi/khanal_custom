/**
 * Created by abhi on 7/2/16.
 */

var express = require('express');
var router = express.Router();

/* POST one_liner */

router.post('/v1/new_message', function (req, res, next) {

    if(req.session && req.session.user) {
        var one_liner = {};
        one_liner.message = req.body.message;
        one_liner.author = req.session.user.username;
        one_liner.popularity = 0;
        one_liner.timestamp = Date.now();

        var err = [];
        var db = req.db;

        if (one_liner.message == null || one_liner.message == "") {
            err.push("missing message");
        }

        if (one_liner.author == null || one_liner.author == "") {
            err.push("missing author");
        }

        if (err.length > 0) {
            res.send({'error': err});
        }


        var one_liners = db.collection("one_liners");
        one_liners.insert(one_liner, function (err, doc) {
            if (err) {
                console.log('error saving one liner ' + err);
            }
            else {
                console.log('saved one_liner successfully!');
                res.send(one_liner);
            }
        });
    } else {

        res.send({
            'result': 'unsuccessful',
            'error': 'not authenticated'
        });

    }


});

/* GET one_liner */

router.get('/v1/messages', function (req, res, next) {

    var db = req.db;
    var one_liners = db.collection("one_liners");

    one_liners.find({}).sort({'popularity': -1}).toArray(function (err, docs) {
        res.send(docs);
    });
    
});

/* UPVOTE PATCH */

router.patch('/v1/upvote', function (req, res, next) {
    var id_string = req.body.id;
    var _id = new req.ObjectID(id_string);

    var one_liner = req.db.collection('one_liners').update({'_id': _id}, {$inc: {'popularity': 1}}, function (err, doc) {
        if(err){
            res.send(err);
        } else {
            res.send(doc);
        }
    });

});

/* DOWNVOTE PATCH */

router.patch('/v1/downvote', function (req, res, next) {
    var id_string = req.body.id;
    var _id = new req.ObjectID(id_string);

    var one_liner = req.db.collection('one_liners').update({'_id': _id}, {$inc: {'popularity': -1}}, function (err, doc) {
        if(err){
            res.send(err);
        } else {
            res.send(doc);
        }
    });

});



module.exports = router;
