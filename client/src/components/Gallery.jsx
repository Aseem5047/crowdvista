import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import toast from "react-hot-toast";
import CurrencyInput from "react-currency-input-field";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch } from "react-redux";
import { setCurrentFundedProject, setCurrentFunding } from "../lib/authSlice";

const Gallery = ({
	project,
	showAllPhotos,
	setShowAllPhotos,
	baseUrl,
	owner,
	currentUser,
}) => {
	// Create a date formatter
	const dateFormatter = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showFunds, setShowFunds] = useState(false);
	const [addedFunds, setAddedFunds] = useState(0);
	const [totalFunds, setTotalFunds] = useState(0);
	const { id } = useParams();

	useMemo(() => {
		setTotalFunds(
			project?.recievedFunds?.reduce(
				(accumulator, amount) => accumulator + amount,
				0
			)
		);
	}, [showFunds]);

	let stripePromise;

	const getStripe = () => {
		if (!stripePromise) {
			stripePromise = loadStripe(
				"pk_test_51JovZySDBS9sTKNkxz3QCHZuKBEX0rgxy6T311FMKxhPjCFkgM5C5Gm7lQCMmy4rHZjgYDHcqS1llEZCJUBWCGc800W8a0799r"
			);
		}

		return stripePromise;
	};

	const handleCheckout = async () => {
		const stripe = await getStripe();

		try {
			const response = await axios.post("/payment/checkout", [
				{
					title: project.title,
					recievedFunds: addedFunds,
					// photos: project.photos,
					// Add more items if needed
				},
			]);

			if (response.status === 200) {
				dispatch(setCurrentFunding(addedFunds));
				dispatch(setCurrentFundedProject(project._id));
				const session = response.data;
				await stripe.redirectToCheckout({ sessionId: session.id });
			} else {
				toast.error("Payment failed. Please try again.");
			}
		} catch (error) {
			toast.error("Error processing payment.");
			console.error(error);
		}
	};

	const redirectToProfile = (e) => {
		e.preventDefault();
		currentUser?._id === owner?._id
			? navigate(`/user/profile/${owner._id}/project/${project._id}`)
			: toast.error("You can only edit your own profile");
	};

	const handleFunds = (value, name) => {
		setAddedFunds(value);
	};

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

	console.log(project);

	return (
		<div className=" bg-gray-100 p-8  rounded-2xl">
			{showAllPhotos ? (
				<div className=" absolute inset-0 min-h-screen z-40 bg-white">
					<div className="px-8 py-4 sticky top-0 z-20 bg-white">
						<h2 className="text-3xl my-2 px-2 max-w-[75%]">
							Photos of {project.title}
						</h2>
						<button
							onClick={() => setShowAllPhotos(false)}
							className="absolute right-12 top-6 bg-gray-100 flex gap-2 hover:bg-primary hover:text-white font-medium px-4 py-2 rounded-xl text-black"
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
							<span> Close Gallery</span>{" "}
						</button>
					</div>

					<div className="px-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-8 relative bg-white">
						{project?.photos?.length > 0 &&
							project.photos.map((photo) => (
								<div key={project?._id}>
									<img
										src={`${baseUrl}/${photo}`}
										alt=""
										className="rounded-xl w-full h-full aspect-square object-cover m-auto"
									/>
								</div>
							))}
					</div>
				</div>
			) : (
				<>
					<div className="relative">
						<div className="grid gap-2 grid-cols-[2fr_1fr] ">
							<div className="">
								{project?.photos && project.photos[0] ? (
									<img
										onClick={() => setShowAllPhotos(true)}
										src={`${baseUrl}/${project?.photos[0]}`}
										alt=""
										className="aspect-video h-full max-h-[40rem] object-cover rounded-xl cursor-pointer"
									/>
								) : (
									<img
										src="https://source.unsplash.com/1600x900/?nature,technology, cartoon"
										alt=""
										className="aspect-video object-cover  h-full w-full relative top-2 rounded-xl cursor-pointer"
									/>
								)}
							</div>
							<div className="grid">
								{project?.photos && project.photos[1] ? (
									<img
										onClick={() => setShowAllPhotos(true)}
										src={`${baseUrl}/${project?.photos[1]}`}
										alt=""
										className="aspect-video w-full h-full object-cover rounded-xl cursor-pointer"
									/>
								) : (
									<img
										src="https://source.unsplash.com/1600x900/?nature,technology, cartoon"
										alt=""
										className="aspect-video object-cover  h-full w-full relative top-2 rounded-xl cursor-pointer"
									/>
								)}
								<div className="overflow-hidden rounded-xl">
									{project?.photos && project.photos[2] ? (
										<img
											onClick={() => setShowAllPhotos(true)}
											src={`${baseUrl}/${project?.photos[2]}`}
											alt=""
											className="aspect-video object-cover w-full h-full relative top-2 rounded-xl cursor-pointer"
										/>
									) : (
										<img
											src="https://source.unsplash.com/1600x900/?nature,technology, cartoon"
											alt=""
											className="aspect-video object-cover  h-full w-full relative top-2 rounded-xl cursor-pointer"
										/>
									)}
								</div>
							</div>
						</div>

						<button
							onClick={() => setShowAllPhotos(true)}
							className="absolute bottom-6 right-4 py-2 px-4 bg-white  rounded-2xl hover:bg-primary hover:text-white font-medium flex gap-2 justify-center items-center"
						>
							Show more Photos
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
									d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
								/>
							</svg>
						</button>
					</div>
					<div className="grid md:grid-cols-2 pb-4 md:pb-0 gap-8 md:gap-0">
						<div className="flex flex-col items-start justify-start md:px-8 py-2 w-full h-full mt-0 md:mt-4 gap-4 relative order-2 md:order-1">
							<CommentSection
								owner={owner}
								project={project}
								currentUser={currentUser}
							/>
						</div>
						<div className="order-1 md:order-2">
							<div className="my-4">
								<h2 className="font-semibold text-2xl mb-1">Title</h2>
								<span>{project.title}</span>
							</div>
							<div className="my-4 ">
								<h2 className="font-semibold text-2xl mb-1">Description</h2>
								<span>{project.description}</span>
							</div>
							<div className="my-4 ">
								<h2 className="font-semibold text-2xl mb-1">Extra Info</h2>
								<span>{project.extraInfo}</span>
							</div>

							<div className="flex justify-between items-start w-full mt-7">
								<Link
									to={`/user/profile/${project?.owner}`}
									className="flex gap-2"
								>
									<img
										src={
											owner?.profilePicture
												? `${baseUrl}/${owner?.profilePicture}`
												: `/users/${randomImage}`
										}
										alt="Profile"
										className="h-12 w-12 rounded-full object-cover hover:scale-125"
									/>

									<div className="flex flex-col items-start justify-center">
										<span className="hoverEffectText flex justify-center items-center gap-2">
											{owner ? owner.username : "Welcome Guest"}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="w-6 h-6 text-primary "
											>
												<path
													fillRule="evenodd"
													d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
													clipRule="evenodd"
												/>
											</svg>
										</span>

										<span>
											{moment(project.createdAt).fromNow(true)}{" "}
											{moment(project.createdAt).fromNow() < 0
												? "from now"
												: "ago"}
										</span>
									</div>
								</Link>
								<div className="flex justify-center items-center gap-2">
									<button
										className="button hover:opacity-75 bg-primary text-white m-0 py-2 px-4"
										onClick={redirectToProfile}
									>
										Edit Profile
									</button>
									<button
										onClick={() => setShowFunds(!showFunds)}
										className={`button hover:opacity-75 bg-primary ${
											showFunds && "blueGrad"
										} text-white m-0 py-2 px-4`}
									>
										Fund Project
									</button>
								</div>
							</div>

							<span className="flex mt-4 gap-2 text-primary text-basefont-normal ml-1 ">
								{project?.features?.map((feature, index) => (
									<span className="cursor-pointer hoverEffectText" key={index}>
										#{feature}
									</span>
								))}
							</span>
						</div>
					</div>

					{showFunds && (
						<div
							className={`${
								project?.comments.length === 0 && "mt-8"
							} flex  items-center justify-center gap-2`}
						>
							<div className="w-full grid md:grid-cols-3 md:mt-2 gap-12 ">
								<div>
									{/* <span className="blueGrad flex w-full h-full items-center justify-center rounded-xl text-xl font-semibold">
										Thanks For Your Support
									</span> */}
									<img
										src="https://cdn.dribbble.com/users/1785628/screenshots/5923745/media/50cb24a91c962b4a63a37346811b14a4.gif"
										alt=""
										className="max-h-40 md:max-h-32 object-cover w-1/2 m-auto md:w-full rounded-xl"
									/>
								</div>

								<div className="flex flex-col items-center gap-2">
									<span className="blueGrad flex md:w-full h-full items-center justify-center rounded-xl px-8 py-4 w-3/4">
										Fund Required ₹ {project?.requiredPrice}
									</span>
									<span className="blueGrad flex md:w-full h-full items-center justify-center rounded-xl px-8 py-4 w-3/4">
										Fund Recieved ₹ {totalFunds}
									</span>
								</div>

								<div className="flex items-center flex-col justify-center md:justify-between">
									<CurrencyInput
										name="addedFunds"
										value={addedFunds}
										onValueChange={handleFunds}
										decimalScale={2} // Specify the number of decimal places
										prefix="₹ " // You can set your desired currency symbol here
										className="input w-3/4 md:w-full mx-auto"
									/>
									{addedFunds !== 0 && (
										<button
											className="button blueGrad mx-auto md:mt-[0.5rem] "
											onClick={handleCheckout}
										>
											Proceed
										</button>
									)}
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Gallery;
