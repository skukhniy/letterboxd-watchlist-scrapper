import React from 'react';
import ScrollToTop from './ScrollToTop';
import StreamingCard from './StreamingCard';

export default function MainDisplay({ boxdStreaming }) {
  return (
    <div className="d-sm-flex flex-wrap justify-content-center me-3 ms-3 streamingContainer">
      <StreamingCard
        movieList={boxdStreaming}
        streamingName={'NETFLIX'}
        forWatchlist={true}
      />
      <StreamingCard
        movieList={boxdStreaming}
        streamingName={'HULU'}
        forWatchlist={true}
      />
      <StreamingCard
        movieList={boxdStreaming}
        streamingName={'HBO MAX'}
        forWatchlist={true}
      />
      <StreamingCard
        movieList={boxdStreaming}
        streamingName={'PARAMOUNT+'}
        forWatchlist={true}
      />
      <StreamingCard
        movieList={boxdStreaming}
        streamingName={'PEACOCK'}
        forWatchlist={true}
      />
      <StreamingCard
        movieList={boxdStreaming}
        streamingName={'PRIME VIDEO'}
        forWatchlist={true}
      />
      <StreamingCard
        movieList={boxdStreaming}
        streamingName={'DISNEY+'}
        forWatchlist={true}
      />
      <ScrollToTop />
    </div>
  );
}
