exports.index = (req, res) => {
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
}