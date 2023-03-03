import React from 'react';

export default function EntryForm({ setBoxdUser, fetchBoxdStreaming }) {
  return (
    <div className="text-center">
      <p className="mt-4">Letterboxd Username:</p>
      <form action="get">
        <input
          id="boxdUser"
          onChange={(e) => setBoxdUser(e.target.value)}
        ></input>
        <button type="submit" onClick={fetchBoxdStreaming}>
          Submit
        </button>
      </form>
    </div>
  );
}
