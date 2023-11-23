import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../lib/authSlice";
import axios from "axios";
import AccountNav from "../components/AccountNav";
// import AboutUser from "../components/AboutUser";
import Projects from "../pages/Projects";
import Purchases from "../pages/Purchases";
import OtherUserProfile from "../components/OtherUserProfile";
import UserProfile from "../components/UserProfile";

const Profile = () => {
	const user = useSelector(getUser);
	const { id, subpage } = useParams();
	const baseUrl = "http://localhost:5000";

	const [userProfile, setUserProfile] = useState();

	useEffect(() => {
		user &&
			axios
				.get(`/user/profile/${id}`)
				.then((response) => {
					const userData = response.data;
					setUserProfile(userData);
				})
				.catch((error) => {
					toast.error(error.response.data);
				});
	}, [id]);

	console.log(subpage);
	return (
		<>
			{user && user?._id === id ? (
				<div className="flex flex-col gap-4 justify-center items-center mt-[3rem]">
					<AccountNav subpage={subpage} id={id} />
					<div className="flex flex-col items-center justify-center gap-4 pb-4 w-full mb-[1rem] md:mb-auto">
						{subpage === "profile" ||
							(subpage === undefined && (
								<div className="flex flex-col w-full lg:w-[60%] items-center justify-center gap-4 pb-6 mt-16 lg:mt-8">
									{/* <AboutUser userProfile={userProfile} baseUrl={baseUrl} /> */}
									<UserProfile userProfile={userProfile} baseUrl={baseUrl} />
								</div>
							))}

						{subpage === "purchases" && <Purchases />}

						{subpage === "projects" && <Projects id={id} />}
					</div>
				</div>
			) : (
				<>
					<OtherUserProfile
						id={id}
						baseUrl={baseUrl}
						currentUser={userProfile}
					/>
				</>
			)}
		</>
	);
};

export default Profile;
