import { React, useEffect, useState } from 'react';
import DateCard from '../components/DateCard';
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

  const moviesByDate = streamingServicesList.map((streamingService) => (
    <StreamingCard
      movieList={movieList}
      streamingName={streamingService}
      forWatchlist={false}
    />
  ));

  return <div>{moviesByDate}</div>;
}
