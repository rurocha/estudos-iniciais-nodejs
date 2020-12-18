exports.menu = [
    {name: 'Home', slug: '/', canGuestView: true, canLoggedView: true},
    {name: 'Login', slug: '/users/login', canGuestView: true, canLoggedView: false},
    {name: 'Cadastro', slug: '/users/register', canGuestView: true, canLoggedView: false},
    {name: 'Adicionar Post', slug: '/post/add', canGuestView: false, canLoggedView: true},
    {name: 'Sair', slug: '/users/logout', canGuestView: false, canLoggedView: true}
]

exports.splitWordToArray = (text, separator) => {
    return text.split(separator).map(word => word.trim()); 
}