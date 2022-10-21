const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const url =
	"https://www.boston.com/culture/streaming/2022/09/29/new-movies-tv-streaming-october-2022-netflix-hulu-hbo-max-amazon-prime-disney-plus/";
axios(url).then((res) => {
	const html = res.data;
	console.log(html);
	// const $ = cheerio.load(html);
});

const movies = [];

// const dispatchRequest = (page) => {
// 	console.log(`${url}/page/${page}`);
// 	axios(`${url}/page/${page}`)
// 		.then((res) => {
// 			const html = res.data;
// 			const $ = cheerio.load(html);

// 			$(".poster-container", html).each((i, el) => {
// 				const title = $(el).find("img").attr("alt");
// 				const movieRoute = $(el).find("div").data("target-link");

// 				movies.push({ title: title, url: url });
// 			});
// 			if ($(".poster-container").length !== 0) {
// 				return dispatchRequest(page + 1);
// 			} else {
// 				console.log("yay");
// 				console.log(movies);
// 				console.log(`There are ${movies.length} in this watchlist`);
// 			}
// 		})
// 		.catch((err) => console.log(err));
// };
// dispatchRequest(1);

// axios
// 	.request(options)
// 	.then(function (response) {
// 		// console.log(response.data.results);
// 		const data = response.data.results;
// 		data.forEach((movie) => {
// 			netflixInfo.push([movie.title, movie.year]);
// 		});
// 		console.log(netflixInfo);
// 	})
// 	.catch(function (error) {
// 		console.error(error);
// 	});

app.listen(8000, () => console.log("server running on PORT 8000"));
