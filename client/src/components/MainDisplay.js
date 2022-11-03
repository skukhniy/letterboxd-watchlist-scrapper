import React from "react";
import StreamingCard from "./StreamingCard";

export default function MainDisplay({ boxdStreaming }) {
	return (
		<div>
			<StreamingCard boxdStreaming={boxdStreaming} streamingName={"NETFLIX"} />
			<StreamingCard boxdStreaming={boxdStreaming} streamingName={"HULU"} />
			<StreamingCard boxdStreaming={boxdStreaming} streamingName={"HBOMAX"} />
			<StreamingCard
				boxdStreaming={boxdStreaming}
				streamingName={"PARAMOUNT+"}
			/>
			<StreamingCard boxdStreaming={boxdStreaming} streamingName={"PEACOCK"} />
		</div>
	);
}
