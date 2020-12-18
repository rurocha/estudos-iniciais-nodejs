exports.isLogged = ((req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'necessário estar logado!');
        res.redirect('/users/login');
        return;
    }
    
    next();
});