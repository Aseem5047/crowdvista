import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Menu = ({
	toggleMenu,
	user,
	setToggleMenu,
	handleLogout,
	baseUrl,
	randomImage,
}) => {
	const { t, i18n } = useTranslation();

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	return (
		<>
			<div className="flex items-center justify-center gap-4 relative">
				{/* when the menu is toggled */}
				{toggleMenu && user && (
					<div
						className="absolute min-w-[15rem] w-full top-16 right-0 flex flex-col text-[15px] text-black font-normal items-center justify-center border border-gray-300 rounded-lg z-40 shadow-md shadow-gray-300 bg-white pt-4"
						onMouseLeave={() => setToggleMenu(false)}
					>
						<div className="flex items-center justify-start gap-2 w-full px-4 mb-2 border-b pb-4">
							<Link
								to={`/user/profile/${user._id}`}
								className="hover:scale-110"
							>
								<img
									src={
										user && user?.profilePicture
											? `${baseUrl}/uploads/${user?.profilePicture}`
											: "https://source.unsplash.com/1600x900/?nature,technology,cartoon" ||
											  `/users/${randomImage}`
									}
									alt="profile"
									className="w-12 h-12 rounded-full object-cover"
								/>
							</Link>
							<Link
								to={`/user/profile/${user._id}`}
								className="flex flex-col flex-wrap"
							>
								<span className="text-base hoverEffectText text-ellipsis whitespace-nowrap overflow-hidden w-[9rem]">
									{user?.fullname}
								</span>
								<span className="text-sm bold">{user?.username}</span>
							</Link>
						</div>
						<Link
							to={"/authenticate"}
							onClick={() => setToggleMenu(false)}
							className="py-2 px-8  w-full hover:bg-gray-100"
						>
							{t("Authenticate")}
						</Link>
						{/* 
							<div className="w-full border-b my-2 border-gray-300"></div> */}

						<Link
							to={"/"}
							onClick={() => setToggleMenu(false)}
							className="py-2 px-8 w-full hover:bg-gray-100"
						>
							{t("CrowdVista Home")}{" "}
						</Link>
						<Link
							to={"/"}
							onClick={() => setToggleMenu(false)}
							className="py-2 px-8 w-full hover:bg-gray-100"
						>
							{t("Help")}
						</Link>
						<button
							onClick={handleLogout}
							className={`${
								!user
									? "hidden"
									: "py-2 px-8 w-full flex items-center gap-2 align-middle hover:bg-gray-100 text-start"
							} `}
						>
							{t("Log Out")}
						</button>
					</div>
				)}
				{/* when the menu is not toggled */}

				{/* language icon */}

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
						d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
					/>
				</svg>
				<div className="hoverEffectText" onClick={() => changeLanguage("fr")}>
					Fr
					{/* <svg
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
							d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
						/>
					</svg> */}
				</div>
				<div
					className="hoverEffectText flex gap-2"
					onClick={() => changeLanguage("en")}
				>
					Eng
					{/* <svg
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
							d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
						/>
					</svg> */}
				</div>

				{/* Profile and menu section */}

				<div className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2 px-5">
					<button
						className="hover:scale-125"
						onClick={() => setToggleMenu(!toggleMenu)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5 mr-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					</button>

					<Link
						to={user ? `/user/profile/${user?._id}` : `/authenticate`}
						className={`${
							user ? "bg-transparent" : "bg-gray-700"
						}  rounded-full text-white`}
					>
						{user ? (
							<img
								src={
									user.profilePicture
										? `${baseUrl}/uploads/${user.profilePicture}`
										: `/users/${randomImage}`
								}
								alt=""
								className={`${
									user ? "rounded-full" : "rounded-2xl"
								} h-8 w-8 rounded-full object-cover hover:scale-125`}
							/>
						) : (
							<img
								src={`/users/${randomImage}`}
								alt=""
								className={`${
									user ? "rounded-full" : "rounded-2xl"
								} h-8 w-8 rounded-full object-cover hover:scale-125`}
							/>
						)}
					</Link>
				</div>
			</div>
		</>
	);
};

export default Menu;
