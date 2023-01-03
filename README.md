# Watchboxd
![watchboxd pic](https://www.stanislavkukhniy.com/static/media/watchboxd.a5e5882b.png)

### [Live Demo](http://watchboxd.stanislavkukhniy.com)
If you dont have a Letterboxd account, you can use my account (Stanisloth) to test the app.

#### 📝 Description
This MERN-stack app scrapes the HTML of a users Letterboxd movie watchlist, and news articles, to return a clean list of movies from their watchlist that were added to streaming services that month.

#### 💡 Features
* RESTful API which can scrape Letterboxd / comicbook.com HTML, cross filter two lists of movies, and return a clean array with movie data.
* Active database with MongoDB to store arrays containing new movies added to streaming each month.
* Usage of Open Movie Database API to gather movie poster src images https://www.omdbapi.com/
* Webscrapping done with Cheerio, and Axios
* Responsive UI for mobile devices
* Full-stack app housed on a virtual Ubuntu machine using AWS EC2. 

#### 🛠️ Built with 
 * React
 * SCSS
 * MongoDB
 * Mongoose
 * Express
 * NodeJS
 * Axios
 * Cheerio
 * AWS EC2
 * [OMDB API](https://www.omdbapi.com/)
 
 
## Getting started

After cloning the repo, run:

```elm
cd server
npm install
npm run devStart
```

The REST API is now running at `localhost:4001`.

```
cd client
npm install
npm run build
npm start
```

The client is now running at `localhost:3000`.

## Praise
Users have said:

![image](https://user-images.githubusercontent.com/59482034/210404391-17e344cf-e8b2-459d-8de1-f88e091493af.png)

