var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var router = express.Router();

var BASE = 'http://www.imdb.com'

/* GET home page. */
router.get('/', function(req, res, next) {
	var movies = []
	request.get(BASE+'/chart/top', function(err, result, body){
		var $ = cheerio.load(body)
		var links = $(".lister-list > tr").map(function(i){
			var movie = {
				rank: (movies.length + 1),
				title: $(this).find(".titleColumn > a").text(),
				year: $(this).find(".titleColumn > span").text(),
				rating:  + ($(this).find(".ratingColumn.imdbRating > strong").text()), 
				votes: $(this).find(".ratingColumn.imdbRating > strong").attr("title").split("on")[1].split("user")[0].trim(),
				link: ($(this).find(".titleColumn > a").attr("href").split("?")[0].split("/title")[1]),
				imgURL: $(this).find(".posterColumn").find("a > img").attr("src")
			}
			movies.push(movie)
		}).get();	
		fs.writeFile('scrap.json', JSON.stringify(movies),  function(err) {
			if (err) {
				return console.error(err);
			}
		})

	res.render('topmovies', {
		title: "IMDB Top 250 movies",
		movies: movies
	})
	}) 

})

module.exports = router;
