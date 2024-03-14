import React, { useState } from "react";
import { Link } from "react-router-dom";
import People from "./People";

const Search = ({
	toggleSearch,
	user,
	handleSearch,
	handleKeyDown,
	searchText,
	tags,
	clearSearchText,
	searchPost,
	handleTag,
	searchedUsers,
	posts,
	pathname,
	toggleSearchMenu,
	category,
	baseUrl,
}) => {
	// console.log(toggleSearch);
	const [toggleMenu, setToggleMenu] = useState(false);
	const togglePeopleMenu = () => {
		setToggleMenu(!toggleMenu);
	};

	return (
		<div
			className={`${
				toggleSearch
					? "w-screen h-screen fixed bottom-0 left-0 pt-2 text-white z-20 bg-black/60"
					: ""
			} `}
		>
			<div
				className={`${
					pathname === "/authenticate" ? "hidden" : "hidden md:flex mx-auto"
				} flex-grow max-w-[25rem] mx-10 items-center justify-center`}
			>
				{toggleSearch && user && (
					<div className="fixed top-[5.25rem] bg-white w-[85%] lg:w-1/2 left-1/2 transform -translate-x-[50%] self-center z-20 flex flex-col p-2 rounded-xl max-h-[38rem] overflow-y-scroll no-scrollbar">
						{/* Category */}
						<div className="flex gap-2 items-center justify-start my-2 mx-4 flex-wrap w-[70%] text-black">
							{category.map((tag, index) => (
								<span
									className={`cursor-pointer hover:text-primary  ${
										tags.includes(tag) &&
										"blueGrad py-2 px-4 hover:text-white rounded-xl hover:opacity-80"
									}`}
									key={index}
									onClick={() => handleTag(tag)}
								>
									#{tag}
								</span>
							))}
						</div>

						{/* main search bar */}
						<label className="relative flex items-center input px-4 outline-none">
							<input
								type="text"
								name="searchText"
								placeholder={`Hello ${
									user ? user.fullname || user.username : "Guest"
								} Enter Search Query`}
								value={searchText}
								className="outline-none bg-transparent w-full h-full text-black"
								onChange={handleSearch}
								onKeyDown={handleKeyDown}
							/>

							<div
								className={`${
									(searchText.length || tags.length) === 0 && "hidden"
								} absolute right-2 flex items-center justify-center gap-2`}
							>
								<button
									className={` bg-primary p-2 rounded-full text-white hover:opacity-75`}
									onClick={clearSearchText}
								>
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
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>

								<button
									className="bg-primary  rounded-full p-3 text-white hover:opacity-75"
									onClick={searchPost}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="3"
										stroke="currentColor"
										className="w-4 h-4"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
										/>
									</svg>
								</button>
							</div>
						</label>

						{/* users if search is successful */}
						{searchedUsers.length > 0 && (
							<div className="relative max-h-[11rem] overflow-y-scroll no-scrollbar mt-4">
								<div className="flex flex-col gap-2 items-center justify-center text-start relative">
									<span className="blueGrad mx-4 p-2 rounded-xl sticky top-0 z-20">
										Users Found
									</span>
									{searchedUsers.map((searchedUser, index) => (
										<div
											className="flex items-center justify-start gap-2 w-full px-4 mb-2 border-b pb-4"
											key={index + searchedUser.id}
											onClick={toggleSearchMenu}
										>
											<Link
												to={`/user/profile/${searchedUser?._id}`}
												className="transition-all duration-500 hover:scale-110"
											>
												<img
													src={
														searchedUser.profilePicture
															? searchedUser.profilePicture.includes(
																	"https://storage.googleapis.com"
															  )
																? `${searchedUser.profilePicture}`
																: `${baseUrl}/uploads/${searchedUser.profilePicture}`
															: "https://source.unsplash.com/1600x900/?nature,technology,cartoon"
													}
													alt="profile"
													className="w-12 h-12 rounded-full object-cover"
												/>
											</Link>
											<Link
												to={`/user/profile/${searchedUser?._id}`}
												className="flex flex-col flex-wrap text-black"
											>
												<span className="text-base hoverEffectText text-ellipsis whitespace-nowrap overflow-hidden  w-fit max-w-[9rem]">
													{searchedUser?.username}
												</span>
												<span className="text-sm bold text-ellipsis whitespace-nowrap w-[22rem] overflow-hidden">
													{searchedUser?.fullname}
												</span>
											</Link>
										</div>
									))}
								</div>
							</div>
						)}

						{/* posts if search is successful */}
						{posts.length > 0 && (
							<>
								<div className="relative max-h-[20rem] overflow-y-scroll no-scrollbar mt-4">
									<div className="flex flex-col gap-2 items-center justify-center relative">
										<span className="blueGrad mx-4 p-2 rounded-xl  sticky top-0 z-20">
											Projects Found
										</span>
										{posts.map((post) => (
											<div
												className="flex items-center justify-start gap-2 w-full px-4 mb-2 border-b pb-4"
												key={post?.id}
												onClick={toggleSearchMenu}
											>
												<Link
													to={`/projects/${post?._id}`}
													className="hover:scale-110"
												>
													<img
														src={
															post
																? post.photos[0].includes(
																		"https://storage.googleapis.com"
																  )
																	? `${post.photos[0]}`
																	: `${baseUrl}/uploads/${post.photos[0]}`
																: "https://source.unsplash.com/1600x900/?nature,technology,cartoon"
														}
														alt="profile"
														className="w-16 h-16 rounded-xl object-cover"
													/>
												</Link>
												<Link
													to={`/projects/${post?._id}`}
													className="flex flex-col flex-wrap text-black"
												>
													<span className="text-base hoverEffectText text-ellipsis whitespace-nowrap overflow-hidden  w-fit max-w-[9rem]">
														{post?.title}
													</span>
													<span className="text-sm bold text-ellipsis whitespace-nowrap w-[22rem] overflow-hidden">
														{post?.description}
													</span>
												</Link>
											</div>
										))}
									</div>
								</div>
							</>
						)}
					</div>
				)}

				<div className="flex justify-center items-center gap-4 border border-gray-300 rounded-full px-8 py-3 z-30">
					<div to="" className="navbarText " onClick={togglePeopleMenu}>
						People
					</div>
					{toggleMenu && (
						<div className="w-full h-full fixed top-0 left-0 pt-2 text-white z-20 bg-black/60">
							<div className="relative top-7 w-1/2 h-fit max-h-[33rem] px-16 py-4 pt-12 pb-10 m-auto text-black bg-gray-50 rounded-xl overflow-y-scroll no-scrollbar">
								<div
									className="blueGrad flex w-fit h-fit p-2  hoverEffectText absolute right-3 top-3"
									onClick={togglePeopleMenu}
								>
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
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</div>
								<People />
							</div>
						</div>
					)}
					<span className="text-xl">|</span>

					<Link
						to={`/user/profile/${user?._id}/projects`}
						className="navbarText "
					>
						Projects
					</Link>
					<span className="text-xl">|</span>

					<Link to={`/chat`} className="navbarText ">
						Connect
					</Link>
					<span className="text-xl">|</span>

					<button
						className="bg-primary outline-none  rounded-full px-4 py-2 text-white transition-all duration-500 hover:scale-110"
						onClick={toggleSearchMenu}
					>
						{toggleSearch ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="w-4 h-4"
							>
								<path
									fillRule="evenodd"
									d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
									clipRule="evenodd"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="3"
								stroke="currentColor"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
								/>
							</svg>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Search;
