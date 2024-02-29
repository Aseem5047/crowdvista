import React, { useEffect, useState } from "react";
import Slider from "../components/shared/Slider";
import { one, two, three, four, five } from "../assets";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUser } from "../lib/authSlice";
import toast from "react-hot-toast";

const Banner = () => {
	// const images = [one, two, three, four, five];
	const images = [
		"https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
		"https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
		three,
		four,
		five,
	];
	const user = useSelector(getUser);
	console.log(user);
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
	}, [user._id]);

	return (
		<div className="flex items-center gap-7 justify-center w-3/4 m-auto h-full">
			{assets.length > 0 ? <Slider images={assets} /> : null}
			<Slider images={images} />
		</div>
	);
};

export default Banner;
