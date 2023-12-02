import React from "react";
import { Link } from "react-router-dom";
import Uploader from "./Uploader";
import Category from "./Category";

const ProjectForm = ({
	id,
	baseUrl,
	data,
	handleChange,
	preInput,
	addNewProject,
	photoLink,
	setPhotoLink,
	addedPhotos,
	setAddedPhotos,
	genre,
	setGenre,
}) => {
	return (
		<div className="flex flex-col gap-8 items-center justify-center mt-8 py-8 px-4">
			<Link
				to={`/user/profile/${id}/projects`}
				className="flex justify-center items-center gap-4 button blueGrad mb-6"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-5 h-5 font-bold"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
					/>
				</svg>
				Return to Profile
			</Link>
			<>
				<form onSubmit={addNewProject}>
					{/* Heading */}
					{preInput("Title", "Add a short Heading for you place")}

					<input
						onChange={handleChange}
						name="title"
						value={data.title}
						className="input my-4 mb-10"
						type="text"
						placeholder="Tech Project"
					/>
					{/* Link */}
					{preInput(
						"Project Preview",
						"Please Provide a valid working link of your project"
					)}

					<input
						onChange={handleChange}
						name="link"
						value={data.link}
						className="input my-4 mb-10"
						type="text"
						placeholder="Link https://xyz.com"
					/>

					{/* Photos */}
					{preInput("Photos", "Add Images using Link ...")}

					<Uploader
						photoLink={photoLink}
						setPhotoLink={setPhotoLink}
						addedPhotos={addedPhotos}
						setAddedPhotos={setAddedPhotos}
						baseUrl={baseUrl}
						finalData={data}
					/>

					{/* Description */}
					{preInput(
						"Project Description",
						"Tell others something about your project"
					)}

					<textarea
						onChange={handleChange}
						name="description"
						value={data.description}
						className="input my-4 mb-10  min-h-[4rem]"
						placeholder="Describe the Project Briefly"
					/>

					{/* Perks or Functions */}
					{preInput("Category", "Select the unique category of the project")}

					<Category selected={genre} onChange={setGenre} finalData={data} />

					{/* Extra Info */}
					{preInput("Extra Info", "Extra Info like rules, services, etc")}

					<textarea
						onChange={handleChange}
						name="extraInfo"
						value={data.extraInfo}
						className="input my-4 mb-10 min-h-[4rem]"
						placeholder="Describe the Place Briefly"
					/>

					{/* Created At */}
					{preInput(
						"Project Created At / Funds Required",
						"Add the time and required amount of funds"
					)}
					<div className="grid md:grid-cols-[2fr_1fr] gap-4">
						<div className="mt-4 flex gap-2 flex-col justify-center items-start ">
							<input
								onChange={handleChange}
								name="createdAt"
								value={
									data?.createdAt
										? data.createdAt.toISOString().substr(0, 10)
										: ""
								}
								className="input"
								type="date"
							/>

							<h2 className="text-sm text-gray-400 pl-2">Add Information</h2>
						</div>
						<div className="mt-4 flex gap-2 flex-col justify-center items-start">
							<input
								onChange={handleChange}
								name="requiredPrice"
								value={data.requiredPrice}
								className="input"
								type="number"
								placeholder="requiredPrice Per Night"
							/>
							<h2 className="text-sm text-gray-400 pl-2">
								Amount of Fund Required
							</h2>
						</div>
					</div>
					{/* Submit Button */}
					<button
						className={`${
							data?.title === "" ||
							data?.category?.length === 0 ||
							data?.description === ""
								? "hidden"
								: ""
						} flex m-auto mt-8 justify-center items-center gap-2 p-4 bg-primary text-white text-lg rounded-xl hover:scale-125 min-w-[10rem]`}
					>
						Save Details
					</button>
				</form>
			</>
		</div>
	);
};

export default ProjectForm;
