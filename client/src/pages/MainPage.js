import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import EntryForm from '../components/EntryForm';
import MainDisplay from '../components/MainDisplay';
import Header from '../components/Header';

export default function MainPage() {
  const [boxdStreaming, setBoxdStreaming] = useState([]);
  const [boxdUser, setBoxdUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // set state for cleaned watchlist
  const fetchBoxdStreaming = async (e) => {
    e.preventDefault();
    if (boxdUser !== '') {
      setBoxdStreaming([]);
      setError('');
      setLoading(true);
      const response = await fetch(`/api/new/${boxdUser}`);
      const json = await response.json();
      setLoading(false);
      if (response.ok) {
        if (json.length === 0) {
          setError(
            'No movies from your watchlist have been added to streaming this month :('
          );
          setBoxdStreaming(json);
        } else if (json[0] === 'User not Found') {
          setError('This Letterboxd user does not exist.');
        } else {
          setBoxdStreaming(json);
        }
      }
    }
  };

  return (
    <div className="App text-center">
      <div className="text-center mt-3">
        <p className="me-5 ms-5">
          Enter your letterboxd username below to see what movies on your
          watchlist came out on streaming this month!
        </p>
        <span>Or view the </span>{' '}
        <Link to="/all-movies" className="allMoviesLink">
          full list
        </Link>{' '}
        <span> of movies that were added to streaming. </span>
      </div>
      <EntryForm
        setBoxdUser={setBoxdUser}
        fetchBoxdStreaming={fetchBoxdStreaming}
      />
      <div className="mt-4">
        {loading && (
          <div>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>Please wait.</p> <p>Large watchlists may take longer to load.</p>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center">
        {error != '' && <p className="me-5 ms-5">{error}</p>}
        {boxdStreaming.length > 0 && (
          <MainDisplay boxdStreaming={boxdStreaming} />
        )}
      </div>
    </div>
  );
}
