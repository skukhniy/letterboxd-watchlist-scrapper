import React from 'react';

export default function StreamingCard({
  streamingName,
  movieList,
  forWatchlist,
}) {
  // filter movie array for movies from the same streaming service
  let filteredList = [];
  let movieHTML = [];
  if (forWatchlist) {
    filteredList = movieList.filter(
      (movie) => movie.streaming === streamingName
    );
    movieHTML = filteredList.map((movie) => (
      <div className="d-flex flex-column justify-content-center align-items-center movieCard mb-3">
        <a href={movie.boxd_url} target="_blank">
          <div className="hoverPointer">
            <img className="" src={movie.poster}></img>
            <div className="mt-2">
              <span>{movie.title}</span>
              <span className="text-white-50">{` - ${movie.date}`}</span>
            </div>
          </div>
        </a>
      </div>
    ));
  } else {
    filteredList = movieList.filter(
      (movies) =>
        movies.streamingService === streamingName &&
        movies.poster !== undefined &&
        movies.poster !== ''
    );
    movieHTML = filteredList.map((movie) => (
      <div className="d-flex flex-column justify-content-center align-items-center movieCardSmall movieCardSmall mb-3 text-center">
        <a
          href={`https://www.letterboxd.com/film/${movie.movieTitle
            .replaceAll(' ', '-')
            .toLowerCase()}`}
          target="_blank"
        >
          <div className="hoverPointer">
            <img className="" src={movie.poster}></img>
            <div className="mt-2">
              <span>{movie.movieTitle}</span>
              <p className="text-white-50">{`${movie.date}`}</p>
            </div>
          </div>
        </a>
      </div>
    ));
  }
  console.log(filteredList);
  // create html elements

  // hold source for each logo image
  const imgArray = {
    NETFLIX:
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    HULU: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Hulu_logo_%282014%29.svg',
    'HBO MAX':
      'https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg',
    'PARAMOUNT+':
      'https://logodownload.org/wp-content/uploads/2021/03/paramount-plus-logo.png',
    PEACOCK:
      'https://upload.wikimedia.org/wikipedia/commons/d/d3/NBCUniversal_Peacock_Logo.svg',
    'PRIME VIDEO':
      'https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg',
    'DISNEY+':
      'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
  };
  return (
    <div className={`pb-4 mb-3 streamingCard`} id={streamingName}>
      <div className="streamingLogo">
        <img src={imgArray[streamingName]}></img>
      </div>
      <div
        className={
          forWatchlist === false
            ? 'allMoviesParent'
            : 'd-flex flex-column justify-content-center align-items-center'
        }
      >
        {filteredList.length > 0 ? (
          movieHTML
        ) : (
          <div>
            <p>Nothing new for this month :(</p>
          </div>
        )}
      </div>
    </div>
  );
}
