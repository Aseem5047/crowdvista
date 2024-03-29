import React from "react";

const ContentLoading = ({ project }) => {
	return (
		<div
			className="border border-gray-300 shadow rounded-md p-4 max-w-sm lg:max-w-md w-full mx-auto h-[30rem] "
			key={project._id}
		>
			<div className="animate-pulse flex space-x-4">
				<div className="rounded-full bg-gray-300 h-10 w-10"></div>
				<div className="flex-1 space-y-6 py-1">
					<div className="h-2 bg-gray-300 rounded"></div>
					<div className="space-y-3">
						<div className="grid grid-cols-3 gap-4">
							<div className="h-2 bg-gray-300 rounded col-span-2"></div>
							<div className="h-2 bg-gray-300 rounded col-span-1"></div>
						</div>
						<div className="h-2 bg-gray-300 rounded"></div>
					</div>
				</div>
			</div>
			<div className="animate-pulse w-full h-[15rem] bg-gray-300 my-6" />
			<div className="animate-pulse flex space-x-4">
				<div className="flex-1 space-y-6 py-1">
					<div className="h-2 bg-gray-300 rounded"></div>
					<div className="space-y-3">
						<div className="grid grid-cols-3 gap-4">
							<div className="h-2 bg-gray-300 rounded col-span-2"></div>
							<div className="h-2 bg-gray-300 rounded col-span-1"></div>
						</div>
						<div className="h-2 bg-gray-300 rounded"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContentLoading;
