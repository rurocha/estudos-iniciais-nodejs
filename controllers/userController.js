const UserModel = require('../models/User');

exports.login = (req, res) => {
    res.render('login')
}

exports.loginAction = (req, res) => {
    const auth = UserModel.authenticate();
    auth(req.body.email, req.body.password, (error, result) => {
        if(!result) {
            req.flash('error', 'Seu email e/ou senha estão incorretos')
            res.redirect('/users/login');
            return;
        }
        req.login(result, () => {});
        req.flash('success', 'usuario logado com sucesso!');
        res.redirect('/');
    })
}

exports.register = (req, res) => {
    res.render('register')
}

exports.registerAction = (req, res) => {
    const newUser = new UserModel(req.body);
    UserModel.register(newUser, req.body.password, (error) => {

        if(error) {
            req.flash('error', 'Ocorreu um erro, tente novamente');
            res.redirect('/users/register');
            return;
        } 

        req.flash('success', 'Registro efetuado com sucesso, faça o login');
        res.redirect('/users/login');
    });
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}