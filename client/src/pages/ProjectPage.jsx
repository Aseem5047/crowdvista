import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios
import Loader from "../components/Loader";
import Gallery from "../components/Gallery";
import { useSelector } from "react-redux";
import { getUser } from "../lib/authSlice";

const ProjectPage = () => {
	const [project, setProject] = useState({});
	const [owner, setOwner] = useState({});
	const { id } = useParams();
	const [showAllPhotos, setShowAllPhotos] = useState(false);
	const baseUrl = "http://localhost:5000/uploads";

	const user = useSelector(getUser);

	useEffect(() => {
		if (!id) {
			return;
		}
		axios
			.get(`/projects/${id}`)
			.then((response) => {
				setProject(response.data);
			})
			.catch(() => {
				toast.error("Error Retrieving Projects");
				setProject([]); // Clear the state in case of an error
			});
	}, [id]); // Include id in the dependency array

	const getUserField = async (userId) => {
		try {
			const response = await axios.get(`/user/profile/${userId}`);
			return response.data;
		} catch (error) {
			// Handle any errors here if needed
			toast.error("Something went wrong Unable to load resources");
			return null; // Return null or a default value in case of an error
		}
	};

	useEffect(() => {
		// Check if project.owner exists before calling fetchOwner
		if (project.owner) {
			const fetchOwner = async () => {
				const ownerData = await getUserField(project.owner);
				setOwner(ownerData); // Set the owner state with the fetched data
			};

			fetchOwner(); // Call the async function
		}

		// Note: You should include 'project' in the dependency array if it can change.
	}, [project]);

	// console.log(owner);

	if (!project) {
		// Render a loading state or return null
		return <Loader />;
	}

	return (
		<div className="">
			{project.length === 0 ? (
				<div className="flex justify-center items-center h-full w-full">
					<img
						src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result.gif"
						alt=""
					/>
				</div>
			) : (
				<div>
					<div className=" p-4 md:py-8 w-full mt-[2.5rem] lg:mt-0 flex items-center justify-center">
						<Gallery
							project={project}
							showAllPhotos={showAllPhotos}
							setShowAllPhotos={setShowAllPhotos}
							baseUrl={baseUrl}
							owner={owner}
							currentUser={user}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProjectPage;
