var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var router = express.Router();

var BASE = 'http://www.imdb.com/title/'

/* GET home page. */
router.get('/:id', function(req, res, next) {
	request.get(BASE+req.params.id, function(err, result, body){
		var movie = {}
		var $ = cheerio.load(body)
		movie.title = $('.title_wrapper > h1').text().trim()
		movie.description = $(".summary_text[itemprop='description']").text().trim()
		movie.creators = {
			director : $($(".credit_summary_item  [itemprop='director']")).text().trim(),
			writer : $($(".credit_summary_item  [itemprop='creator']")).text().trim(),
			actors: $($(".credit_summary_item  [itemprop='actors']")).text().trim()
		}
		movie.poster = $(".poster img").attr("src")
/*		fs.writeFile('scrap.json', JSON.stringify(title),  function(err) {
			if (err) {
				return console.error(err);
			}
		})*/

		res.render('movie', {
			title: movie.title,
			movie: movie
		})

	})
})

module.exports = router;
