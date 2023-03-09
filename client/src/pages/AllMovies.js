import { React, useEffect, useState } from 'react';
import DateCard from '../components/DateCard';
import Header from '../components/Header';
import StreamingCard from '../components/StreamingCard';

export default function AllMovies() {
  const [movieList, setMovieList] = useState([]);

  const fetchAllMovies = async () => {
    const response = await fetch('/api/monthly');
    const json = await response.json();
    setMovieList(json);
    console.log(json);
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  // let uniqueDates = [...new Set(movieList.map((movie) => movie.date))];

  const streamingServicesList = [
    'NETFLIX',
    'HULU',
    'HBO MAX',
    'PARAMOUNT+',
    'PEACOCK',
    'PRIME VIDEO',
    'DISNEY+',
  ];

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

  const moviesByDate = streamingServicesList.map((streamingService) => (
    <StreamingCard
      movieList={movieList}
      streamingName={streamingService}
      forWatchlist={false}
    />
  ));

  const quickLinks = streamingServicesList.map((streamingService) => (
    <a href={`#${streamingService}`} className="quickLink">
      <img src={imgArray[streamingService]}></img>
    </a>
  ));

  return (
    <div>
      <div className=" mt-5 mb-4 d-flex m-auto quickLinks">{quickLinks}</div>
      <div className="allMoviesContainer mt-3">{moviesByDate}</div>
    </div>
  );
}
