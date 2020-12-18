const mongoose = require('mongoose');
const PostModel = mongoose.model('Post');
const slug = require('slug');
const { splitWordToArray } = require('../helpers')

exports.add = ((req, res) => {
	res.render('postAdd');
});

exports.addAction  = async (req, res) => {
	// injetando slug no body;
	const {title} = req.body;
	req.body.slug = slug(title, {lower: true})

	// manipulando a tag digitado para inserir um array separando cada palavra;
	req.body.tags = splitWordToArray(req.body.tags, ',')
	req.body.author = req.user._id;

	const post = new PostModel(req.body);
	try {
			await post.save();
			
	} catch(error) {
			req.flash('error', `erro: ${error.message}`);
			return res.redirect('/post/add');
	}
	
	res.redirect('/');
	req.flash('success', 'Post salvo com sucesso!');
};

exports.edit = async (req, res) => {
	const {slug} = req.params; 
	const post = await PostModel.findOne({slug: slug});
	res.render('postEdit', post);
};

exports.editAction = async (req, res) => {
	const {title} = req.body;
	// setando novo slug atualizado baseado com novo title no body
	req.body.slug = slug(title, {lower: true});

	// manipulando a tag digitado para inserir um array separando cada palavra;
	req.body.tags = splitWordToArray(req.body.tags, ',')

	try {
		await PostModel.findOneAndUpdate(
				{slug: req.params.slug}, // encontrando o post para editar
				req.body, // eviando novos elementos para atualizar
				{new: true, runValidators: true} //retornar novo item atualizado e validado;
			);
	} catch(error) {
		req.flash('error', `Erro: ${error.message}`)
		res.redirect(`/post/${req.params.slug}/edit`)
	}
	req.flash('success', 'Post atualizado com sucesso!');
	res.redirect('/');
};


exports.view = async (req, res) => {
	const {slug} = req.params; 
	const post = await PostModel.findOne({slug: slug});
	res.render('viewPost', post);
};