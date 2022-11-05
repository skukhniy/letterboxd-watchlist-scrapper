import "./styles/App.scss";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import EntryForm from "./components/EntryForm";
import MainDisplay from "./components/MainDisplay";

function App() {
	const [boxdStreaming, setBoxdStreaming] = useState([]);
	const [boxdUser, setBoxdUser] = useState("");
	const [loading, setLoading] = useState(false);

	// set state for cleaned watchlist
	const fetchBoxdStreaming = async (e) => {
		e.preventDefault();
		setBoxdStreaming([]);
		setLoading(true);
		const response = await fetch(`/api/new/${boxdUser}`);
		console.log(response);
		const json = await response.json();
		setLoading(false);
		if (response.ok) {
			setBoxdStreaming(json);
			console.log(json);
		}
	};
	console.log(boxdStreaming !== []);

	return (
		<div className="App text-center">
			<div className="text-center mt-3">
				<div className="logoTitle d-flex justify-content-center align-items-center mb-2">
					<img src="https://clipground.com/images/letterboxd-logo.png"></img>
					<h2>Watchboxd</h2>
				</div>
				<p>
					Enter your letterboxd username below to see what movies on your
					watchlist came out on streaming this month!
				</p>
			</div>
			<EntryForm
				setBoxdUser={setBoxdUser}
				fetchBoxdStreaming={fetchBoxdStreaming}
			/>
			<div className="mt-4">
				{loading && (
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				)}
			</div>
			<div className="text-center mt-3">
				{boxdStreaming.length > 0 && (
					<MainDisplay boxdStreaming={boxdStreaming} />
				)}
			</div>
		</div>
	);
}

export default App;
