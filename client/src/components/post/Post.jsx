import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Post = ({
	project,
	owner,
	baseUrl,
	randomImage,
	dateFormatter,
	user,
}) => {
	const [expand, setExpand] = useState(false);

	const [liked, setLiked] = useState(
		project?.likes.includes(user?._id) ? true : false
	);
	const [likes, setLikes] = useState(project.likes.length);
	const [saved, setSaved] = useState(false);

	const [loading, setLoading] = useState(false);

	let LikedBy = [];
	let LikedByUserAvatar = [];

	for (let i = 0; i < likes; i++) {
		LikedBy.push(project.likedBy[i]);
	}

	LikedBy.map((avatar) =>
		LikedByUserAvatar.push(
			avatar?.split(": ")[0] ? avatar.split(": ")[0] : avatar?.split(": ")[0]
		)
	);

	const handleLike = async () => {
		if (user) {
			const finalLike = `${user?.profilePicture}: ${user?.username}`;
			console.log(finalLike);
			await axios.put(`/projects/${project?._id}/like`, {
				id: project?._id,
				userId: user?._id,
				value: finalLike,
			});

			setLiked((prev) => !prev);
			liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);

			setLoading(true);
			setTimeout(() => {
				setLoading(false);
				// window.location.reload(false);
			}, 1500);
		} else {
			toast.error("Authentication Required");
		}
	};

	return (
		<div className="mt-2">
			<Link
				to={`/projects/${project?._id}`}
				key={project?._id}
				className="px-4 flex"
			>
				{project.photos && (
					<img
						className=" object-cover w-4/5 m-auto md:w-full md:h-full aspect-square md:aspect-video 2xl:aspect-square rounded-xl"
						src={
							(project?.photos?.[0]?.includes(
								"https://storage.googleapis.com"
							) &&
								project?.photos?.[0]) ||
							`${baseUrl}/uploads/${project?.photos?.[0]}`
						}
						alt=""
					/>
				)}
			</Link>

			<div className="flex items-center justify-between px-4 mt-4">
				<div className="flex gap-4">
					{/* Like Icon */}
					{!liked ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6 cursor-pointer hover:text-primary"
							onClick={handleLike}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6 cursor-pointer hover:text-primary"
							onClick={handleLike}
						>
							<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
						</svg>
					)}

					{/* Comment Icon */}
					{user?._id !== owner?._id && (
						<Link to={"/chat"}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 hover:text-primary cursor-pointer"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
								/>
							</svg>
						</Link>
					)}

					{/* Share Icon */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 hover:text-primary cursor-pointer"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
						/>
					</svg>
				</div>

				{/* Save Icon */}

				{!saved ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 hover:text-primary cursor-pointer"
						onClick={() => setSaved(!saved)}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-6 h-6 hover:text-primary cursor-pointer"
						onClick={() => setSaved(!saved)}
					>
						<path
							fillRule="evenodd"
							d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
							clipRule="evenodd"
						/>
					</svg>
				)}
			</div>

			<div className="flex flex-col gap-2 justify-between items-start w-full h-full px-4 py-2 relative">
				<div className="flex flex-col gap-2 items-start">
					<span>
						Liked By{" "}
						{LikedBy.length <= 1
							? `${LikedBy.length} User`
							: `${LikedBy.length} Users`}
					</span>
					{loading ? (
						<div className="animate-pulse flex space-x-4">
							<div className="rounded-full bg-gray-300 h-10 w-10"></div>
						</div>
					) : (
						<div id="likedByAvatar" className="flex gap-2 items-center">
							{LikedByUserAvatar.map((person, id) => (
								<img
									className="h-8 w-8 rounded-full object-cover hover:scale-125"
									key={id}
									src={
										person && person !== "undefined"
											? person.includes("https://storage.googleapis.com")
												? `${person}`
												: `${baseUrl}/uploads/${person}`
											: `/users/${randomImage}`
									}
								/>
							))}
						</div>
					)}
				</div>
				<span className="text-sm ">
					{dateFormatter.format(new Date(project.createdAt))}
				</span>
				<h2
					className={`text-base text-ellipsis ${
						!expand ? "whitespace-nowrap w-[20rem] lg:w-[27rem]" : "w-full"
					}  overflow-hidden cursor-pointer`}
					onClick={() => setExpand(!expand)}
				>
					<span className="">
						{owner ? owner.username || owner.fullname : "Description"}
					</span>
					<span className="ml-2 text-gray-500 text-sm font-normal">
						{project.description}
					</span>
				</h2>

				<p className="text-sm font-semibold flex gap-2">
					{project.title}

					<span className="flex gap-2 text-primary text-sm font-normal ml-1 ">
						{project.features.map((feature, index) => (
							<span className="" key={index}>
								#{feature}
							</span>
						))}
					</span>
				</p>

				<a
					target="_blank"
					href={project.link}
					className="text-sm mt-1 text-gray-500 hoverEffectText"
				>
					{project.link}
				</a>
			</div>
		</div>
	);
};

export default Post;
