const mongoose = require('mongoose');
const router = require('express').Router();
const Articles = mongoose.model('Articles');

const paramsName = [ 'title', 'body', 'author' ];
router.post('/', (req, res, next) => {
	const { body } = req;
	paramsName.foreach(param => {
		if (!body[param]) {
			errors = {};
			errors[param] = 'is required';
			return res.status(402).json({
				errors: errors
			});
		}
		
		const finalArticle = new Article(body);
		return finalArticle.save().then(() => res.json({ article: finalArticle.toJSON() }))
			.catch(next);					
	});				
});
router.get('/', (req, res, next) => {
	Articles.find().sort({ createdAt: 'decending' })
	.then(articles => res.json({ articles: articles.map(article => article.toJSON())}))
	.catch(next);
	
});

_handleMissingParam(param, paramName, res) {
	if (!param) {
		res.status(402).json({
			errors: '
		});	
}
