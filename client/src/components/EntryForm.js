import React from 'react';

export default function EntryForm({ setBoxdUser, fetchBoxdStreaming }) {
  return (
    <div className="text-center">
      <form action="get" className="mt-4">
        <input
          className=" form-control-md"
          id="boxdUser"
          onChange={(e) => setBoxdUser(e.target.value)}
          placeholder="Letterboxd Username"
        ></input>
        <button
          type="submit"
          onClick={fetchBoxdStreaming}
          className="mx-2 mb-1 submitButton"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
