import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../lib/authSlice";
import { useSelector } from "react-redux";
import { Cursor, Typewriter } from "react-simple-typewriter";
import axios from "axios";
import moment from "moment";

const UserProfile = ({ baseUrl, userProfile }) => {
	const user = useSelector(getUser);
	const { id } = useParams();

	const [allUsers, setAllUsers] = useState([]);
	const [allProjects, setAllProjects] = useState([]);

	useEffect(() => {
		axios.get("/projects").then(({ data }) => setAllProjects(data));
	}, []);

	useEffect(() => {
		axios.get("/user/").then(({ data }) => setAllUsers(data));
	}, []);

	const usersFollowing = allUsers.filter((allUser) =>
		user?.following?.includes(allUser?._id)
	);

	const usersFollowed = allUsers.filter((allUser) =>
		user?.followed?.includes(allUser?._id)
	);

	const likedProjects = allProjects.filter((project) =>
		project.likes.includes(user._id)
	);

	console.log(likedProjects);

	return (
		<div className="w-full flex flex-col gap-7 items-center justify-center -mb-3 md:mb-auto">
			<img
				src={
					user && user?.profilePicture
						? user?.profilePicture.includes("https://storage.googleapis.com")
							? `${user?.profilePicture}`
							: `${baseUrl}/uploads/${user?.profilePicture}`
						: `https://source.unsplash.com/1600x900/?nature,technology,cartoon`
				}
				alt="Profile Image"
				className={`${
					user ? "rounded-full" : "rounded-2xl"
				} h-48 w-48 rounded-xl md:rounded-full object-cover z-10 `}
			/>
			<h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold w-full text-center">
				<Typewriter
					words={[
						`Hi, There ${user?.username}`,
						"Guy-Who-Love-Coffee.tsx",
						"< ButLovesToCodeMore />",
					]}
					loop={true}
					cursor
					cursorStyle="_"
					typeSpeed={70}
					deleteSpeed={50}
					delaySpeed={2000}
				/>
				<Cursor cursorColor="#F7AB0A" />
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 w-3/4 lg:w-fit gap-7 items-start justify-center px-4">
				<div className="flex flex-col justify-center items-start w-full gap-4">
					<div className="flex gap-4 justify-center items-start">
						<div className="flex flex-col justify-center items-start">
							<span className="font-medium text-3xl">
								{userProfile?.fullname}
							</span>
							<span className=" font-semibold text-lg text-primary hoverEffectText">
								{userProfile?.username}{" "}
							</span>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<Link
							to={`/user/profile/${id}/edit`}
							className=" blueGrad button h-fit p-3 m-0 hover:opacity:80 cursor-pointer flex gap-2 items-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
								/>
							</svg>
							Edit Profile
						</Link>

						<Link
							to={`/user/profile/${id}/purchases`}
							className=" blueGrad button h-fit p-3 m-0 hover:opacity:80 cursor-pointer flex gap-2 items-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
								/>
							</svg>
							<span className="block">Funded Projects</span>
						</Link>
					</div>

					<div className="flex flex-col justify-center items-start">
						<span className=" font-medium text-xl">Liked Projects</span>
						<span className="flex gap-2 items-center w-full flex-wrap">
							{likedProjects?.length > 0 ? (
								likedProjects.map((project) => (
									<Link to={`/projects/${project?._id}`} key={project?._id}>
										<img
											src={
												project?.photos[0].includes(
													"https://storage.googleapis.com"
												)
													? `${project?.photos[0]}`
													: `${baseUrl}/uploads/${project?.photos[0]}`
											}
											alt=""
											className="h-16 w-16 rounded-xl mt-2 hover:scale-110 object-cover"
										/>
									</Link>
								))
							) : (
								<div className="flex flex-col flex-1 items-start justify-start">
									<img
										src="https://cdn.myportfolio.com/ec4657434c011e1a856a01752ef5f2f5/0c428e8239727076ce2e1716b1ee529eff79ad34466fea57e80c3ebc4336a019821c607b17d5ada3_car_202x158.gif?h=f5388f39b837cfa003110ecd644d88be&url=aHR0cHM6Ly9taXItczMtY2RuLWNmLmJlaGFuY2UubmV0L3Byb2plY3RzL29yaWdpbmFsLzlhMGJiMzQ4MDk2NzMzLlkzSnZjQ3czTmpnc05qQXhMREUzTERBLmdpZg=="
										alt=""
										className="w-36 h-36 object-cover"
									/>
								</div>
							)}
						</span>
					</div>
				</div>

				{/* other details */}
				<div className="flex flex-1 flex-col gap-4 w-full h-full items-start justify-start">
					<div className="flex flex-col items-start justify-center gap-7 w-full">
						<div className="flex flex-col gap-2 justify-start items-start w-full">
							<div className="flex flex-col justify-center w-full">
								<span className="font-medium text-xl">Details</span>
								<span className="text-base w-full lg:max-w-sm overflow-y-scroll no-scrollbar max-h-32 py-2">
									{userProfile?.about}
								</span>
								<span className="font-base mt-4">
									<span className="font-bold text-primary">Works At</span>{" "}
									{userProfile?.worksAt}{" "}
								</span>
								<div className="flex flex-col items-start justify-center w-full mt-4 gap-4">
									<p className="flex items-center justify-center gap-2">
										<span className="font-bold text-primary">Following</span>{" "}
										<div className="flex items-center justify-center gap-2  flex-wrap">
											{usersFollowing.length > 0 ? (
												usersFollowing.map((user) => (
													<Link
														to={`/user/profile/${user?._id}`}
														className="flex items-center  hover:scale-110"
														key={user?._id}
													>
														<img
															src={
																user?.profilePicture
																	? user?.profilePicture
																	: `https://source.unsplash.com/1600x900/?nature,technology,cartoon`
															}
															alt="Profile Image"
															className={`${
																user ? "rounded-full" : "rounded-2xl"
															} h-10 w-10 rounded-xl md:rounded-full object-cover z-10 `}
														/>
													</Link>
												))
											) : (
												<span className="text-sm">No User Found</span>
											)}
										</div>
									</p>
									<p className="flex items-center justify-center gap-2">
										<span className="font-bold text-primary">Followers</span>{" "}
										<div className="flex items-ceter justify-center gap-2  flex-wrap">
											{usersFollowed.length > 0 ? (
												usersFollowed.map((user) => (
													<Link
														to={`/user/profile/${user?._id}`}
														className="flex items-center hover:scale-110"
														key={user?._id}
													>
														<img
															src={
																user && user?.profilePicture
																	? user?.profilePicture
																	: `https://source.unsplash.com/1600x900/?nature,technology,cartoon`
															}
															alt="Profile Image"
															className={`${
																user ? "rounded-full" : "rounded-2xl"
															} h-10 w-10 rounded-xl md:rounded-full object-cover z-10 `}
														/>
													</Link>
												))
											) : (
												<span className="text-sm">Users Not Found</span>
											)}
										</div>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex w-full items-center justify-between  gap-4">
						<div className="flex flex-col items-start justify-center">
							<span>
								<span className="font-medium">Registered</span>{" "}
								{moment(userProfile?.createdAt).fromNow(true)}{" "}
								{moment(userProfile?.createdAt).fromNow() < 0
									? "from now"
									: "ago"}
							</span>
							<span className="font-medium text-base text-primary ">
								{userProfile?.email}
							</span>
						</div>

						{user ? (
							<Link
								to={`/user/profile/${user._id}/project/new`}
								className="button py-2 px-4 blueGrad cursor-pointer m-0"
							>
								Create <span className="hidden md:block ml-1">Project</span>
							</Link>
						) : (
							<Link
								to="/authenticate"
								className="button py-2 px-4 blueGrad cursor-pointer m-0"
							>
								Authenticate
							</Link>
						)}
					</div>
				</div>
			</div>

			<div className="flex justify-center items-center w-full lg:p-8 relative h-full flex-col grow mb-4">
				<img
					src={
						user && user.coverPicture
							? user.coverPicture.includes("https://storage.googleapis.com")
								? `${user.coverPicture}`
								: `${baseUrl}/uploads/${user.coverPicture}`
							: "https://source.unsplash.com/1600x900/?nature,technology,cartoon"
					}
					alt="Cover Image"
					className="h-full w-full top-0 left-0 md:rounded-xl  z-10 object-cover absolute"
				/>
				<div className="z-10 flex flex-col gap-4 items-center justify-center bg-black/60 py-10 px-6 rounded-xl text-white ">
					<span className="text-3xl sm:text-5xl font-extrabold mb-4 text-center">
						Hello Friend
					</span>
					<span className="text-base sm:text-xl mb-4 text-center w-3/4">
						We are glad to have you please find required details in Profile
						Page. Explore this platform to get accustomed
					</span>
					<p className="text-base sm:text-xl mb-4 text-center  w-3/4">
						To see your funded projects or add a new project to your profile
						check out other tabs
					</p>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
