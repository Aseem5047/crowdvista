import React, { useRef, useState, useEffect } from "react";
import ChatBox from "../components/chat/chatbox/ChatBox";
import Conversation from "../components/chat/conversation/Conversation";

import { getUser } from "../lib/authSlice";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";
import toast from "react-hot-toast";

const Chat = () => {
	const socket = useRef();
	const user = useSelector(getUser);
	const [chats, setChats] = useState([]);
	const [persons, setPersons] = useState([]);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [sendMessage, setSendMessage] = useState(null);
	const [receivedMessage, setReceivedMessage] = useState(null);
	// const [userExists, setUserExists] = useState(false);

	useEffect(() => {
		const fetchPersons = async () => {
			const { data } = await axios.get("/user/");
			setPersons(data);
		};
		fetchPersons();
	}, []);

	// Get the chat in chat section
	useEffect(() => {
		const getChats = async () => {
			try {
				const { data } = await axios.get(`/chat/${user._id}`);
				setChats(data);
			} catch (error) {
				console.log(error);
			}
		};
		getChats();
	}, [user._id]);

	// Connect to Socket.io
	useEffect(() => {
		// socket.current = io("ws://localhost:8800");
		socket.current = io("https://crowdvista-socket.vercel.app");
		socket.current.emit("new-user-add", user._id);
		socket.current.on("get-users", (users) => {
			setOnlineUsers(users);
		});
	}, [user]);

	// Send Message to socket server
	useEffect(() => {
		if (sendMessage !== null) {
			socket.current.emit("send-message", sendMessage);
		}
	}, [sendMessage]);

	// Get the message from socket server
	useEffect(() => {
		socket.current.on("recieve-message", (data) => {
			console.log(data);
			setReceivedMessage(data);
		});
	}, []);

	// check online status
	const checkOnlineStatus = (chat) => {
		const chatMember = chat.members.find((member) => member !== user._id);
		const online = onlineUsers.find((user) => user.userId === chatMember);
		return online ? true : false;
	};

	const activeUsers = persons.filter((person) => person._id !== user._id);

	const userExist = chats.map((chat) =>
		chat.members.find((id) => id !== user._id)
	);

	const newChat = async (reciever) => {
		const foundUser = userExist.map((user) => user === reciever._id);
		const result = foundUser.every((value) => value === false);
		// console.log(result);
		if (result) {
			// console.log("hello")
			await axios.post("/chat/", {
				senderId: user?._id,
				receiverId: reciever?._id,
			});
			toast.success("Reloading to save changes");
			toast.success("Select Chat and Start Messaging");
			setTimeout(() => {
				window.location.reload();
			}, 3000);
		} else {
			toast.error("Conversation with user exists");
		}
	};

	console.log(chats);
	console.log(activeUsers);

	return (
		<>
			<div className="relative flex justify-center mt-10 gap-4 flex-wrap">
				{/* Left Side */}
				<div className="flex flex-col gap-4 w-full max-w-[30rem] md:max-w-[20rem] rounded-xl h-[75vh]">
					<div className="flex flex-col gap-4 bg-gray-100 rounded-xl p-4 h-full min-h-[45vh] md:min-h-[80vh] overflow-x-hidden overflow-y-scroll no-scrollbar">
						<span className="text-2xl font-semibold ">Accounts</span>

						{/* creating chats with new users */}
						<div className="flex flex-col gap-6 overflow-auto w-full no-scrollbar">
							{activeUsers.map((person, index) => (
								<div
									className="flex gap-4 justify-between items-center"
									key={index}
								>
									<div className="flex gap-2 items-center">
										<img
											className="w-12 h-12 mix-blend-multiply rounded-full bg-gradient-to-r from-blue-600 to-[#03a9f4f0] cursor-pointer object-cover"
											src={
												person?.profilePicture
													? person.profilePicture
													: `https://source.unsplash.com/1600x900/?nature,technology,cartoon`
											}
											alt={person?.fullname}
										/>
										<div className="flex flex-col">
											<span className="text-base font-medium mb-0 text-[#252525] ">
												{person?.fullname}
											</span>
											<span className="text-sm font-base mb-0 text-[#252525] ">
												@ {person?.username}
											</span>
										</div>
									</div>

									<button
										type="submit"
										className="button blueGrad py-2 m-0"
										onClick={() => newChat(person)}
									>
										Chat
									</button>
								</div>
							))}
							<img
								src="https://i.pinimg.com/originals/de/d0/bb/ded0bbdd8485e424327257405a86a884.gif"
								alt=""
								className="mix-blend-multiply w-full h-auto mt-10"
							/>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-4 w-full max-w-[30rem] md:max-w-[20rem] rounded-xl h-fit md:h-[75vh]">
					<div className="flex flex-col gap-4 bg-gray-100 rounded-xl p-4 h-full min-h-fit md:min-h-[80vh] overflow-x-hidden overflow-y-scroll no-scrollbar">
						{chats.length === 0 ? (
							<span className="text-2xl font-semibold ">
								Start Conversation
							</span>
						) : (
							<span className="text-2xl font-semibold ">Chats</span>
						)}

						<div
							className={`${
								chats.length === 0
									? "my-auto"
									: "w-full flex flex-col gap-4 flex-1 grow "
							}`}
						>
							{/* displaying existing chats */}
							{chats.length !== 0 ? (
								chats?.map((chat, index) => (
									<div
										onClick={() => {
											setCurrentChat(chat);
										}}
										key={index}
									>
										<Conversation
											key={chat._id}
											data={chat}
											everyChat={chats}
											currentUser={user._id}
											online={checkOnlineStatus(chat)}
										/>
									</div>
								))
							) : (
								<img
									src="https://cdn.dribbble.com/users/172747/screenshots/3135893/peas-nochats.gif"
									alt=""
									className="mix-blend-multiply w-full h-auto"
								/>
							)}
						</div>
					</div>
				</div>

				{/* Right Side */}

				<div className="flex flex-col gap-4 w-full max-w-[50rem]">
					<ChatBox
						chat={currentChat}
						currentUser={user._id}
						currentUserImage={user.profilePicture}
						setSendMessage={setSendMessage}
						receivedMessage={receivedMessage}
					/>
				</div>
			</div>
		</>
	);
};

export default Chat;
