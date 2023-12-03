import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoading } from "../../../lib/authSlice";
import axios from "axios";
import { saveUser } from "../../../lib/chatSlice";

const Conversation = ({ data, currentUser, online, everyChat }) => {
	const [userData, setUserData] = useState(null);
	const loading = useSelector(getLoading);

	useEffect(() => {
		const userId = data.members.find((id) => id !== currentUser);
		const getUserData = async () => {
			try {
				const { data } = await axios.get(`/user/profile/${userId}`);
				setUserData(data);
				dispatch(saveUser({ data: data }));
			} catch (error) {
				console.log(error);
			}
		};

		getUserData();

		// eslint-disable-next-line
	}, []);

	return (
		<>
			{loading ? (
				everyChat.map((chat) => (
					<div
						className="border border-gray-300 shadow rounded-md p-4 max-w-sm lg:max-w-md w-full mx-auto h-[6.5rem] "
						key={chat._id}
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
					</div>
				))
			) : (
				<>
					<div className="rounded-xl w-full hover:bg-[#80808038] cursor-pointer relative p-2">
						<div className="flex justify-start gap-2 w-full">
							{online && (
								<div className="rounded-full absolute left-10 w-4 h-4 z-10 bg-[greenyellow]"></div>
							)}
							<img
								className="w-12 h-12 mix-blend-multiply rounded-full bg-gradient-to-r from-blue-600 to-[#03a9f4f0] cursor-pointer object-cover"
								src={
									userData?.profilePicture
										? userData.profilePicture
										: `https://source.unsplash.com/1600x900/?nature,technology,cartoon`
								}
								alt={userData?.fullname}
							/>
							<div className="flex flex-col">
								<span className="text-base font-medium mb-0 cursor-pointer text-[#252525]">
									{userData?.fullname}
								</span>
								<span className="text-sm font-base mb-0 cursor-pointer text-[#252525]">
									@ {userData?.username}{" "}
								</span>
							</div>
						</div>
						<span
							className="absolute right-3 bottom-2"
							style={{ color: online ? "#51e200" : "", fontSize: "small" }}
						>
							{online ? "Online" : "Offline"}
						</span>
					</div>
					<hr className="w-full border border-[#ececec] mt-1" />
				</>
			)}
		</>
	);
};

export default Conversation;
