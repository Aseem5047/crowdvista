import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = ({ user, randomImage, baseUrl, currentUser }) => {
	const [following, setFollowing] = useState(
		currentUser.following.includes(user._id)
	);

	const dispatch = useDispatch();

	const handleFollow = () => {
		const followApi = axios.put;
		const endpoint = following
			? `/user/${user?._id}/unfollow`
			: `/user/${user?._id}/follow`;

		followApi(endpoint, { userId: currentUser?._id, currentUser })
			.then((response) => {
				if (following) {
					toast.success(`${user?.username} Unfollowed`);
					setFollowing((prev) => !prev);
				} else {
					toast.success(`Following ${user?.username}`);
					setFollowing((prev) => !prev);
				}
			})
			.catch((error) => {
				toast.error(`Something went wrong`);
			});

		// setFollowing((prev) => !prev);
	};

	console.log(user);
	return (
		<div
			key={user._id}
			className="flex items-center justify-between w-full gap-2 mt-4"
		>
			<div className="flex items-center justify-start gap-2 w-full">
				<img
					src={
						user && user?.profilePicture
							? `${baseUrl}/${user?.profilePicture}`
							: "https://source.unsplash.com/1600x900/?nature,technology,cartoon" ||
							  `/users/${randomImage}`
					}
					alt="profile"
					className="w-12 h-12 rounded-full object-cover"
				/>
				<Link to={`/user/profile/${user._id}`} className="flex flex-col">
					<span className="text-base hoverEffectText">
						{user?.fullname.split(" ")[0]}
					</span>
					<span className="text-sm bold">{user?.username}</span>
					<span className="text-xs bold">Suggested User</span>
				</Link>
			</div>

			<div className="flex w-full gap-2 grow">
				{/* <Link
					to={`/user/profile/${user._id}`}
					className="button rounded-lg  m-auto blueGrad p-2 text-center w-full cursor-pointer"
				>
					Profile
				</Link> */}
				<button
					className="button rounded-lg flex items-center gap-2 m-auto blueGrad p-2 text-center w-full cursor-pointer"
					onClick={handleFollow}
				>
					{following ? "Following" : "Follow"}
					{following && (
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
								d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					)}
				</button>
			</div>
		</div>
	);
};

export default ProfileCard;
