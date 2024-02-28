import React from "react";
import Slider from "../components/shared/Slider";
import { one, two, three, four, five } from "../../public/users";
const Banner = ({ photos }) => {
	const images = [one, two, three, four, five];
	return (
		<div className="flex items-center justify-center w-3/4 m-auto h-full">
			<Slider images={photos || images} />
		</div>
	);
};

export default Banner;
