import React from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../lib/authSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const OthercurrentUser = ({ id, baseUrl, currentUser }) => {
	const generateMessage = () => {
		toast.error("Can't Edit Other User's Profile");
	};
	return (
		<>
			<div className="flex gap-4 flex-col lg:flex-row min-w-[18rem] max-w-[70rem] lg:h-[35rem] min-[1550px]:h-full min-[1550px]:max-w-[80rem] rounded-xl w-full h-full items-center justify-center  m-auto lg:mt-10 min-[1550px]:my-auto animate-slide-in-right">
				<div className="flex justify-center items-center w-full lg:p-8 m-auto relative lg:w-1/2 h-full flex-col ">
					<img
						src={
							currentUser && currentUser.coverPicture
								? `${baseUrl}/uploads/${currentUser?.coverPicture}`
								: "https://source.unsplash.com/1600x900/?nature,technology,cartoon"
						}
						alt="Cover Image"
						className="h-full w-full top-0 left-0 rounded-xl  z-10 object-cover absolute"
					/>
					<div className="z-10 flex flex-col gap-4 items-center justify-center bg-black/60 py-10 px-6 rounded-xl text-white ">
						<span className="text-3xl sm:text-5xl font-extrabold mb-4 text-center">
							Hello Friend
						</span>
						<span className="text-base sm:text-xl mb-4 text-center w-[80%]">
							We are glad to have you please find required details in Profile
							Page.
						</span>
						<p className="text-base sm:text-xl mb-4 text-center  w-3/4">
							You are currently viewing profile of different user so some
							restrictions are implied.
						</p>

						<button
							className="button  bg-gradient-to-r from-yellow-500 to-pink-500 m-0 mt-6 flex"
							onClick={generateMessage}
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
						</button>
					</div>
				</div>

				<div className="flex flex-col py-4 justify-center items-center w-full lg:w-1/2 h-full flex-grow bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg">
					<div className="flex flex-col gap-4 items-center justify-center flex-wrap">
						<img
							src={
								currentUser && currentUser?.profilePicture
									? `${baseUrl}/uploads/${currentUser?.profilePicture}`
									: `https://source.unsplash.com/1600x900/?nature,technology,cartoon`
							}
							alt="Profile Image"
							className={`${
								currentUser ? "rounded-full" : "rounded-2xl"
							} h-40 w-40 rounded-full object-cover z-10 `}
						/>

						<div className="flex flex-col gap-4 justify-center items-center bg-black/60 py-10 px-6 rounded-xl text-white ">
							<div className="flex flex-col justify-center items-center">
								<span className=" font-medium ">{currentUser?.fullname}</span>
								<span className=" font-medium ">{currentUser?.email}</span>
							</div>

							<div className="flex gap-4 flex-wrap justify-center items-center">
								<span className="button hover:animate-none py-4 px-4 bg-gradient-to-r from-pink-500 to-yellow-500 flex">
									@{currentUser?.username}
								</span>
								<button
									className="flex gap-2 items-center justify-center button py-4 px-4 bg-gradient-to-r from-yellow-500 to-pink-500  hover:opacity:80 cursor-pointer "
									onClick={generateMessage}
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
								</button>
							</div>
							<div className="flex flex-col justify-center items-center text-start  max-w-[30rem]">
								<span className="w-full font-medium text-sm md:text-lg  mt-4">
									{currentUser?.about}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default OthercurrentUser;
