const app = require('./app');

require('dotenv').config({path: '.env'})


// conexão ao banco de dados;
const mongoose = require('mongoose');
mongoose.connect(
	process.env.DATABASE,
	{useNewUrlParser: true, useUnifiedTopology: true}
	);
	// para tratar erros baseado nas conexoes ao banco dados;
	// primeiro parametro é o que eu quero monitorar
	mongoose.connection.on('error', (err) => {
		console.error(err.message);
	})
	
	// carregando model Post
	require('./models/Post');


// para mongoose utilizar es6, async await etc;
// mongoose.Promise = global.Promise;

app.listen(process.env.PORT || 8001);