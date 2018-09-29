const mongoose = require('mongoose');
const { Scheme } = mongoose;

const ArticleScheme = new Schema({
	title: String,
	body: String,
	author: String
}, {timestamps: true});


ArticleScheme.methods.toJSON = () => {
	_id: this._id,
	title: this.title,
	body: this.body,
	author: this.author,
	createdAt: this.createdAt,
	updatedAt: this.updatedAt
}

mongoose.model('Articles', ArticleScheme);