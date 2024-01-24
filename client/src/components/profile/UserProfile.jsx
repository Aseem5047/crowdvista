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
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		axios.get("/projects/userProjects").then(({ data }) => setProjects(data));
	}, []);

	useEffect(() => {
		axios.get("/user/").then(({ data }) => setAllUsers(data));
	}, []);

	const filteredUsers = allUsers.filter((allUser) =>
		user.following.includes(allUser._id)
	);

	// console.log(filteredUsers);

	return (
		<div className="w-full flex flex-col items-center justify-center">
			<div className="flex flex-col lg:flex-row gap-14 items-center jsutify-center lg:justify-start w-fit px-4 lg:w-full">
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
					} h-52 w-52 md:h-40 md:w-40 rounded-xl md:rounded-full object-cover z-10 `}
				/>

				<div className="flex flex-1 flex-col gap-4 w-full h-full pt-4 items-start justify-start">
					<h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold px-10">
						<Typewriter
							words={[
								`Hi, The Name's is ${user?.username}`,
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
					<div className="flex justify-center gap-4 items-center w-full h-fit">
						<div className="flex flex-col grow min-w-[10rem]">
							<span className="font-medium text-xl">
								{userProfile?.fullname}
							</span>
							<span className=" font-medium text-primary hoverEffectText">
								{userProfile?.username}{" "}
							</span>
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
								className=" blueGrad button h-fit p-3 m-0 hover:opacity:80 cursor-pointer hidden md:flex gap-2 items-center"
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
					</div>
					<div className="flex flex-col ">
						<span className=" font-medium text-xl">Projects</span>
						<span className="flex gap-2 items-center w-full flex-wrap">
							{projects ? (
								projects.map((project) => (
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
											className="h-16 w-16 rounded-xl mt-2 hover:scale-110"
										/>
									</Link>
								))
							) : (
								<div className="flex flex-col flex-1 items-start justify-start">
									<img
										src="https://cdn.myportfolio.com/ec4657434c011e1a856a01752ef5f2f5/0c428e8239727076ce2e1716b1ee529eff79ad34466fea57e80c3ebc4336a019821c607b17d5ada3_car_202x158.gif?h=f5388f39b837cfa003110ecd644d88be&url=aHR0cHM6Ly9taXItczMtY2RuLWNmLmJlaGFuY2UubmV0L3Byb2plY3RzL29yaWdpbmFsLzlhMGJiMzQ4MDk2NzMzLlkzSnZjQ3czTmpnc05qQXhMREUzTERBLmdpZg=="
										alt=""
										className="w-[35%] h-[35%] object-contain"
									/>
									{user ? (
										<Link
											to={`/user/profile/${user._id}/project/new`}
											className="button blueGrad cursor-pointer "
										>
											Create New Project
										</Link>
									) : (
										<Link
											to="/authenticate"
											className="button blueGrad cursor-pointer "
										>
											Authenticate
										</Link>
									)}
								</div>
							)}
						</span>
					</div>
					<div className="flex flex-col">
						<span className="font-medium text-xl">Details</span>
						<span className="text-base">{userProfile?.about}</span>
						<span className="font-base">
							<span className="font-bold text-primary">Works At</span>{" "}
							{userProfile?.worksAt}{" "}
						</span>
					</div>

					<div className="flex flex-col ">
						<span>
							<span className="font-medium">Registered</span>{" "}
							{moment(userProfile?.createdAt).fromNow(true)}{" "}
							{moment(userProfile?.createdAt).fromNow() < 0
								? "from now"
								: "ago"}
						</span>
						<span className=" font-medium text-base text-primary ">
							{userProfile?.email}
						</span>
					</div>
				</div>
			</div>

			<div className="flex justify-center items-center w-full lg:p-8 m-auto relative lg:w-full h-full flex-col mt-8">
				<img
					src={
						user && user.coverPicture
							? user.coverPicture.includes("https://storage.googleapis.com")
								? `${user.coverPicture}`
								: `${baseUrl}/uploads/${user.coverPicture}`
							: "https://source.unsplash.com/1600x900/?nature,technology,cartoon"
					}
					alt="Cover Image"
					className="h-full w-full top-0 left-0 rounded-xl  z-10 object-cover absolute"
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
