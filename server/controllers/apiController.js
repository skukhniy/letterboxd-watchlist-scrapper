const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { parse } = require("csv-parse");
const { stringify } = require("csv-stringify");
const { title } = require("process");
const Monthly = require("../models/NewStreaming");

// scrape and return array of movies on a users watchlist
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

// return scrapped letterboxd List
exports.getBoxdList = async (req, res) => {
	try {
		let boxdList = await scrapeWatchlist(req.params.user);
		// console.log(boxdList);
		res.json(boxdList);
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: `${err}` });
	}
};

// return monthly list of movies added to streaming
exports.getMonthly = async (req, res) => {
	try {
		const MonthlyList = await Monthly.find();
		res.json(MonthlyList);
	} catch (err) {
		res.status(400).json({ message: `${err}` });
	}
};

//
exports.getCleanList = async (req, res) => {
	const cleanedList = [];
	const boxdList = await scrapeWatchlist(req.params.user);
	const newStreamingList = await Monthly.find();

	boxdList.forEach((movie) => {
		newStreamingList.forEach((streamingObj) => {
			// console.log(streamingObj.movieTitle);
			if (movie.title === streamingObj.movieTitle) {
				cleanedList.push({
					title: movie.title,
					streaming: streamingObj.streamingService,
					boxd_url: movie.url,
					date: streamingObj.date,
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
