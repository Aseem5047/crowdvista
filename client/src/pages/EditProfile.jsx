import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfileForm from "../components/profile/ProfileForm";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../lib/authSlice";

const EditProfile = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const user = useSelector(getUser);
	const navigate = useNavigate();
	const baseUrl = "http://localhost:5000";

	const initialState = {
		fullname: user.fullname,
		username: user.username,
		email: user.email,
		password: "",
		profilePicture: user.profilePicture ? user.profilePicture : "",
		coverPicture: user.coverPicture ? user.coverPicture : "",
		about: user.about,
		livesIn: user.livesIn,
		worksAt: user.worksAt,
		country: user.country,
	};
	const [profileData, setProfileData] = useState(initialState);
	const [addedPhoto, setAddedPhoto] = useState(
		user.profilePicture ? user.profilePicture : ""
	);
	const [addedCoverPhoto, setAddedCoverPhoto] = useState(
		user.coverPicture ? user.coverPicture : ""
	);
	const [errors, setErrors] = useState({});

	const InputHeader = (text) => {
		return <h2 className="text-2xl font-medium">{text}</h2>;
	};

	const InputDescription = (text) => {
		return <span className="text-sm text-gray-400">{text} </span>;
	};

	const preInput = (heading, description) => {
		return (
			<div className="mb-2">
				{heading && InputHeader(heading)}
				{description && InputDescription(description)}
			</div>
		);
	};

	function uploadPhoto(e) {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const data = new FormData();
			data.append("profileUploads", file);
			axios
				.post("/upload/profileImage", data, {
					headers: { "Content-Type": "multipart/form-data" },
				})
				.then((response) => {
					if (e.target.name === "profilePicture") {
						setAddedPhoto(response.data);
						if (Array.isArray(response.data) && response.data.length > 0) {
							// If response.data is an array and has elements, select the first element
							profileData.profilePicture = response.data[0];
						} else {
							// If response.data is not an array or is an empty array, select response.data itself
							profileData.profilePicture = response.data;
						}
						// profileData.profilePicture = response.data;
					} else if (e.target.name === "coverPicture") {
						setAddedCoverPhoto(response.data);
						if (Array.isArray(response.data) && response.data.length > 0) {
							// If response.data is an array and has elements, select the first element
							profileData.coverPicture = response.data[0];
						} else {
							// If response.data is not an array or is an empty array, select response.data itself
							profileData.coverPicture = response.data;
						}
						// profileData.coverPicture = response.data;
					}
				})
				.catch((error) => toast.error("Unable to Upload"));
		}
	}

	function deleteSelectedImage(imageType) {
		if (imageType === "cover") {
			profileData.profileCoverPicture = "";
			setAddedCoverPhoto("");
		} else if (imageType === "profile") {
			profileData.profilePicture = "";
			setAddedPhoto("");
		}
	}

	return (
		<div className="flex flex-col justify-center items-center gap-4 py-12">
			<Link to={`/user/profile/${id}`} className="button blueGrad mb-6">
				Go Back
			</Link>
			<ProfileForm
				id={id}
				user={user}
				profileData={profileData}
				setProfileData={setProfileData}
				errors={errors}
				setErrors={setErrors}
				preInput={preInput}
				addedPhoto={addedPhoto}
				setAddedPhoto={setAddedPhoto}
				addedCoverPhoto={addedCoverPhoto}
				setAddedCoverPhoto={setAddedCoverPhoto}
				uploadPhoto={uploadPhoto}
				deleteSelectedImage={deleteSelectedImage}
				baseUrl={baseUrl}
				navigate={navigate}
				initialState={initialState}
			/>
		</div>
	);
};

export default EditProfile;
