import React from "react";

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
			<div className="grid gap-3 mt-4  grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-10">
				<label
					className={`relative flex items-center justify-start lg:justify-center gap-4 border border-gray-300 p-4 rounded-xl cursor-pointer hover:scale-105   ${
						selected.includes("art") && "bg-[#03a9f4f0]"
					} overflow-clip`}
				>
					<input
						type="checkbox"
						checked={selected.includes("art")}
						name="art"
						onChange={handleCheckedItem}
					/>

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
							d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
						/>
					</svg>

					<span>Art & Culture</span>
					<label className="w-full h-full absolute -z-10 hidden " />
				</label>

				<label
					className={`relative  flex items-center justify-start lg:justify-center gap-4 border border-gray-300 p-4 rounded-xl cursor-pointer hover:scale-105  ${
						selected.includes("technology") && "bg-[#03a9f4f0]"
					} overflow-clip`}
				>
					<input
						type="checkbox"
						checked={selected.includes("technology")}
						name="technology"
						onChange={handleCheckedItem}
					/>

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
							d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
						/>
					</svg>

					<span>Technology</span>
					<label className="w-full h-full absolute -z-10 hidden " />
				</label>

				<label
					className={`relative  flex items-center justify-start lg:justify-center gap-4 border border-gray-300 p-4 rounded-xl cursor-pointer hover:scale-105  ${
						selected.includes("charity") && "bg-[#03a9f4f0]"
					} overflow-clip`}
				>
					<input
						type="checkbox"
						checked={selected.includes("charity")}
						name="charity"
						onChange={handleCheckedItem}
					/>

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
							d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
						/>
					</svg>

					<span>Charity</span>
					<label className="w-full h-full absolute -z-10 hidden " />
				</label>

				<label
					className={`relative  flex items-center justify-start lg:justify-center gap-4 border border-gray-300 p-4 rounded-xl cursor-pointer hover:scale-105  ${
						selected.includes("music") && "bg-[#03a9f4f0]"
					} overflow-clip`}
				>
					<input
						type="checkbox"
						checked={selected.includes("music")}
						name="music"
						onChange={handleCheckedItem}
					/>

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
							d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
						/>
					</svg>

					<span>Music</span>
					<label className="w-full h-full absolute -z-10 hidden " />
				</label>

				<label
					className={`relative  flex items-center justify-start lg:justify-center gap-4 border border-gray-300 p-4 rounded-xl cursor-pointer hover:scale-105  ${
						selected.includes("film") && "bg-[#03a9f4f0]"
					} overflow-clip`}
				>
					<input
						type="checkbox"
						checked={selected.includes("film")}
						name="film"
						onChange={handleCheckedItem}
					/>

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
							d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
						/>
					</svg>

					<span>Film</span>
					<label className="w-full h-full absolute -z-10 hidden " />
				</label>

				<label
					className={`relative  flex items-center justify-start lg:justify-center gap-4 border border-gray-300 p-4 rounded-xl cursor-pointer hover:scale-105  ${
						selected.includes("health") && "bg-[#03a9f4f0]"
					} overflow-clip`}
				>
					<input
						type="checkbox"
						checked={selected.includes("health")}
						name="health"
						onChange={handleCheckedItem}
					/>

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
							d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
						/>
					</svg>

					<span>Health</span>
					<label className="w-full h-full absolute -z-10 hidden " />
				</label>

				<label
					className={`relative  flex items-center justify-start lg:justify-center gap-4 border border-gray-300 p-4 rounded-xl cursor-pointer hover:scale-105  ${
						selected.includes("fashion") && "bg-[#03a9f4f0]"
					} overflow-clip`}
				>
					<input
						type="checkbox"
						checked={selected.includes("fashion")}
						name="fashion"
						onChange={handleCheckedItem}
					/>

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
							d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 6h.008v.008H6V6z"
						/>
					</svg>

					<span>Fashion</span>
					<label className="w-full h-full absolute -z-10 hidden " />
				</label>

				<label
					className={`relative  flex items-center justify-start lg:justify-center gap-4 border border-gray-300 p-4 rounded-xl cursor-pointer hover:scale-105  ${
						selected.includes("food") && "bg-[#03a9f4f0]"
					} overflow-clip`}
				>
					<input
						type="checkbox"
						checked={selected.includes("food")}
						name="food"
						onChange={handleCheckedItem}
					/>

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
							d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
						/>
					</svg>

					<span>Food & Drinks</span>
					<label className="w-full h-full absolute -z-10 hidden " />
				</label>
			</div>
		</>
	);
};

export default Category;
