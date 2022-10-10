const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const url = "https://letterboxd.com/stanisloth/watchlist";
// const test = "https://letterboxd.com/film/in-the-mood-for-love/watch";
// axios(url).then((res) => {
// 	const html = res.data;
// 	console.log(html);
// 	// const $ = cheerio.load(html);
// });

const movies = [];

const dispatchRequest = (page) => {
	console.log(`${url}/page/${page}`);
	axios(`${url}/page/${page}`)
		.then((res) => {
			const html = res.data;
			const $ = cheerio.load(html);
			const baseURL = "https://letterboxd.com";
			$(".poster-container", html).each((i, el) => {
				const title = $(el).find("img").attr("alt");
				const movieRoute = $(el).find("div").data("target-link");
				const url = baseURL + movieRoute + "/watch/";
				movies.push({ title: title, url: url });
			});
			if ($(".poster-container").length !== 0) {
				return dispatchRequest(page + 1);
			} else {
				console.log("yay");
				console.log(movies);
				console.log(`There are ${movies.length} in this watchlist`);
			}
		})
		.catch((err) => console.log(err));
};
dispatchRequest(1);

app.listen(8000, () => console.log("server running on PORT 8000"));
