import React from "react";

const ProfileImageUploader = ({
	preInput,
	deleteSelectedImage,
	addedPhoto,
	addedCoverPhoto,
	uploadPhoto,
	baseUrl,
}) => {
	console.log(typeof addedCoverPhoto);
	return (
		<>
			{/* Profile Picture */}
			{preInput("Profile Picture", "Add Image to edit Profile Picture")}

			{/* Photo Gallery */}
			<div className="mb-4 mt-4 gap-2 flex justify-start items-center">
				{/* if there are previously added images then show them first */}
				{addedPhoto.length > 0 ? (
					<div className="h-[275px] max-w-[350px] flex gap-4 ">
						<img
							className="rounded-xl max-w-[300px] object-cover"
							src={
								Array.isArray(addedPhoto) && addedPhoto.length > 0
									? addedPhoto[0].includes("https://storage.googleapis.com")
										? addedPhoto[0]
										: `${baseUrl}/uploads/${addedPhoto[0]}`
									: addedPhoto.includes("https://storage.googleapis.com")
									? addedPhoto
									: `${baseUrl}/uploads/${addedPhoto}`
							}
							alt=""
						/>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6 hover:text-primary cursor-pointer z-20"
							onClick={() => deleteSelectedImage("profile")}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
							/>
						</svg>
					</div>
				) : (
					<label className="border border-gray-300 flex justify-center items-center gap-2 p-10 font-medium rounded-xl h-44 w-full md:w-1/3 hover:bg-gray-100 cursor-pointer">
						<input
							type="file"
							className="hidden"
							name="profilePicture"
							onChange={uploadPhoto}
						/>
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
								d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
							/>
						</svg>
						Upload
					</label>
				)}
			</div>

			{/* Cover Image */}
			{preInput("Cover Image", "Add Image to edit Cover Image")}

			{/* Photo Gallery */}
			<div className="mb-4 mt-4 gap-2 flex justify-start items-center">
				{/* if there are previously added images then show them first */}
				{addedCoverPhoto.length > 0 ? (
					<div className="h-[275px] w-full flex gap-4">
						<img
							className="rounded-xl w-full object-cover "
							src={
								Array.isArray(addedCoverPhoto) && addedCoverPhoto.length > 0
									? addedCoverPhoto[0].includes(
											"https://storage.googleapis.com"
									  )
										? addedCoverPhoto[0]
										: `${baseUrl}/uploads/${addedCoverPhoto[0]}`
									: addedCoverPhoto.includes("https://storage.googleapis.com")
									? addedCoverPhoto
									: `${baseUrl}/uploads/${addedCoverPhoto}`
							}
							alt=""
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6 hover:text-primary cursor-pointer"
							onClick={() => deleteSelectedImage("cover")}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
							/>
						</svg>
					</div>
				) : (
					<label className="border border-gray-300 flex justify-center items-center gap-2 p-10 font-medium rounded-xl h-60 w-full md:w-3/4 hover:bg-gray-100 cursor-pointer">
						<input
							type="file"
							className="hidden"
							name="coverPicture"
							onChange={uploadPhoto}
						/>
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
								d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
							/>
						</svg>
						Upload
					</label>
				)}
			</div>
		</>
	);
};

export default ProfileImageUploader;
