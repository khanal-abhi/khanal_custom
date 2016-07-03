/**
 * Created by abhi on 7/2/16.
 */

var express = require('express');
var router = express.Router();

/* GET api */

router.post('/v1', function (req, res, next) {
    var obj = {};
    obj.name = req.body.name;
    obj.sex = req.body.sex;

    res.send(obj);
});

module.exports = router;
