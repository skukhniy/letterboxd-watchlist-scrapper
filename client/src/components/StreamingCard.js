import React from "react";

export default function StreamingCard({ streamingName, boxdStreaming }) {
	// filter movie array for movies from the same streaming service
	const filteredList = boxdStreaming.filter(
		(movie) => movie.streaming === streamingName
	);
	// create html elements
	const movieHTML = filteredList.map((movie) => (
		<div>
			<a href={movie.boxd_url}>{movie.title}</a>
			<span>{`- ${movie.date}`}</span>
		</div>
	));
	return (
		<div className="border border-2 p-2 pb-4 me-3 ms-3 mb-3 streamingCard">
			<div>
				<h1>{streamingName}</h1>
				{movieHTML}
			</div>
		</div>
	);
}
