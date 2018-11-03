const mongoose = require('mongoose');
const router = require('express').Router();
const _ = require('lodash');
const Articles = mongoose.model('Articles');

const paramsName = [ 'title', 'body', 'author' ];
router.post('/', (req, res, next) => {
	const { body } = req;
	const errors = {};
	paramsName.forEach(param => {
		if (!body[param]) {			
			errors[param] = 'is required';			
		}
		
	});
	if (!_.isEmpty(errors)) {
		return res.status(402).json({
			errors: errors
		});
	}
	
	const finalArticle = new Articles(body);
	return finalArticle.save().then(() => res.json({ article: finalArticle.toJSON() }))
		.catch(next);
});

router.get('/', (req, res, next) => {
	Articles.find().sort({ createdAt: 'descending' })
	.then(articles => res.json({ articles: articles.map(article => article.toJSON())}))
	.catch(next);

});

router.param('id', (req, res, next, id) => {
    return Articles.findById(id, (err, article) => {
        if (err) {
            res.sendStatus(404);
            return;
        }
        req.article = article;
        return next();
    }).catch(next);
})

router.get('/:id', (req, res, next) => {
    return res.json({ article: req.article.toJSON() });
});

router.patch('/:id', (req, res, next) => {
    const { body } = req;
    paramsName.forEach(param => {
        if (!_.isEmpty(body[param])) {
            req.article[param] = body[param];
        }
    })
    req.article.save().then(() => res.json({ article: req.article.toJSON()} ))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Articles.findByIdAndRemove(req.article._id)
    .then(res.sendStatus(200))
    .catch(next);
})

module.exports = router;