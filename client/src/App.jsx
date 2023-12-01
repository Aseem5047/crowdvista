import { useEffect, useState } from "react";
import axios from "axios";

import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import {
	Authenticate,
	HomePage,
	Profile,
	EditProfile,
	EditProject,
	ProjectPage,
} from "./pages";

import { fetchUser } from "./store/authMiddleware";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import Success from "./components/Success";

function App() {
	axios.defaults.baseURL = "https://crowdvistaback.vercel.app/";
	// axios.defaults.baseURL = "http://127.0.0.1:5000";
	axios.defaults.withCredentials = true;
	const dispatch = useDispatch();
	const { user, ready } = useSelector((state) => state.auth);

	const location = useLocation();
	const { pathname } = location; // const user = localStorage.getItem("userData");

	const [hasScrolled, setHasScrolled] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	useEffect(() => {
		const fetchUserData = async () => {
			// The user data is not ready yet, so let's fetch it
			await dispatch(fetchUser());
		};

		if (pathname === "/") {
			fetchUserData();
		}
	}, [dispatch, pathname]);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setHasScrolled(true);
			} else {
				setHasScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// console.log(user);

	return (
		<>
			{loading ? (
				<div className="h-screen flex items-center justify-center">
					<img
						src="https://cdn.dribbble.com/users/1813781/screenshots/5597337/dribbble-girl-with-clock.gif"
						alt=""
						className="m-auto rounded-xl w-80 h-60"
					/>
				</div>
			) : (
				<div className="flex flex-col items-center w-full h-screen lg:px-[80px] ">
					<Navbar />
					<div className="py-4 mt-16 w-full h-full">
						<Routes>
							{/* Homepage */}
							<Route index element={<HomePage />} />

							{/* Authentication */}
							<Route path="/authenticate" element={<Authenticate />} />

							<Route path="/success" element={<Success />} />

							<Route
								path="/user/profile/:id?"
								element={user ? <Profile /> : <Navigate to="/authenticate" />}
							/>
							<Route
								path="/user/profile/:id?/:subpage?"
								element={user ? <Profile /> : <Navigate to="/authenticate" />}
							/>
							<Route path="/user/profile/:id?/edit" element={<EditProfile />} />

							<Route
								path="/user/profile/:id?/project/new"
								element={<EditProject />}
							/>
							<Route
								path="/user/profile/:id?/project/:projectId"
								element={<EditProject />}
							/>

							<Route
								path="/projects/:id"
								element={
									user ? <ProjectPage /> : <Navigate to="/authenticate" />
								}
							/>

							{/* Catch-all route for other pages */}
							<Route
								path="*"
								element={
									<div className="flex items-center justify-center h-full">
										<img
											src="https://miro.medium.com/v2/resize:fit:1358/1*zBFBJktPD3_z0S_35kO5Hg.gif"
											alt=""
											className="h-96 w-h-96"
										/>
									</div>
								}
							/>
						</Routes>
					</div>

					{!hasScrolled && pathname === "/" && <Footer />}
				</div>
			)}
		</>
	);
}

export default App;
