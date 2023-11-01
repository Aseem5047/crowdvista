import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import toast from "react-hot-toast";

const EditProject = () => {
	const { id, projectId } = useParams();
	const baseUrl = "http://localhost:5000";
	const navigate = useNavigate();
	const initialState = {
		title: "",
		link: "",
		photos: [],
		description: "",
		features: [],
		extraInfo: "",
		createdAt: new Date(),
		requiredPrice: 1000,
	};

	const [data, setData] = useState(initialState);
	const [photoLink, setPhotoLink] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [genre, setGenre] = useState([]);

	useEffect(() => {
		if (!projectId) {
			return;
		}

		axios.get(`/projects/${projectId}`).then((response) => {
			const project = response.data;
			const createdAt = new Date(project.createdAt);

			setData({ ...project, createdAt: createdAt });
			setGenre(project.features);
			setAddedPhotos(project.photos);
		});
	}, [projectId]);

	const handleChange = (e) => {
		if (e.target.name === "createdAt") {
			const date = new Date(e.target.value);
			setData({ ...data, [e.target.name]: date });
		} else {
			setData({ ...data, [e.target.name]: e.target.value });
		}

		// setData({ ...data, [e.target.name]: e.target.value });
	};

	function inputHeader(text) {
		return <h2 className="text-2xl font-medium">{text}</h2>;
	}

	function inputDescription(text) {
		return <span className="text-sm text-gray-400">{text} </span>;
	}

	function preInput(header, description) {
		return (
			<>
				{header && inputHeader(header)}
				{description && inputDescription(description)}
			</>
		);
	}

	// function that will get triggered once the form is submitted

	const addNewProject = async (e) => {
		e.preventDefault();
		if (projectId) {
			await axios
				.put("/projects/edit", { projectId, ...data })
				.then((response) => {
					toast.success("Data Edited Successfully");
					navigate(`/user/profile/${id}/projects`);
				})
				.catch((error) => {
					toast.error(error.response.data);
				});
		} else {
			// new place
			await axios
				.post("/projects/addNew", data)
				.then((response) => {
					toast.success("Data Added Successfully");
					navigate(`/user/profile/${id}/projects`);
				})
				.catch((error) => {
					toast.error(error.response.data);
				});
		}

		resetForm();
	};

	// function to reset the form

	const resetForm = () => {
		setData(initialState);
	};

	console.log(projectId);

	return (
		<>
			<ProjectForm
				id={id}
				baseUrl={baseUrl}
				data={data}
				handleChange={handleChange}
				inputHeader={inputHeader}
				inputDescription={inputDescription}
				preInput={preInput}
				addNewProject={addNewProject}
				photoLink={photoLink}
				setPhotoLink={setPhotoLink}
				addedPhotos={addedPhotos}
				setAddedPhotos={setAddedPhotos}
				genre={genre}
				setGenre={setGenre}
			/>
		</>
	);
};

export default EditProject;
