const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const url = "https://letterboxd.com/mregis/watchlist";
// const test = "https://letterboxd.com/film/in-the-mood-for-love/watch";
// axios(url).then((res) => {
// 	const html = res.data;
// 	console.log(html);
// 	// const $ = cheerio.load(html);
// });

const movies = [];

// axios(url)
// 	.then((res) => {
// 		const html = res.data;
// 		// console.log(html);
// 		const $ = cheerio.load(html);
// 		const baseURL = "https://letterboxd.com";
// 		console.log($(".poster-container").length);
// 		$(".poster-container", html).each((i, el) => {
// 			// console.log($(el).html());
// 			const title = $(el).find("img").attr("alt");
// 			const movieRoute = $(el).find("div").data("target-link");
// 			const url = baseURL + movieRoute + "/watch/";
// 			movies.push({ title: title, url: url });
// 		});
// 		console.log("finished parsing");
// 	})
// 	.catch((err) => console.log(err));

// attempt to grab last page from the last page section on the first page ex: 1,2,3 .... 10"
// axios(url)
// 	.then((res) => {
// 		const html = res.data;
// 		// console.log(html);
// 		const $ = cheerio.load(html);
// 		const baseURL = "https://letterboxd.com";
// 		$(".paginate-pages", html).each((i, el) => {
// 			console.log($(el).html());
// 		});
// 	})
// 	.catch((err) => console.log(err));

// // The function below is kind-of pseudo code so don't try to copy/paste it :)
// let page = 1;
// const dispatchRequest = (page) => {
//   const response = axios({url: `${url}/page/${page}`});
//   // Ex: You can parse the response here with Cheerio and check if pagination is not disable
//   if(something){
//        return dispatchRequest(page+1);
//   }
//   else{
//       return response;
//   }

// }

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

// let promises = [];
// for (i = 1; i < 12; i++) {
// 	promises.push(
// 		axios(`${url}/page/${i}`).then((res) => {
// 			const html = res.data;
// 			const $ = cheerio.load(html);
// 			const baseURL = "https://letterboxd.com";
// 			$(".poster-container", html).each((i, el) => {
// 				const title = $(el).find("img").attr("alt");
// 				const movieRoute = $(el).find("div").data("target-link");
// 				const url = baseURL + movieRoute + "/watch/";
// 				movies.push({ title: title, url: url });
// 			});
// 		})
// 	);
// }

// let promises = [];
// let pageCheck = true;
// while (pageCheck) {
// 	promises.push(
// 		axios(`${url}/page/${page}`).then((res) => {
// 			const html = res.data;
// 			const $ = cheerio.load(html);
// 			if ($(".poster-container").length === 0) {
// 				pageCheck = false;
// 			}
// 			const baseURL = "https://letterboxd.com";
// 			$(".poster-container", html).each((i, el) => {
// 				const title = $(el).find("img").attr("alt");
// 				const movieRoute = $(el).find("div").data("target-link");
// 				const url = baseURL + movieRoute + "/watch/";
// 				movies.push({ title: title, url: url });
// 			});
// 		})
// 	);
// 	console.log(`reading page:${page}`);
// 	page += 1;
// }

// Promise.all(promises).then(() => {
// 	console.log(movies);
// 	console.log(`# of movies on watchlist = ${movies.length}`);
// });

app.listen(8000, () => console.log("server running on PORT 8000"));
