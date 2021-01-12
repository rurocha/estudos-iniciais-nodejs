const mongoose = require('mongoose');
const slug = require('slug');
// mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: 'campo title obrigatório',
	},
	slug: String,
	body: {
		type: String,
		trim: true,
	},
	tags: [String],
	photo: String,
	author: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	}
})

postSchema.pre('save', async function (next) {
	// condição sempre que adiciona um novo title
	if (this.isModified('title')) {
		const slugRegex = new RegExp(`^(${this.slug})((-[0-9]{1,}$)?)$`, 'i');
		const postWithSlug = await this.constructor.find({ slug: slugRegex });

		if (postWithSlug.length > 0) {
			this.slug = `${this.slug}-${postWithSlug.length + 1}`
		}
	};
	next();
});

postSchema.statics.getTagsList = function () {
	return this.aggregate([
		{ $unwind: '$tags' },
		{
			$group: {
				_id: '$tags',
				count: { $sum: 1 }
			},
		},
		// ordenando em ordem decrescente;
		{ $sort: { count: -1 } }
	]);
}

module.exports = mongoose.model('Post', postSchema)