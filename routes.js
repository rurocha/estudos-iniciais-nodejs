const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('home',
		{
			nome: 'ruanzinho',
			mostrar: true,
			ingredientes: [
				{ nome: 'leite', qtd: '1Lt' },
				{ nome: 'farinha', qtd: '1KG' },
			],
			negrito: '<strong>ruan</strong>'
		})
})



module.exports = router;