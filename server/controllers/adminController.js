const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { parse } = require("csv-parse");
const { stringify } = require("csv-stringify");
const { title } = require("process");
const Monthly = require("../models/NewStreaming");

function scrapeNewStreaming() {
	const url =
		"https://comicbook.com/movies/news/streaming-october-2022-new-movies-tv-netflix-disney-plus-hbo-max-hulu-peacock-paramount/#1";
	// const url =
	// 	"https://comicbook.com/movies/news/streaming-new-september-2022-netflix-disney-plus-hbo-max-paramount-peacock/#4";
	const newToStream = [];

	axios(url)
		.then((res) => {
			// load html page into cheerio
			const html = res.data;
			const $ = cheerio.load(html);
			// filter to content divs, loop through each div
			$(".content-gallery-content div", html).each((i, el) => {
				const div = $(el).html();

				// filter again by divs that include the <strong> tag
				if (div.includes("<strong>")) {
					const date = $(el).find("h2").html(); // save the date for this div
					const pTags = $(el).find("p").toArray(); // selector of <p> tags in this loop

					// loop through each paragraph element
					pTags.forEach((elem) => {
						const selector = $(elem);
						// save name of streaming service in this paragraph tag
						const streamService = selector.find("strong").html();
						// find all movie titles and save as Array
						const movies = selector.find("em").toArray();

						// loop through array of movies
						movies.forEach((movie) => {
							const movieSelector = $(movie);
							let movieTitle = movieSelector.html();
							movieTitle = movieTitle.replace("<br>", "");
							movieTitle = movieTitle.replace("&amp;", "&");
							// create new movie object, append to main array
							newObj = {
								movie: movieTitle,
								streaming: streamService,
								date: date,
							};
							newToStream.push(newObj);
						});
					});
				}
			});
			console.log(newToStream);
			return newToStream;
		})
		.catch((err) => console.log(err));
}

exports.getMonthly = async (req, res) => {
	try {
		const MonthlyList = await Monthly.find();
		res.json(MonthlyList);
	} catch (err) {
		res.status(400).json({ message: `${err}` });
	}
};
