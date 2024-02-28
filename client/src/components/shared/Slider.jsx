import React, { useEffect, useMemo, useState } from "react";
import { leftArrow, rightArrow } from "../../constants";
import { Link } from "react-router-dom";

const Slider = ({ images = [], link = "" }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const lastIndex = images.length - 1;
	useMemo(() => {
		currentIndex < 0
			? setCurrentIndex(lastIndex)
			: currentIndex > lastIndex && setCurrentIndex(0);
	}, [currentIndex]);

	// useEffect(() => {
	// 	let slider = setInterval(() => {
	// 		setCurrentIndex((prev) => prev + 1);
	// 	}, 7500);

	// 	return () => clearInterval(slider);
	// }, [currentIndex]);

	const imageList = [currentIndex - 1, currentIndex, currentIndex + 1];

	const getSlideState = (imageIndex) => {
		if (imageIndex === currentIndex) return "visible";
		else if (
			imageIndex === currentIndex - 1 ||
			(currentIndex === 0 && imageIndex === lastIndex)
		)
			return "previous";
		else if (
			imageIndex === currentIndex + 1 ||
			(currentIndex === lastIndex && imageIndex === 0)
		)
			return "next";
		else return "hidden";
	};

	const handleSlideChange = (action) => {
		action === "next"
			? setCurrentIndex((prev) => prev + 1)
			: setCurrentIndex((prev) => prev - 1);
	};

	return (
		<div className="w-full h-full relative flex items-center justify-center gap-4 overflow-hidden rounded-xl">
			{/* left arrow */}
			<button
				className="absolute left-10 navigationArrows"
				onClick={() => handleSlideChange("previous")}
			>
				{leftArrow}
			</button>

			{/* main slider */}
			<Link
				to={link}
				className={`flex justify-center items-center w-full aspect-square sm:aspect-video 2xl:aspect-square rounded-xl grow-0 shrink-0 `}
			>
				{imageList.map((imageIndex) => {
					let adjustedIndex = (imageIndex + images.length) % images.length;

					let slideState = getSlideState(adjustedIndex);

					return (
						<article key={adjustedIndex} className={` ${slideState}`}>
							<img
								src={images[adjustedIndex]}
								alt=""
								className="object-cover w-full aspect-square sm:aspect-video 2xl:aspect-square rounded-xl m-auto"
								loading="lazy"
							/>
						</article>
					);
				})}
			</Link>
			{/* right arrow */}
			<button
				className="absolute right-10 navigationArrows"
				onClick={() => handleSlideChange("next")}
			>
				{rightArrow}
			</button>
		</div>
	);
};

export default Slider;
