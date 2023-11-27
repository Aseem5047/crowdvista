import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUser } from "../lib/authSlice";
import { Link } from "react-router-dom";
import moment from "moment";

import Post from "../components/Post";
import { useSelector } from "react-redux";
import People from "../components/People";

const HomePage = () => {
	const [projects, setProjects] = useState([]);

	const [owners, setOwners] = useState({}); // State to store owner data
	const baseUrl = "http://localhost:5000";

	const user = useSelector(getUser);
	const [ready, setReady] = useState(false);

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

	useEffect(() => {
		axios
			.get(`/projects/${user?._id}/timeline`)
			.then(({ data }) => setProjects(data))
			.catch((error) =>
				user
					? toast.error("Post Something or Follow others")
					: console.log("Error Fetching Projects")
			);
	}, [user]);

	const getUserField = async (userId) => {
		try {
			const response = await axios.get(`/user/profile/${userId}`);
			return response.data;
		} catch (error) {
			// Handle any errors here if needed
			toast.error("Something went wrong Unable to load resources", error);
			return null; // Return null or a default value in case of an error
		}
	};

	// Use useEffect to fetch owner data when projects change
	useEffect(() => {
		const fetchOwnersData = async () => {
			const ownersData = {};
			for (const project of projects) {
				const ownerData = await getUserField(project.owner);
				if (ownerData) {
					ownersData[project.owner] = ownerData; // keeping owner id as key and storing its details inside it
				}
			}
			setOwners(ownersData);
		};
		fetchOwnersData();

		setTimeout(() => {
			setReady(true);
		}, 1500);
	}, [projects]);

	// Create a date formatter
	const dateFormatter = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	console.log(owners);

	return !ready ? (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center w-full  m-auto pb-4 px-10 lg:px-4 h-full">
			{projects.map((project) => (
				<div
					className="border border-gray-300 shadow rounded-md p-4 max-w-sm lg:max-w-md w-full mx-auto h-[30rem] "
					key={project._id}
				>
					<div className="animate-pulse flex space-x-4">
						<div className="rounded-full bg-gray-300 h-10 w-10"></div>
						<div className="flex-1 space-y-6 py-1">
							<div className="h-2 bg-gray-300 rounded"></div>
							<div className="space-y-3">
								<div className="grid grid-cols-3 gap-4">
									<div className="h-2 bg-gray-300 rounded col-span-2"></div>
									<div className="h-2 bg-gray-300 rounded col-span-1"></div>
								</div>
								<div className="h-2 bg-gray-300 rounded"></div>
							</div>
						</div>
					</div>
					<div className="animate-pulse w-full h-[15rem] bg-gray-300 my-6" />
					<div className="animate-pulse flex space-x-4">
						<div className="flex-1 space-y-6 py-1">
							<div className="h-2 bg-gray-300 rounded"></div>
							<div className="space-y-3">
								<div className="grid grid-cols-3 gap-4">
									<div className="h-2 bg-gray-300 rounded col-span-2"></div>
									<div className="h-2 bg-gray-300 rounded col-span-1"></div>
								</div>
								<div className="h-2 bg-gray-300 rounded"></div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	) : (
		<div className="flex flex-row-reverse justify-between relative gap-8 xl:px-[12.5rem] min-[1550px]:px-0">
			{user && (
				<div className="hidden lg:flex lg:flex-col lg:items-start lg:justify-start gap-4 flex-1 sticky top-28 mt-10 h-[66vh] max-w-[30rem] w-full">
					<People />
					{/* Footer */}
					<div className="flex flex-col items-start justify-center w-full gap-4 mt-2">
						<ul className="flex flex-wrap items-center justify-start w-full gap-3 cursor-pointer text-gray-300">
							<li className="hover:scale-110 hover:text-[#03a9f4f0]">
								<span>About</span>
							</li>
							<li className="hover:scale-110 hover:text-[#03a9f4f0]">
								<span>Help</span>
							</li>
							<li className="hover:scale-110 hover:text-[#03a9f4f0]">
								<span>Press</span>
							</li>
							<li className="hover:scale-110 hover:text-[#03a9f4f0]">
								<span>API</span>
							</li>
							<li className="hover:scale-110 hover:text-[#03a9f4f0]">
								<span>Jobs</span>
							</li>
							<li className="hover:scale-110 hover:text-[#03a9f4f0]">
								<span>Privacy</span>
							</li>
							<li className="hover:scale-110 hover:text-[#03a9f4f0]">
								<span>Terms</span>
							</li>
							<li className="hover:scale-110 hover:text-[#03a9f4f0]">
								<span>Locations</span>
							</li>
							<li className="hover:scale-110 hover:text-[#03a9f4f0]">
								<span>Language</span>
							</li>
						</ul>
						<div className="cursor-pointer text-gray-300">
							<span>© 2023 CrowdVista</span>
						</div>
					</div>
				</div>
			)}

			{projects.length === 0 ? (
				<div className="flex flex-col flex-1 items-center justify-center w-full h-[40rem] md:h-[75vh] min-[1750px]:h-[50rem]">
					<img
						src="https://cdn.myportfolio.com/ec4657434c011e1a856a01752ef5f2f5/0c428e8239727076ce2e1716b1ee529eff79ad34466fea57e80c3ebc4336a019821c607b17d5ada3_car_202x158.gif?h=f5388f39b837cfa003110ecd644d88be&url=aHR0cHM6Ly9taXItczMtY2RuLWNmLmJlaGFuY2UubmV0L3Byb2plY3RzL29yaWdpbmFsLzlhMGJiMzQ4MDk2NzMzLlkzSnZjQ3czTmpnc05qQXhMREUzTERBLmdpZg=="
						alt=""
						className="w-[40rem] h-auto  object-contain"
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
			) : (
				<div
					className={`${
						projects.length === 1
							? "flex flex-col-reverse md:grid md:grid-cols-2 gap-4 pb-10 justify-center items-center m-auto w-[60rem] min-[1750px]:w-[75rem] mt-10"
							: `grid grid-cols-1 md:grid-cols-2 gap-4 items-center ${
									!user
										? "lg:grid-cols-2"
										: `lg:w-[60%] lg:grid-cols-1 lg:mx-0 min-[1550px]:grid-cols-2 `
							  } w-full h-fit m-auto mt-10 pb-4 md:px-10 lg:px-4 min-[1550px]:flex-1`
					}`}
				>
					{projects.length === 1 && (
						<div className="flex flex-col flex-1 items-center justify-center w-full h-[40rem] md:h-[75vh] min-[1750px]:h-[50rem]">
							<img
								src="https://cdn.myportfolio.com/ec4657434c011e1a856a01752ef5f2f5/0c428e8239727076ce2e1716b1ee529eff79ad34466fea57e80c3ebc4336a019821c607b17d5ada3_car_202x158.gif?h=f5388f39b837cfa003110ecd644d88be&url=aHR0cHM6Ly9taXItczMtY2RuLWNmLmJlaGFuY2UubmV0L3Byb2plY3RzL29yaWdpbmFsLzlhMGJiMzQ4MDk2NzMzLlkzSnZjQ3czTmpnc05qQXhMREUzTERBLmdpZg=="
								alt=""
								className="w-full h-auto object-contain"
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
					{projects.map((project) => (
						<div
							className="flex flex-col justify-center items-center border border-gray-300 shadow-lg rounded-xl mb-8 py-4"
							key={project._id}
						>
							<div className="flex justify-between items-center px-4 py-2 w-full">
								<Link
									to={`/user/profile/${project?.owner}`}
									className="flex gap-2"
								>
									<img
										src={
											owners[project?.owner]?.profilePicture
												? owners[project.owner].profilePicture.includes(
														"https://storage.googleapis.com"
												  )
													? `${owners[project.owner].profilePicture}`
													: `${baseUrl}/uploads/${
															owners[project.owner].profilePicture
													  }`
												: `/users/${randomImage}`
										}
										alt="User"
										className="h-12 w-12 rounded-full object-cover hover:scale-125"
									/>
									<div className="flex flex-col items-start justify-center">
										<span className="hoverEffectText">
											{owners[project.owner]
												? owners[project.owner].username
												: "Welcome Guest"}
										</span>
										{/* <span className="hoverEffectText">
									{" "}
									{owners[project.owner]
										? owners[project.owner].username
										: "Guest"}
								</span> */}
										<span>
											{moment(project.createdAt).fromNow(true)}{" "}
											{moment(project.createdAt).fromNow() < 0
												? "from now"
												: "ago"}
										</span>
									</div>
								</Link>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-7 h-7 text-primary "
								>
									<path
										fillRule="evenodd"
										d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
										clipRule="evenodd"
									/>
								</svg>
							</div>

							<>
								<Post
									project={project}
									owner={owners[project.owner]}
									baseUrl={baseUrl}
									randomImage={randomImage}
									dateFormatter={dateFormatter}
									user={user}
								/>
							</>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default HomePage;
