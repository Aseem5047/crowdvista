import React, { useEffect, useState } from "react";
import { runFireworks } from "../shared/Fireworks";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
	getCurrentFundedProject,
	getCurrentFunding,
	getUser,
} from "../../lib/authSlice";

const Success = () => {
	const navigate = useNavigate();
	const user = useSelector(getUser);
	const currentFunding = useSelector(getCurrentFunding);
	const CurrentFundedProject = useSelector(getCurrentFundedProject);

	var today = new Date();
	var date =
		today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
	var time =
		today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date + " " + time;

	const editFunds = async (e) => {
		if (user) {
			await axios
				.put("/projects/updateFunds", {
					projectId: CurrentFundedProject,
					addedFunds: currentFunding,
					fundedBy: user._id,
				})
				.then((response) => {
					toast.success("Data Edited Successfully");
					// navigate(`/user/profile/${currentUser._id}/purchases`);
				})
				.catch((error) => {
					toast.error("Something went wrong");
				});
		} else {
			toast.error(error.response.data);
		}
	};

	useEffect(() => {
		localStorage.clear();
		runFireworks();
	}, []);

	const handleClick = (e) => {
		e.preventDefault();
		editFunds();
		setTimeout(() => {
			navigate(`/user/profile/${user?._id}/purchases`);
		}, 2000);
	};

	// console.log(currentFunding, CurrentFundedProject);

	return (
		<div className="h-full w-full flex justify-center items-center flex-col text-center">
			<div className="w-[1000px] h-fit m-auto bg-gradient-to-r from-[#03a9f4f0] to-blue-600  text-white rounded-lg px-8 py-20">
				<p className="text-green-500 text-5xl">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-16 h-16 text-white m-auto"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
						/>
					</svg>
				</p>
				<h2 className="capitalize mt-[15px] font-black text-[40px]">
					Thank you for showing your support!
				</h2>
				<p className="text-[16px] font-bold text-center">
					Check your email inbox for the receipt.
				</p>
				<p className="text-[16px] font-bold text-center m-[10px] mt-[30px]">
					If you have any questions, please email
					<a
						className="email ml-[5px] text-[#f02d34]"
						href="mailto:aseemgupta2002@gmail.com"
					>
						order@example.com
					</a>
				</p>
				<button
					type="submit"
					onClick={handleClick}
					width="300px"
					className="w-full max-w-[400px] px-[12px] py-[10px] rounded-lg text-[20px] mt-[40px] uppercase blueGrad text-white cursor-pointer hover:scale(1.1, 1.1) transition transform ease-out hover:opacity-75"
				>
					Review Payment
				</button>
			</div>
		</div>
	);
};

export default Success;
