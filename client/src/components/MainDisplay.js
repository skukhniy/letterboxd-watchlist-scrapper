import React from "react";
import StreamingCard from "./StreamingCard";

export default function MainDisplay({ boxdStreaming }) {
	return (
		<div className="d-sm-flex flex-wrap justify-content-center me-3 ms-3">
			<StreamingCard boxdStreaming={boxdStreaming} streamingName={"NETFLIX"} />
			<StreamingCard boxdStreaming={boxdStreaming} streamingName={"HULU"} />
			<StreamingCard boxdStreaming={boxdStreaming} streamingName={"HBO MAX"} />
			<StreamingCard
				boxdStreaming={boxdStreaming}
				streamingName={"PARAMOUNT+"}
			/>
			<StreamingCard boxdStreaming={boxdStreaming} streamingName={"PEACOCK"} />
			<StreamingCard
				boxdStreaming={boxdStreaming}
				streamingName={"PRIME VIDEO"}
			/>
			<StreamingCard boxdStreaming={boxdStreaming} streamingName={"DISNEY+"} />
		</div>
	);
}
