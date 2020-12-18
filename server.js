require('dotenv').config({path: '.env'})
// conexão ao banco de dados;
const mongoose = require('mongoose');

mongoose.connect(
	process.env.DATABASE,
	{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
	);
// para mongoose utilizar es6, async await etc;
// mongoose.Promise = global.Promise;

// para tratar erros baseado nas conexoes ao banco dados;
// primeiro parametro é o que eu quero monitorar
mongoose.connection.on('error', (err) => {
	console.error(err.message);
})


// carregando model Post
require('./models/Post');



// depois de todo tramite de conexão com banco, chamar o app
const app = require('./app');
app.listen(process.env.PORT || 8001);