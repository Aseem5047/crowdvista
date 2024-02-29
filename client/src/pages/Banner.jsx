import React, { useEffect, useState } from "react";
import Slider from "../components/shared/Slider";
import { one, two, three, four, five } from "../assets";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUser } from "../lib/authSlice";
import toast from "react-hot-toast";

const Banner = () => {
	const images = [one, two, three, four, five];
	const user = useSelector(getUser);

	const [projects, setProjects] = useState([]);
	const [assets, setAssets] = useState([]);

	useEffect(() => {
		axios
			.get(`/projects/${user?._id}/timeline`)
			.then(({ data }) => {
				setProjects(data);
				if (data.length > 1) {
					setAssets(data[1].photos);
				}
			})
			.catch((error) =>
				user
					? toast.error("Post Something or Follow others")
					: console.log(error)
			);
	}, [user]);

	return (
		<div className="flex items-center gap-7 justify-center w-3/4 m-auto h-full">
			{assets.length > 0 ? <Slider images={assets} /> : null}
			<Slider images={images} />
		</div>
	);
};

export default Banner;
