const UserModel = require('../models/User');
const crypto = require('crypto'); //lib fornecida pelo nodeJS
const mailHandler = require('../handlers/mailHandler');

exports.login = (req, res) => {
    res.render('login')
}

exports.loginAction = (req, res) => {
    const auth = UserModel.authenticate();
    auth(req.body.email, req.body.password, (error, result) => {
        if (!result) {
            req.flash('error', 'Seu email e/ou senha estão incorretos')
            res.redirect('/users/login');
            return;
        }
        req.login(result, () => { });
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

        if (error) {
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

exports.profile = (req, res) => {
    res.render('profile');
}

exports.profileAction = async (req, res) => {
    const { name, email } = req.body;
    try {

        const user = await UserModel.findOneAndUpdate(
            { _id: req.user._id },
            {
                name, email
            },

            { runValidators: true, new: true }
        );
    } catch {
        req.flash('error', 'Erro ao atualizar usuário!');
        return;
    }

    req.flash('success', 'Usuário alterado com sucesso!');
    res.redirect('/profile');
}

exports.forget = (req, res) => {
    res.render('forget');
}

exports.forgetAction = async (req, res) => {
    //1.  verificar se o user existe;
    const user = await UserModel.findOne({ email: req.body.email }).exec();
    if (!user) {
        req.flash('error', 'E-mail não cadastrado');
        res.redirect('/users/forget');
    }
    //2.  gerar um token com a data de expiração e salvar no banco;
    // os nomes resetUser criados no objeto user;
    user.resetUserPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordsExpires = Date.now() + 3600000; // 1 hora
    await user.save();
    //3.  gerar um link com token para trocar a senha;
    const resetLink = `http://${req.headers.host}/users/reset/${user.resetUserPasswordToken}`;

    //4. enviar o link via email para o usuario;
    mailHandler.send({
        to: user.email,
        subject: "Reset de senha",
        html: `testando email com link: <a href="${resetLink}">resetar senha</a>`,
        text: `testando email com link: ${resetLink}`
    })

    //5. usuario vai acessar o link e trocar a senha;
    req.flash('success', 'enviamos um email com instruções ')
    res.redirect('/users/login');
}

exports.forgetToken = async (req, res) => {
    //verifica o token;
    const user = await UserModel.findOne({
        resetUserPasswordToken: req.params.token,
        resetPasswordsExpires: { $gt: Date.now() }
    }).exec();

    if (!user) {
        req.flash('error', 'Token expirado');
        res.redirect('users/forget');
        return;
    }
    // fim verifica token;
    res.render('forgetPassword');

}

exports.forgetTokenAction = async (req, res) => {
    //verifica o token;
    const user = await UserModel.findOne({
        resetUserPasswordToken: req.params.token,
        resetPasswordsExpires: { $gt: Date.now() }
    }).exec();

    if (!user) {
        req.flash('error', 'Token expirado');
        res.redirect('users/forget');
        return;
    }
    // fim verifica token;

    // semelhante ao authMiddleware que verifica a confirmacao da senha e aplica nova senha;
    if (req.body.password !== req.body.passwordConfirm) {
        req.flash('error', 'senhas não correspondem');
        res.redirect('back');
        return;
    }

    user.setPassword(req.body.password, async () => {
        await user.save();

        req.flash('success', 'senha alterada com sucesso!');
        res.redirect('/');
    })

}