import React from "react";
import ContentLoading from "../shared/ContentLoading";

const PostLoading = ({ projects }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 items-center justify-center gap-10  pt-10 pb-7 w-full md:w-11/12 2xl:w-full m-auto">
			{projects.map((project) => (
				<ContentLoading project={project} key={project._id} />
			))}
		</div>
	);
};

export default PostLoading;
