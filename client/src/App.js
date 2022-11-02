import "./styles/App.scss";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
	const [boxdStreaming, setBoxdStreaming] = useState([]);
	const fetchBoxdStreaming = async (user) => {
		const response = await fetch(`/api/${user}`);
		const json = await response.json();

		if (response.ok) {
			setBoxdStreaming(json);
			console.log(json);
		}
	};

	return (
		<div className="App">
			<div className="text-center mt-5">
				<h1>Watchboxd</h1>
				<p>
					Enter your letterboxd username below to see what movies on your
					watchlist came out on streaming this month!
				</p>
			</div>
			<div className="text-center">
				<p>Letterboxd Username:</p>
				<form action="get">
					<input></input>
				</form>
			</div>
		</div>
	);
}

export default App;
