import React from "react";
import { tagsData } from "../../constants";

const Category = ({ selected, onChange, finalData }) => {
	const handleCheckedItem = (e) => {
		const { checked, name } = e.target;
		if (checked) {
			onChange([...selected, name]);
			finalData.features = [...selected, name];
		} else {
			onChange([...selected.filter((selectedName) => selectedName !== name)]);
			finalData.features = [
				...selected.filter((selectedName) => selectedName !== name),
			];
		}
	};

	// 	Art
	// Tech
	// Music
	// Film
	// Games
	// Charity
	// Health
	// Fashion
	// Food

	return (
		<>
			<div className="grid gap-4 mt-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-10 w-full">
				{tagsData.map((tag) => (
					<label
						key={tag.name}
						className={`tagsLabel ${
							selected.includes(tag.name) && "bg-[#03a9f4f0] text-white"
						}`}
					>
						<input
							type="checkbox"
							checked={selected.includes(tag.name)}
							name={tag.name}
							onChange={handleCheckedItem}
						/>
						{tag.icon}
						<span className="text-base lg:text-lg">{tag.label}</span>{" "}
					</label>
				))}
			</div>
		</>
	);
};

export default Category;
