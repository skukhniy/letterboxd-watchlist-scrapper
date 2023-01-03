const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { parse } = require('csv-parse');
const { stringify } = require('csv-stringify');
const { title } = require('process');
const Monthly = require('../models/NewStreaming');

// scrape list of movies from comicbook.com new streaming article
// upload movie objs to the DB
exports.uploadMonthly = async (req, res) => {
  // delete previous documents in the collection
  await Monthly.remove({});
  console.log('removed DB');
  const url =
    'https://comicbook.com/movies/news/streaming-new-movies-tv-january-2023-netflix-disney-plus-hbo-max/#1';
  // const url =
  //   'https://comicbook.com/movies/news/streaming-new-movies-tv-december-2022-netflix-disney-plus-hbo-max/';
  // const url =
  //   'https://comicbook.com/movies/news/november-new-streaming-movies-tv-netflix-disney-plus-hbo-max/';
  // const url =
  // 	"https://comicbook.com/movies/news/streaming-october-2022-new-movies-tv-netflix-disney-plus-hbo-max-hulu-peacock-paramount/#1";
  // const url =
  // 	"https://comicbook.com/movies/news/streaming-new-september-2022-netflix-disney-plus-hbo-max-paramount-peacock/#4";
  // const streamingStrings = [
  //   'NETFLIX',
  //   'HULU',
  //   'HBO MAX',
  //   'PARAMOUNT+',
  //   'PEACOCK',
  //   'PRIME VIDEO',
  //   'DISNEY+',
  // ];
  await axios(url)
    .then((res) => {
      // load html page into cheerio
      const html = res.data;
      const $ = cheerio.load(html);
      // filter to content divs, loop through each div
      $('.content-gallery-content div', html).each((i, el) => {
        const div = $(el).html();
        // console.log(`div = ${div}`);
        // filter again by divs that include the <strong> tag
        let h2Tags = $(el).find('h2').toArray();

        if (h2Tags.length > 2) {
          // if (streamingStrings.some((s) => div.includes(s))) {
          // console.log(`Streaming div located!`);
          const date = $(h2Tags.shift()).html(); // save the date for this div
          const pTags = $(el).find('p').toArray(); // selector of <p> tags in this loop

          // loop through each paragraph element
          for (i = 0; i < pTags.length; i++) {
            const selector = $(pTags[i]);
            // console.log(`pTag elem = ${selector}`);
            // save name of streaming service in this paragraph tag
            let streamingService = $(h2Tags[i]).html().toUpperCase();
            streamingService = streamingService.replace('<BR>', '');

            console.log(`streamingString = ${streamingService}`);
            console.log(`pTag elem = ${selector}`);

            // find all movie titles and save as Array

            let selectorString = selector.html();
            const movies = selectorString
              .split('<br>')
              .filter((s) => s !== streamingService);

            // console.log('selector');
            if (streamingService === 'HULU') {
              console.log(movies);
            }

            // loop through array of movies
            movies.forEach((movie) => {
              // clean movie title
              movie = movie.replace('&amp;', '&');
              movie = movie.replace(/\s--\sNETFLIX\s.*/g, '');
              if (streamingService === 'HBO MAX') {
                movie = movie.replace(' (HBO)', '');
              }
              if (streamingService === 'HULU') {
                movie = movie.replace(/\s\(\d{4}\)/gm, '');
              }
              movie = movie.replace(/,\s\d{4}/gm, '');
              movie = movie.replace(' (Freevee)', '');
              // console.log(movie);
              // create new movie object, append to main array
              const newObj = new Monthly({
                movieTitle: movie,
                streamingService: streamingService,
                date: date,
              });
              // console.log(newObj);
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
