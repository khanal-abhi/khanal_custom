module.exports = function(req, res, next){
    if(!req.user){
        res.redirect('/logout');
    } else {
        next();
    }
};