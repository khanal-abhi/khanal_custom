/**
 * Created by abhi on 7/2/16.
 */

var express = require('express');
var router = express.Router();

/* POST one_liner */

router.post('/v1', function (req, res, next) {
    var one_liner = {};
    one_liner.message = req.body.message;
    one_liner.author = req.body.author;
    one_liner.popularity = 0;

    var err = [];
    var db = req.db;

    if(one_liner.message == null || one_liner.message == ""){
        err.push("missing message");
    }

    if(one_liner.author == null || one_liner.author == ""){
        err.push("missing author");
    }

    if(err.length > 0){
        res.send({'error': err});
    }

    
    var one_liners = db.collection("one_liners");
    one_liners.insert(one_liner, function (err, doc) {
        if(err){
            console.log('error saving one liner ' + err);
        }
        else {
            console.log('saved one_liner successfully!');
        }
    });

    res.send(one_liner);
});

/* GET one_liner */

router.get('/v1', function (req, res, next) {

    var db = req.db;
    var one_liners = db.collection("one_liners");

    one_liners.find({}).sort({'popularity': -1}).toArray(function (err, docs) {
        res.send(docs);
    });
    
});

module.exports = router;
