import React from "react";

export default function StreamingCard({ streamingName, boxdStreaming }) {
	// filter movie array for movies from the same streaming service
	const filteredList = boxdStreaming.filter(
		(movie) => movie.streaming === streamingName
	);
	// create html elements
	const movieHTML = filteredList.map((movie) => (
		<div className="d-flex flex-column justify-content-center align-items-center movieCard mb-3">
			<a href={movie.boxd_url} target="_blank">
				<img src={movie.poster}></img>
			</a>
			<div className="mt-2">
				<span>{movie.title}</span>
				<span>{` - ${movie.date}`}</span>
			</div>
		</div>
	));

	// hold source for each logo image
	const imgArray = {
		NETFLIX:
			"https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
		HULU: "https://upload.wikimedia.org/wikipedia/commons/0/03/Hulu_logo_%282014%29.svg",
		"HBO MAX":
			"https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg",
		"PARAMOUNT+":
			"https://logodownload.org/wp-content/uploads/2021/03/paramount-plus-logo.png",
		PEACOCK:
			"https://upload.wikimedia.org/wikipedia/commons/d/d3/NBCUniversal_Peacock_Logo.svg",
		"PRIME VIDEO":
			"https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg",
		"DISNEY+":
			"https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
	};
	return (
		<div className="pb-4 mb-3 streamingCard">
			<div className="streamingLogo">
				<img src={imgArray[streamingName]}></img>
			</div>
			<div className="">
				{filteredList.length > 0 ? (
					movieHTML
				) : (
					<div>
						<p>N/A</p>
					</div>
				)}
			</div>
		</div>
	);
}
