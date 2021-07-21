module.exports = function(req,res,next){
    if(req.isAuthenticated()){
        req.session.data="abc",
        console.log(req.session);
        return next();
    }
    return res.redirect("/auth/login");
}