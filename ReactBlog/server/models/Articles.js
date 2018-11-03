const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
//const { Scheme } = mongoose;

const ArticleScheme = new Scheme({
	title: String,
	body: String,
	author: String
}, {timestamps: true});


ArticleScheme.methods.toJSON = function() {
	return {
		_id: this._id,
		title: this.title,
		body: this.body,
		author: this.author,
		createdAt: this.createdAt,
		updatedAt: this.updatedAt
	}
}

mongoose.model('Articles', ArticleScheme);