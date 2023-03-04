const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { parse } = require('csv-parse');
const { stringify } = require('csv-stringify');
const { title } = require('process');
const Monthly = require('../models/NewStreaming');

// get associated movie poster from omdb
const getMoviePosterURL = async (movieTitle) => {
  const movieTitleQuery = movieTitle.replace(' ', '+');
  let moviePosterURL = '';
  await axios
    .get(`http://www.omdbapi.com/?t=${movieTitleQuery}&apikey=143d6d68&`)
    .then(
      (response) => {
        moviePosterURL = response.data.Poster;
      },
      (error) => {
        moviePosterURL = '';
        console.log(error);
      }
    );
  return moviePosterURL;
};

// cleans and replaces problematic substrings in movie Titles
const cleanMovieTitle = (movieTitle, streamingService) => {
  movieTitle = movieTitle.replace('&amp;', '&');
  movieTitle = movieTitle.replace(/\s--\sNETFLIX\s.*/g, '');
  if (streamingService === 'HBO MAX') {
    movieTitle = movieTitle.replace(' (HBO)', '');
  }
  if (streamingService === 'HULU') {
    movieTitle = movieTitle.replace(/\s\(\d{4}\)/gm, '');
  }
  if (streamingService === 'PRIME VIDEO') {
    movieTitle = movieTitle.replace(/ \(\d{4}\)/gm, '');
  }
  movieTitle = movieTitle.replace(/,\s\d{4}/gm, '');
  movieTitle = movieTitle.replace(' (Freevee)', '');
  movieTitle = movieTitle.replace('\t', '');
  return movieTitle;
};

const getMovieList = () => {};

// scrape list of movies from comicbook.com new streaming article
// upload movie objs to the DB
exports.uploadMonthly = async (req, res) => {
  // delete previous documents in the collection
  await Monthly.remove({});
  console.log('removed DB');
  const url = `https://comicbook.com/movies/news/${req.params.id}`;

  await axios(url)
    .then((res) => {
      // load html page into cheerio
      const html = res.data;
      const $ = cheerio.load(html);
      // filter to content divs, loop through each div
      $('.content-gallery-content div', html).each((i, el) => {
        // filter again by divs that include the <strong> tag
        let h2Tags = $(el).find('h2').toArray();

        if (h2Tags.length > 2) {
          const date = $(h2Tags.shift()).html(); // save the date for this div
          const pTags = $(el).find('p').toArray(); // selector of <p> tags in this loop

          // loop through each paragraph element
          for (i = 0; i < pTags.length; i++) {
            const selector = $(pTags[i]);

            // save name of streaming service in this paragraph tag
            let streamingService = $(h2Tags[i]).html().toUpperCase();
            streamingService = streamingService.replace('<BR>', '');

            // find all movie titles and save as Array
            let selectorString = selector.html();
            const movies = selectorString
              .split('<br>')
              .filter((s) => s !== streamingService);

            // loop through array of movies
            movies.forEach(async (movie) => {
              // clean movie title
              const movieTitle = cleanMovieTitle(movie, streamingService);

              const moviePosterURL = await getMoviePosterURL(movieTitle.trim());

              // create new movie object, append to main array
              const newObj = new Monthly({
                movieTitle: movieTitle.trim(),
                streamingService: streamingService,
                poster: moviePosterURL,
                date: date,
              });
              newObj.save();
            });
          }
        }
      });
    })
    .catch((err) => console.log(err));
  try {
    res.send('New List Complete');
  } catch (err) {
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
