module.exports = function(req, res, next){
    if(!req.session || !req.session.user){
        res.send({
            'result': 'unsuccessful',
            'error': 'not authenticated'
        });
    } else {
        next();
    }
};