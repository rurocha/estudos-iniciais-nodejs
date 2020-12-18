exports.isLogged = ((req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'necessário estar logado!');
        res.redirect('/users/login');
        return;
    }

    next();
});

exports.changePassword = (req, res) => {
    if (req.body.password !== req.body.passwordConfirm) {
        req.flash('error', 'senhas não correspondem');
        res.redirect('/profile');
        return;
    }

    req.user.setPassword(req.body.password, async () => {
        await req.user.save();
        req.flash('success', 'senha alterada com sucesso!');
        res.redirect('/profile');
    })
}