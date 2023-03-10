const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { parse } = require('csv-parse');
const { stringify } = require('csv-stringify');
const { title } = require('process');
const Monthly = require('../models/NewStreaming');
const e = require('express');

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
        console.log('data retrieved');
        const baseURL = 'https://letterboxd.com';
        // find div containers for each movie
        $('.poster-container', html).each((i, el) => {
          // grab title from the image alt data
          const title = $(el).find('img').attr('alt');
          // grab the movie link from the target link data attribute
          const movieRoute = $(el).find('div').data('target-link');
          const url = baseURL + movieRoute;
          // push title and movie url to the movies array
          movies.push({ title: title, url: url });
        });
        // if the page isn't empty, use recurssion to go through each page
        if ($('.poster-container').length !== 0) {
          return dispatchRequest(page + 1);
        } else {
          console.log(`There are ${movies.length} in this watchlist`);
        }
      })
      .catch((err) => {
        movies.push('User does not exist');
        console.log(err);
      });
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

// get associated movie poster from omdb
const getMoviePosterURL = async (movieTitle) => {
  const movieTitleQuery = movieTitle.replace(' ', '+');
  let moviePosterURL = '';
  await axios
    .get(`http://www.omdbapi.com/?t=${movieTitleQuery}&apikey=143d6d68&`)
    .then(
      (response) => {
        // console.log("poster added");
        moviePosterURL = response.data.Poster;
      },
      (error) => {
        moviePosterURL = '';
        console.log(error);
      }
    );
  return moviePosterURL;
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

// returns filtered list of watchlist movies that were added to streaming this month
exports.getCleanList = async (req, res) => {
  const cleanedList = [];
  const boxdList = await scrapeWatchlist(req.params.user);
  const newStreamingList = await Monthly.find();

  console.time('cleanList');
  // loop through each movie from the watchlist
  for (const movie of boxdList) {
    // loop through each new movie on streaming
    for (const streamingObj of newStreamingList) {
      // if the watchlist movie is in the list of new streaming movies, add it to the cleaned list
      if (movie.title === streamingObj.movieTitle) {
        // console.log("looping");
        const moviePoster = await getMoviePosterURL(movie.title);

        cleanedList.push({
          title: movie.title,
          streaming: streamingObj.streamingService,
          boxd_url: movie.url,
          date: streamingObj.date,
          poster: moviePoster,
        });
        // console.log("list appended");
      }
    }
  }
  console.timeEnd('cleanList');
  try {
    console.log('res sent');
    // console.log(cleanedList);
    // check if user exists
    if (boxdList[0] === 'User does not exist') {
      res.send(['User not Found']);
    } else {
      // if user exists send normal list
      res.send(cleanedList);
    }
  } catch (err) {
    console.log('error');
    res.status(400).json({ message: 'error' });
  }
};
