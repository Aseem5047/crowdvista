import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const Comments = ({ comments, postOwner, baseUrl, commentsRef }) => {
	// List of image filenames
	var imageList = ["1.png", "2.png", "3.png", "4.png", "5.png"];

	// Check if a random image is already stored
	var storedImage = localStorage.getItem("randomImage");

	// If no image is stored, generate a random index and select an image
	if (!storedImage) {
		var randomIndex = Math.floor(Math.random() * imageList.length);
		var randomImage = imageList[randomIndex];
		localStorage.setItem("randomImage", randomImage);
	} else {
		// Use the stored image if available
		randomImage = storedImage;
	}

	return (
		<>
			<div
				className="overflow-y-scroll changeScrollbar h-[24rem] w-full flex flex-col justify-start items-start gap-7 pt-4"
				id="comments__"
			>
				{comments?.map((c, i) => (
					<div
						className="flex flex-wrap items-start gap-2 justify-start w-full"
						key={i}
					>
						<Link to={`/profile/${c?.split(": ")[4]}`} className="flex">
							<img
								src={
									c?.split(": ")[0] === "undefined"
										? `/users/${randomImage}`
										: c
												.split(": ")[0]
												.includes("https://storage.googleapis.com")
										? c?.split(": ")[0]
										: `${baseUrl}/${c?.split(": ")[0]}`
								}
								alt=""
								className="h-12 w-12 rounded-full object-cover hover:opacity-75"
							/>
						</Link>
						<div className="flex flex-col justify-center min-w-[7.5rem]">
							<strong style={{ fontSize: "0.9rem" }}>
								{c?.split(": ")[1]}
							</strong>
							<span style={{ color: "black", fontSize: "0.9rem" }}>
								{moment(c?.split(": ")[2]).fromNow()}
							</span>
						</div>
						<span className="font-normal px-2 text-[16px] text-left break-words w-[97%] max-h-[10rem] overflow-x-hidden overflow-y-scroll no-scrollbar">
							{c?.split(": ")[3]}
						</span>
						<div ref={commentsRef}></div>
					</div>
				))}
			</div>
		</>
	);
};

export default Comments;
