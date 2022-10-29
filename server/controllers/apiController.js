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

			const filename = "NewStreaming.csv";
			const writableStream = fs.createWriteStream(filename);

			const columns = ["Movie Title", "Streaming Service", "Date"];
			const stringifier = stringify({ header: true, columns: columns });
			newToStream.forEach((obj) => {
				exportArray = Object.values(obj);
				stringifier.write(exportArray);
			});

			stringifier.pipe(writableStream);
			console.log("Finished writing data");
		})
		.catch((err) => console.log(err));
}

function scrapeWatchlist(username) {
	const url = `https://letterboxd.com/${username}/watchlist`;

	// array to store watchlist movie data
	const movies = [];

	const dispatchRequest = async (page) => {
		console.log(`${url}/page/${page}`);
		// load watchlist data for the page
		await axios(`${url}/page/${page}`)
			.then((res) => {
				const html = res.data;
				const $ = cheerio.load(html);
				const baseURL = "https://letterboxd.com";
				// find div containers for each movie
				$(".poster-container", html).each((i, el) => {
					// grab title from the image alt data
					const title = $(el).find("img").attr("alt");
					// grab the movie link from the target link data attribute
					const movieRoute = $(el).find("div").data("target-link");
					const url = baseURL + movieRoute + "/watch/";
					// push title and movie url to the movies array
					movies.push({ title: title, url: url });
				});
				// if the page isn't empty, use recurssion to go through each page
				if ($(".poster-container").length !== 0) {
					return dispatchRequest(page + 1);
				} else {
					console.log(`There are ${movies.length} in this watchlist`);
				}
			})
			.catch((err) => console.log(err));
		return movies;
	};
	// recurrsion func, returns full movie list
	return dispatchRequest(1);
}

function newList(boxd, database) {
	const newList = [];

	// compare letterboxd list to database list

	// return new list
}

//
exports.getBoxdList = async (req, res) => {
	try {
		let boxdList = await scrapeWatchlist(req.params.user);
		console.log(boxdList);
		res.json(boxdList);
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: `${err}` });
	}
};

exports.getMonthly = async (req, res) => {
	try {
		const MonthlyList = await Monthly.find();
		res.json(MonthlyList);
	} catch (err) {
		res.status(400).json({ message: `${err}` });
	}
};

exports.getCleanList = async (req, res) => {
	const cleanedList = [];
	const boxdList = await scrapeWatchlist(req.params.user);
	const newStreamingList = await Monthly.find();

	boxdList.forEach((movie) => {
		newStreamingList.forEach((streamingObj) => {
			console.log(streamingObj.MovieTitle);
			if (movie.title === streamingObj["Movie Title"]) {
				cleanedList.push({
					title: movie.title,
					streaming: streamingObj["Streaming Service"],
					boxd_url: movie.url,
					date: streamingObj.Date,
				});
			}
		});
	});

	// const cleanedList = boxdList.filter((element) => array2.includes(element));

	try {
		res.send(cleanedList);
	} catch (err) {
		res.status(400).json({ message: "error" });
	}
};
