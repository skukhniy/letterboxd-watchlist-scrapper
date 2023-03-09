import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Link to="/">
      <div className="logoTitle d-flex justify-content-center align-items-center mt-3 mb-3">
        <img src="https://clipground.com/images/letterboxd-logo.png"></img>
        <h1>Watchboxd</h1>
      </div>
    </Link>
  );
}
