import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import Comments from "./Comments";

const CommentSection = ({ owner, project, currentUser }) => {
	const [comments, setComments] = useState(project ? project.comments : []);
	const [comment, setComment] = useState("");
	const commentsRef = useRef();
	const baseUrl = "http://localhost:5000/uploads";

	// Use useEffect to update comments when the project prop changes
	useEffect(() => {
		if (project) {
			setComments(project.comments);
		}
	}, [project]);

	const handleSubmit = async () => {
		var today = new Date();
		var date =
			today.getFullYear() +
			"-" +
			(today.getMonth() + 1) +
			"-" +
			today.getDate();
		var time =
			today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date + " " + time;

		const finalComment = `${currentUser?.profilePicture}: ${currentUser?.username}: ${dateTime}: ${comment}: ${currentUser._id}`;
		// console.log("Final Comment ", finalComment);
		try {
			const response = await axios.post(`/projects/${project._id}/comment`, {
				comment: finalComment, // Send finalComment as the 'comment' field in the request body
				userId: currentUser._id, // You may want to include the user ID separately
			});

			// Assuming backend returns the updated comments, update state with the new comments
			setComments(response.data.comments); // Update comments state with the new comments

			setComment(""); // Clear the comment input field

			setTimeout(
				() =>
					document
						.getElementById("comments__")
						?.scrollBy({ top: 100000, left: 0, behavior: "smooth" }),
				300
			);
		} catch (error) {
			// Handle any error that occurred during the request
			console.error("Error posting comment:", error);
		}
	};

	useEffect(() => {
		if (commentsRef.current) {
			commentsRef.current?.scrollBy({
				top: 100000,
				left: 0,
				behavior: "smooth",
			});
		}
	}, []);

	// console.log(project?.comments);

	return (
		<>
			{/* Comments */}

			{comments?.length > 0 ? (
				<Comments
					postOwner={owner}
					comments={comments}
					baseUrl={baseUrl}
					commentsRef={commentsRef}
				/>
			) : (
				<>
					<div className="flex justify-center items-center w-full h-full">
						<div className="noComment_img">
							<img
								src="https://t4.ftcdn.net/jpg/03/79/76/09/360_F_379760906_3Pn5AMiEU2gWkLwX4Xoan4TZrScgqQwk.jpg"
								alt=""
								className="w-40 h-40 mix-blend-multiply"
							/>
						</div>
					</div>
				</>
			)}

			{/* Comments Section */}
			{/* absolute -bottom-[3.5rem] md:bottom-0 lg:-bottom-2 left-0 bg-transparent */}
			<div className="w-[96%] flex items-center  ">
				<InputEmoji
					value={comment}
					onChange={setComment}
					cleanOnEnter
					onEnter={handleSubmit}
					placeholder="Add a Comment"
					name="Comment"
				/>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-7 h-7 hover:text-primary hover:scale-125 cursor-pointer"
					style={{ display: `${comment.length === 0 ? "none" : "inline"}` }}
					onClick={handleSubmit}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
					/>
				</svg>
			</div>
		</>
	);
};

export default CommentSection;
