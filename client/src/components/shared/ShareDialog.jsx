import React, { useState } from "react";
import ShareButton from "./ShareButton";
import { Link } from "react-router-dom";

const ShareDialog = ({ title, text, url, imageUrls, description }) => {
	const [toggleDialog, setToggleDialog] = useState(false);
	return (
		<div className="flex items-center cursor-pointer">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-6 h-6 hover:text-primary"
				onClick={() => setToggleDialog(!toggleDialog)}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
				/>
			</svg>
			{toggleDialog && (
				<div className="w-screen h-screen fixed bottom-0 left-0 pt-2 text-white bg-black/60 z-40">
					<div className="relative flex flex-col gap-7 w-full h-full py-7 px-10">
						{/* close button */}
						<button
							className="absolute right-5 top-1 bg-black/75 hover:bg-primary text-white rounded-full p-2"
							onClick={() => setToggleDialog(!toggleDialog)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-7 h-7"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18 18 6M6 6l12 12"
								/>
							</svg>
						</button>

						{/* post preview content */}
						<div className="flex flex-col w-full items-center justify-start overflow-y-scroll no-scrollbar">
							<div className="grid gap-4 grid-cols-1 lg:grid-cols-[2fr_1fr] lg:px-10 h-screen">
								<img
									src={
										imageUrls[0] ||
										"https://source.unsplash.com/1600x900/?nature,technology,cartoon"
									}
									alt="Preview Image"
									className="aspect-video h-full object-cover rounded-xl min-h-[300px]"
								/>
								<div className="grid grid-cols-1 grid-rows-2 gap-4">
									<img
										src={
											imageUrls[1] ||
											"https://source.unsplash.com/1600x900/?nature,technology,cartoon"
										}
										alt="Preview Image"
										className="aspect-video h-full object-cover rounded-xl"
									/>
									{/* other info */}
									<div className="flex flex-col justify-between gap-4 bg-black/60 w-full px-7 py-4 rounded-xl">
										<div className="flex flex-col w-full">
											{/* title */}
											<span className="text-3xl">{title}</span>
											{/* text */}
											<span className="text-xl">{text}</span>
										</div>

										<div className="flex flex-col items-start justify-end gap-5 flex-1">
											<div className="flex flex-col w-full gap-2">
												{/* description */}
												<span className="text-lg max-h-[5rem] 3xl:max-h-[10rem] overflow-y-scroll no-scrollbar">
													{description}
												</span>

												{/* url */}
												<Link
													to={url}
													className="text-primary hover:opacity-80 w-fit text-sm"
												>
													Project Link
												</Link>
											</div>

											{/* share button */}
											<ShareButton
												title={title}
												text={text}
												url={url}
												description={description}
												toggleDialog={toggleDialog}
												setToggleDialog={setToggleDialog}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShareDialog;
