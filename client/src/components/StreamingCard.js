import React from "react";

export default function StreamingCard({ streamingName, boxdStreaming }) {
	// filter movie array for movies from the same streaming service
	const filteredList = boxdStreaming.filter(
		(movie) => movie.streaming === streamingName
	);
	// create html elements
	const movieHTML = filteredList.map((movie) => (
		<p>{`${movie.title} - ${movie.date}`}</p>
	));
	return (
		<div>
			<div>
				<h1>{streamingName}</h1>
				{movieHTML}
			</div>
		</div>
	);
}
