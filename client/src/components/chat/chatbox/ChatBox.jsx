import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import noMessages from "./images/noMessages.png";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import toast from "react-hot-toast";

const ChatBox = ({
	chat,
	currentUser,
	currentUserImage,
	setSendMessage,
	receivedMessage,
}) => {
	const [userData, setUserData] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [image, setImage] = useState(null);
	const dispatch = useDispatch();

	const handleChange = (newMessage) => {
		setNewMessage(newMessage);
	};

	const onImageChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0];
			setImage(img);
		}
	};

	// fetching data for header
	useEffect(() => {
		const userId = chat?.members?.find((id) => id !== currentUser);
		const getUserData = async () => {
			try {
				const { data } = await axios.get(`/user/profile/${userId}`);
				setUserData(data);
			} catch (error) {
				console.log(error);
			}
		};

		if (chat !== null) getUserData();
	}, [chat, currentUser]);

	// fetch messages
	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const { data } = await axios.get(`/message/${chat._id}`);
				setMessages(data);
			} catch (error) {
				console.log(error);
			}
		};

		if (chat !== null) fetchMessages();
	}, [chat]);

	// Always scroll to last Message
	useEffect(() => {
		setTimeout(
			() =>
				document
					.getElementById("chats__")
					?.scrollBy({ top: 100000, left: 0, behavior: "smooth" }),
			300
		);
	}, [messages]);

	// Send Message
	const handleSend = async (e) => {
		e.preventDefault();

		const message = {
			senderId: currentUser,
			text: newMessage,
			chatId: chat._id,
		};

		// Check if there's an image to upload
		if (image) {
			try {
				const data = new FormData();
				data.append("chatImages", image);

				// Upload the chat image
				const response = await axios.post("/upload/chatImage", data, {
					headers: { "Content-Type": "multipart/form-data" },
				});

				if (Array.isArray(response.data) && response.data.length > 0) {
					message.image = response.data[0];
				} else {
					message.image = response.data;
				}
			} catch (error) {
				console.error(error);
				toast.error("Unable to Upload");
			}
		}

		const receiverId = chat.members.find((id) => id !== currentUser);

		// Send message to socket server
		setSendMessage({ ...message, receiverId });

		// Send message to the database
		try {
			const { data } = await axios.post("/message/", message);
			setMessages([...messages, data]);
			setNewMessage("");
			setImage(null);
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	const handleKeyDown = async (e) => {
		if (e.key === "Enter" || e.key === "13") {
			e.preventDefault();

			const message = {
				senderId: currentUser,
				text: newMessage,
				chatId: chat._id,
			};

			// Check if there's an image to upload
			if (image) {
				try {
					const data = new FormData();
					data.append("chatImages", image);

					// Upload the chat image
					const response = await axios.post("/upload/chatImage", data, {
						headers: { "Content-Type": "multipart/form-data" },
					});

					if (Array.isArray(response.data) && response.data.length > 0) {
						message.image = response.data[0];
					} else {
						message.image = response.data;
					}
				} catch (error) {
					console.error(error);
					toast.error("Unable to Upload");
				}
			}

			const receiverId = chat.members.find((id) => id !== currentUser);

			// Send message to socket server
			setSendMessage({ ...message, receiverId });

			// Send message to the database
			try {
				const { data } = await axios.post("/message/", message);
				setMessages([...messages, data]);
				setNewMessage("");
				setImage(null);
			} catch (error) {
				console.error("Error sending message:", error);
			}
		}
	};

	// Receive Message from parent component
	useEffect(() => {
		console.log("Message Arrived: ", receivedMessage);
		if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
			setMessages([...messages, receivedMessage]);
		}
		// eslint-disable-next-line
	}, [receivedMessage]);

	const scroll = useRef();
	const imageRef = useRef();

	console.log("Image ", image);

	return (
		<>
			<div className="bg-gray-100 border-radius-[1rem] w-full grid grid-rows-[10vh,60vh,10vh] rounded-xl p-4 max-h-[80vh] relative  md:mx-0">
				{chat ? (
					<>
						{/* chat-header */}
						<div className=" p-1 flex flex-col gap-2">
							<div className="flex justify-between w-full items-center ">
								<Link
									to={`/profile/${userData?._id}`}
									className="flex gap-2 items-center justify-start"
								>
									<>
										<img
											className="w-12 h-12 mix-blend-multiply rounded-full hover:scale-110 object-cover"
											src={
												userData?.profilePicture
													? userData.profilePicture
													: `https://source.unsplash.com/1600x900/?nature,technology,cartoon`
											}
											alt={userData?.fullname}
										/>
									</>
									<div className="flex flex-col">
										<span className="text-base font-medium mb-0 cursor-pointer text-[#252525] hoverEffectText">
											{userData?.fullname}
										</span>
										<span className="text-sm font-base mb-0 cursor-pointer text-[#252525] hoverEffectText">
											@ {userData?.username}
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
							<hr className="w-full border border-[#ececec] mt-1" />
						</div>

						{/* chat-body */}
						<div
							className="flex flex-col flex-1 grow gap-2 p-6 overflow-scroll no-scrollbar"
							id="chats__"
						>
							{messages.map((message, id) => (
								<div
									key={id}
									ref={scroll}
									className={
										message.senderId === currentUser
											? "message self-end rounded-2xl rounded-br-none bg-gradient-to-r from-blue-600 to-[#03a9f4f0]"
											: "message"
									}
								>
									<span className="text-lg">{message.text}</span>{" "}
									{message?.image && (
										<img
											className="h-40 rounded-xl"
											src={
												message?.image
													? message?.image
													: "./images/defaultBackground.png"
											}
											alt={currentUser?.username}
										/>
									)}
									<span className="text-sm self-start">
										{moment(message.createdAt).fromNow()}
									</span>
									{message.senderId === currentUser ? (
										<div className="flex justify-start">
											<img
												className="w-9 h-9 rounded-full object-cover"
												src={
													currentUserImage
														? currentUserImage
														: `https://source.unsplash.com/1600x900/?nature,technology,cartoon`
												}
												alt={userData?.fullname}
											/>
										</div>
									) : (
										<div className="flex justify-start">
											<img
												className="w-9 h-9 rounded-full object-cover"
												src={
													userData?.profilePicture
														? userData.profilePicture
														: `https://source.unsplash.com/1600x900/?nature,technology,cartoon`
												}
												alt={userData?.fullname}
											/>
										</div>
									)}
								</div>
							))}
						</div>
						{/* chat-sender */}
						<div className="flex items-center px-4 absolute bottom-2 w-full bg-gray-100 pt-2">
							<div
								onClick={() => imageRef.current.click()}
								className="bg-gray-200 h-fit w-[3rem] flex items-center justify-center p-2 rounded-xl cursor-pointer hoverEffectText"
							>
								+
							</div>
							{image && (
								<div className=" flex flex-row-reverse justify-end max-w-20 m-auto">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-4 h-4 z-20  cursor-pointer"
										onClick={() => setImage(null)}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>

									<img
										src={URL.createObjectURL(image)}
										alt="preview"
										className="w-12 h-12 object-cover rounded-xl ml-2"
									/>
								</div>
							)}
							<div className="flex flex-1 grow items-center w-[85%]">
								<InputEmoji
									value={newMessage}
									onChange={handleChange}
									onKeyDown={handleKeyDown}
								/>
							</div>
							<div
								className="blueGrad button py-2 px-4"
								style={{ cursor: "pointer", margin: "auto" }}
								onClick={handleSend}
							>
								<span>Send</span>
							</div>
							<input
								type="file"
								name=""
								id=""
								className="hidden"
								ref={imageRef}
								onChange={onImageChange}
							/>
						</div>
					</>
				) : (
					<div className="flex flex-col w-full h-max items-center justify-ceter absolute bottom-52">
						<img
							src={noMessages}
							alt=""
							style={{ margin: "auto", mixBlendMode: "multiply" }}
						/>
						<span className="flex items-center justify-center text-xl">
							Tap on a chat to start conversation ...
						</span>
					</div>
				)}
			</div>
		</>
	);
};

export default ChatBox;
