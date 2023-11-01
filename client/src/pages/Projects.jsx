import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Projects = ({ id }) => {
	const [projects, setProjects] = useState([]);
	useEffect(() => {
		axios.get("/projects/userProjects").then(({ data }) => setProjects(data));
	}, []);

	const baseUrl = "http://localhost:5000/uploads";

	// Create a date formatter
	const dateFormatter = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="flex flex-col gap-4 justify-center items-center w-full mt-8">
			<span className="text-xl ">Your Projects</span>
			<Link
				to={`/user/profile/${id}/project/new`}
				className="flex justify-center items-center gap-2  button blueGrad mb-6"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-5 h-5 font-bold"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 4.5v15m7.5-7.5h-15"
					/>
				</svg>
				Add new project
			</Link>

			<div className="pb-4 w-full lg:w-[85%] m-auto gap-4 flex flex-col items-center justify-center px-10">
				{projects.length !== 0 ? (
					<>
						{projects.map((project) => (
							<Link
								className="w-full lg:w-[85%] mx-auto flex justify-between md:gap-8 flex-col md:flex-row h-full min-h-fit bg-gray-100 hover:bg-gray-200 mt-8  rounded-xl relative"
								to={`/user/profile/${id}/project/${project._id}`}
								key={project._id}
							>
								<div className="w-full lg:w-[35%] h-[350px] md:h-[200px] lg:h-[250px] my-auto">
									<img
										src={`${baseUrl}/${project?.photos[0]}`}
										alt=""
										className="object-cover w-full h-full rounded-xl grow-0 shrink-1"
									/>
								</div>
								<div className="flex flex-col justify-between items-start w-full lg:w-[60%] grow shink-0 px-8 py-4">
									<div className="flex flex-col justify-center items-start mt-2 ">
										<h2 className="text-xl">{project.title}</h2>
										<p className="text-base mt-2 ">{project.description}</p>
									</div>

									<div className="flex flex-col justify-center items-start gap-2 mt-8 md:mt-2 ">
										<p className="text-sm flex items-center gap-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-6 h-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
												/>
											</svg>{" "}
											<span>Required Funding {project.requiredPrice}</span>
										</p>
										<p className="text-sm flex items-center gap-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-6 h-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
												/>
											</svg>{" "}
											<span>
												Recieved Funding{" "}
												{project?.recievedFunds?.reduce(
													(accumulator, amount) => accumulator + amount,
													0
												)}
											</span>
										</p>
										<span className="text-sm ">
											{dateFormatter.format(new Date(project.createdAt))}
										</span>
									</div>
								</div>
							</Link>
						))}
					</>
				) : (
					<>
						<img
							src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result.gif"
							alt=""
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default Projects;
