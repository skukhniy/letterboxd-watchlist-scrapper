const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const options = {
	method: "GET",
	url: "https://streaming-availability.p.rapidapi.com/search/basic",
	params: {
		country: "us",
		service: "netflix",
		type: "movie",
		output_language: "en",
		language: "en",
	},
	headers: {
		"X-RapidAPI-Key": "eed4ce17b2msh3e9a154b6f991dep1869a1jsn8cc985c0e65e",
		"X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
	},
};

const netflixInfo = [];

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

const promises = [];

for (let page = 1; page <= 10; page++) {
	options.params.page = page;
	promises.push(
		axios
			.request(options)
			.then(function (response) {
				// console.log(response.data.results);
				const data = response.data.results;
				data.forEach((movie) => {
					netflixInfo.push([movie.title, movie.year]);
				});
			})
			.catch(function (error) {
				console.error(error);
			})
	);
}

// You can pass the responses on this resolve if you want.
Promise.all(promises).then(console.log(netflixInfo));

app.listen(8000, () => console.log("server running on PORT 8000"));
