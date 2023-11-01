import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUser } from "../lib/authSlice";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";

const People = () => {
	const currentUser = useSelector(getUser);
	const [users, setUsers] = useState([]);
	const baseUrl = "http://localhost:5000/uploads";

	useEffect(() => {
		axios.get("/user/").then(({ data }) => setUsers(data));
	}, []);

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

	// console.log(users);

	return (
		<div className="flex flex-col justify-center items-center w-full gap-4 ">
			{/* profile image / info + edit profile button */}
			<div className="flex items-center justify-between w-full  gap-2">
				<div className="flex items-center justify-start gap-2 w-full">
					<img
						src={
							currentUser && currentUser?.profilePicture
								? `${baseUrl}/${currentUser?.profilePicture}`
								: `/users/${randomImage}`
						}
						alt="profile"
						className="w-12 h-12 rounded-full object-cover"
					/>
					<Link
						to={`/user/profile/${currentUser._id}`}
						className="flex flex-col "
					>
						<span className="text-base bold hoverEffectText">
							{currentUser?.username}
						</span>
						<span className="text-xs">
							{currentUser?.fullname.split(" ")[0]}
						</span>
					</Link>
				</div>

				<Link
					to={`/user/profile/${currentUser._id}/edit`}
					className="button rounded-xl  m-auto blueGrad p-2 text-center w-3/4 cursor-pointer"
				>
					Edit Profile
				</Link>
			</div>
			{/* Separation */}
			<div className="hidden lg:flex justify-between gap-4 w-full">
				<span>Suggestions For You</span>
				<span className="flex gap-2 items-center">
					Users
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
						/>
					</svg>
				</span>
			</div>
			{/* Actual Users */}
			<div className="flex flex-col w-full overflow-y-auto max-h-[20rem] no-scrollbar">
				{users.map(
					(user) =>
						user._id !== currentUser._id && (
							<ProfileCard
								key={user._id}
								user={user}
								randomImage={randomImage}
								baseUrl={baseUrl}
								currentUser={currentUser}
							/>
						)
				)}
			</div>
		</div>
	);
};

export default People;
