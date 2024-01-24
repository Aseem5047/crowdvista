import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, getUser } from "../../lib/authSlice";
import Search from "../shared/Search";
import Menu from "../shared/Menu";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Navbar = () => {
	const navigate = useNavigate();
	const query = useQuery();

	// eslint-disable-next-line
	const searchQuery = query.get("searchQuery");

	const [toggleMenu, setToggleMenu] = useState(false);
	const [toggleSearch, setToggleSearch] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]);
	const [searchedUsers, setSearchedUsers] = useState([]);
	const [tags, setTags] = useState([]);
	const location = useLocation();
	const { pathname } = location;

	const dispatch = useDispatch();

	const user = useSelector(getUser);

	const baseUrl = "http://localhost:5000";

	// List of image filenames
	var imageList = ["1.png", "2.png", "3.png", "4.png", "5.png"];

	// Check if a random image is already stored
	var storedImage = localStorage.getItem("randomImage");

	// If no image is stored, generate a random index and select an image
	if (!storedImage) {
		var randomIndex = Math.floor(Math.random() * imageList.length);
		var randomImage = imageList[randomIndex];
		localStorage.setItem("randomImage", randomImage);
	} else {
		// Use the stored image if available
		randomImage = storedImage;
	}

	const handleLogout = async (event) => {
		event.preventDefault();

		try {
			setToggleMenu(false);
			// Remove token from localStorage and cookies
			localStorage.clear();
			Cookies.remove("token");
			// Dispatch action to clear user
			await dispatch(clearUser(null));
			toast.success("User Logged Out");
			navigate("/authenticate");
		} catch (error) {
			console.error("Logout error:", error);
			// Handle error appropriately, e.g., show an error toast
		}
	};

	const fetchPosts = async () => {
		let postFound = false;
		let userFound = false;

		try {
			const tagsParam = tags.length > 0 ? tags.join(",") : "none";
			const response = await axios.get(
				`/projects/search?searchQuery=${encodeURIComponent(
					searchText || "none"
				)}&tags=${encodeURIComponent(tagsParam)}`
			);

			const posts = response.data?.posts || [];
			const users = response.data?.user || [];

			if (posts.length > 0) {
				setPosts(posts);
				postFound = true;
			}

			if (users.length > 0) {
				setSearchedUsers(users);
				userFound = true;
			}

			if (!userFound || !postFound) {
				if (!userFound) {
					setSearchedUsers([]);
					toast.error("No Profile matches required criteria");
				}

				if (!postFound) {
					setPosts([]);
					toast.error("No Project matches required criteria");
				}
			}
		} catch (error) {
			toast.error("Error Retrieving Post");
		}
	};

	const searchPost = () => {
		if (searchText.trim() || tags) {
			fetchPosts();
		}
	};

	const toggleSearchMenu = () => {
		setToggleSearch(!toggleSearch);
		setPosts([]);
		setSearchedUsers([]);
		setTags([]);
	};

	const handleSearch = (event) => {
		event.preventDefault();
		setSearchText(event.target.value);
	};

	const clearSearchText = (event) => {
		setSearchText("");
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			searchPost();
		}
	};

	const category = [
		"art",
		"technology",
		"charity",
		"music",
		"film",
		"health",
		"fashion",
		"food",
	];

	const handleTag = (tag) => {
		if (tags.includes(tag)) {
			// If the tag is already in the tags array, remove it
			setTags(tags.filter((t) => t !== tag));
		} else {
			// If the tag is not in the tags array, add it
			setTags([...tags, tag]);
		}
	};

	console.log(posts, searchedUsers);

	return (
		<>
			<div className="bg-white z-40 flex justify-between w-full items-center shadow shadow-gray-200 fixed top-0 px-4 py-4 lg:px-[80px]">
				{/* Logo */}
				<Link to="/" className="cursor-pointer">
					<img
						src="/assets/logo.png"
						alt=""
						className="text-primary cursor-pointer hover:scale-125 h-auto w-40 lg:w-60"
					/>{" "}
				</Link>

				{/* Search or other content */}
				<Search
					toggleSearch={toggleSearch}
					user={user}
					handleSearch={handleSearch}
					handleKeyDown={handleKeyDown}
					searchText={searchText}
					tags={tags}
					clearSearchText={clearSearchText}
					searchPost={searchPost}
					handleTag={handleTag}
					searchedUsers={searchedUsers}
					posts={posts}
					pathname={pathname}
					toggleSearchMenu={toggleSearchMenu}
					category={category}
					baseUrl={baseUrl}
				/>

				{/* Menu and Profile button */}
				<Menu
					toggleMenu={toggleMenu}
					user={user}
					setToggleMenu={setToggleMenu}
					handleLogout={handleLogout}
					baseUrl={baseUrl}
					randomImage={randomImage}
				/>
			</div>
		</>
	);
};

export default Navbar;
