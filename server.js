const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { parse } = require("csv-parse");

const app = express();

const url =
	"https://comicbook.com/movies/news/streaming-october-2022-new-movies-tv-netflix-disney-plus-hbo-max-hulu-peacock-paramount/#1";

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
			if (div.includes("<strong>") & (i === 2)) {
				// save the date for this div
				const date = $(el).find("h2").html();
				// selector of <p> tags in this loop
				const pTags = $(el).find("p").toArray();

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
						const movieTitle = movieSelector.html();
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
	})
	.catch((err) => console.log(err));

app.listen(8000, () => console.log("server running on PORT 8000"));
