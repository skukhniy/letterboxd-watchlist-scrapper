const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const url = "https://letterboxd.com/Stanisloth/watchlist/";
// const test = "https://letterboxd.com/film/in-the-mood-for-love/watch";
// axios(url).then((res) => {
// 	const html = res.data;
// 	console.log(html);
// 	// const $ = cheerio.load(html);
// });

const movies = [];

axios(url)
	.then((res) => {
		const html = res.data;
		// console.log(html);
		const $ = cheerio.load(html);
		const baseURL = "https://letterboxd.com";
		$(".poster-container", html).each((i, el) => {
			// console.log($(el).html());
			const title = $(el).find("img").attr("alt");
			const movieRoute = $(el).find("div").data("target-link");
			const url = baseURL + movieRoute + "/watch/";
			movies.push({ title: title, url: url });
			axios(url).then((res) => {
				const html = res.data;
				// console.log(html);
			});
		});
		console.log(movies);
	})
	.catch((err) => console.log(err));

app.listen(8000, () => console.log("server running on PORT 8000"));
