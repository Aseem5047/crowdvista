import React, { useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import toast from "react-hot-toast";
import ProfileImageUploader from "./ProfileImageUploader";

const ProfileForm = ({
	id,
	preInput,
	user,
	profileData,
	setProfileData,
	addedPhoto,
	setAddedPhoto,
	addedCoverPhoto,
	setAddedCoverPhoto,
	uploadPhoto,
	deleteSelectedImage,
	errors,
	setErrors,
	baseUrl,
	navigate,
	initialState,
}) => {
	const handleChange = (e) => {
		setProfileData({ ...profileData, [e.target.name]: e.target.value });
		// console.log(e.target.name, e.target.value);
		const { name, value } = e.target;
		let newErrors = { ...errors };

		// Validate username and fullname

		// fullname validation will be considered only when the user is registerin""
		if (name === "username") {
			if (!value) {
				newErrors.username = "Username is required";
			} else if (value.length < 3) {
				newErrors.username = "Username must have at least 3 characters";
			} else {
				delete newErrors.username; // Remove the error if it's valid
			}
		}

		if (name === "fullname") {
			if (!value) {
				newErrors.fullname = "Fullname is required";
			} else if (value.length < 3) {
				newErrors.fullname = "Fullname must have at least 3 characters";
			} else {
				delete newErrors.fullname; // Remove the error if it's valid
			}
		}

		// Validate email
		if (name === "email") {
			if (!value) {
				newErrors.email = "Email is required";
			} else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
				newErrors.email = "Invalid email format";
			} else {
				delete newErrors.email; // Remove the error if it's valid
			}
		}

		// Validate password
		if (name === "password") {
			if (!value) {
				newErrors.password = "Password is required";
			} else if (
				!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g.test(
					value
				)
			) {
				newErrors.password =
					"Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.";
			} else {
				delete newErrors.password; // Remove the error if it's valid
			}
		}

		setErrors(newErrors); // Update the errors state
		// console.log(errors);
	};

	// function that will get triggered once the form is submitted

	const editProfile = async (e) => {
		e.preventDefault();
		await axios
			.put(`/user/editProfile/${id}`, { ...profileData, _id: user._id })
			.then((response) => {
				toast.success("Data Added Successfully");
				navigate(`/`);
			})
			.catch((error) => {
				toast.error(error.response.data);
			});

		// console.log({ ...profileData, id: user._id });
		resetForm();
	};

	// function to reset the form

	const resetForm = () => {
		setProfileData(initialState);
		setAddedPhoto("");
		setAddedCoverPhoto("");
	};

	console.log(profileData);

	return (
		<>
			{user && (
				<form onSubmit={editProfile} className="w-3/4">
					{/* Full Name */}
					{preInput("Full Name", "Provide your Full Name")}
					<input
						onChange={handleChange}
						name="fullname"
						value={profileData.fullname}
						type="text"
						placeholder="xyz abc Full Name"
						className={`input mb-4 ${
							errors.fullname ? "input-error shake-animation" : ""
						}`}
					/>
					{errors.fullname && (
						<p className="error-message mb-4">{errors.fullname}</p>
					)}

					{/* Username */}
					{preInput("Username", "Give your profile a Username")}
					<input
						onChange={handleChange}
						name="username"
						value={profileData.username}
						type="text"
						placeholder="xyz Username"
						className={`input mb-4 ${
							errors.username ? "input-error shake-animation" : ""
						}`}
					/>
					{errors.username && (
						<p className="error-message mb-4">{errors.username}</p>
					)}

					{/* Email */}
					{preInput("Email", "Edit current or Enter a new email address")}
					<input
						onChange={handleChange}
						name="email"
						value={profileData.email}
						type="email"
						placeholder="xyz email"
						className={`input mb-4 ${
							errors.email ? "input-error shake-animation" : ""
						}`}
					/>
					{errors.email && <p className="error-message mb-4">{errors.email}</p>}

					{/* Password */}
					{preInput("Password", "Edit Current or Add a new Password")}

					<input
						onChange={handleChange}
						name="password"
						value={profileData.password}
						type="password"
						placeholder="*** Password"
						className={`input mb-4 ${
							errors.password ? "input-error shake-animation" : ""
						}`}
					/>
					{errors.password && (
						<p className="error-message mb-4 max-w-lg">{errors.password}</p>
					)}

					{/* Image Uploading Section */}

					<ProfileImageUploader
						preInput={preInput}
						deleteSelectedImage={deleteSelectedImage}
						addedPhoto={addedPhoto}
						addedCoverPhoto={addedCoverPhoto}
						uploadPhoto={uploadPhoto}
						baseUrl={baseUrl}
					/>

					{/* About */}
					{preInput("About", "Tell others something about you")}

					<textarea
						onChange={handleChange}
						name="about"
						value={profileData.about}
						className="input mb-4 min-h-[4rem]"
						placeholder="Describe Briefly"
					/>

					{/* Lives In */}
					{preInput(
						"Short Address",
						"Please enter address as short as possible"
					)}

					<input
						onChange={handleChange}
						name="livesIn"
						value={profileData.livesIn}
						className="input mb-4 min-h-[4rem]"
						placeholder="Add Address"
					/>

					{/* Works At */}
					{preInput("Works At", "Please enter info about your Wrok Place")}

					<input
						onChange={handleChange}
						name="worksAt"
						value={profileData.worksAt}
						className="input mb-4 min-h-[4rem]"
						placeholder="Add Work Place"
					/>

					{/* Country */}
					{preInput("Country", "Please enter your Country")}

					<input
						onChange={handleChange}
						name="country"
						value={profileData.country}
						className="input mb-4 min-h-[4rem]"
						placeholder="Add Country"
					/>

					{/* Submit Button */}
					{Object.keys(errors).length === 0 &&
						profileData.email !== "" &&
						profileData.fullname !== "" &&
						profileData.username !== "" && (
							<button className="flex m-auto mt-8 justify-center items-center gap-2 p-4 bg-primary text-white text-lg rounded-xl hover:scale-125 min-w-[10rem]">
								Save Details
							</button>
						)}
				</form>
			)}
		</>
	);
};

export default ProfileForm;
