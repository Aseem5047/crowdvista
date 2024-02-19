import React from "react";
import {
	FacebookShareButton,
	WhatsappShareButton,
	TwitterShareButton,
	TelegramShareButton,
	FacebookIcon,
	WhatsappIcon,
	TwitterIcon,
	TelegramIcon,
} from "react-share";

const ShareButton = ({
	title,
	text,
	url,
	description,
	toggleDialog,
	setToggleDialog,
}) => {
	const handleShare = async (title, text, url) => {
		try {
			navigator.canShare &&
				(await navigator.share({
					title,
					text,
					url,
				}));
			console.log("Successfully shared");
			setToggleDialog(!toggleDialog);
		} catch (error) {
			console.error("Error sharing:", error);
			setToggleDialog(!toggleDialog);
		}
	};

	const handleClick = () => {
		setTimeout(() => {
			setToggleDialog(!toggleDialog);
		}, 2500);
	};

	return (
		<div className="w-full flex items-center gap-4 ">
			<button
				data={{
					text: { text },
					url: { url },
					title: { title },
				}}
				onClick={() => handleShare(title, text, url)}
				className="bg-primary transition-all duration-500 rounded-xl hover:scale-110 flex items-center justify-center gap-2 p-2 w-32"
			>
				<span>Share</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6 cursor-pointer"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
					/>
				</svg>
			</button>
			<div className="flex items-center justify-start overflow-x-scroll no-scrollbar gap-2">
				<FacebookShareButton
					url={url}
					title={title}
					description={description}
					onClick={handleClick}
				>
					<FacebookIcon size={40} round={true} />
				</FacebookShareButton>

				<WhatsappShareButton
					url={url}
					title={title}
					description={description}
					onClick={handleClick}
				>
					<WhatsappIcon size={40} round={true} />
				</WhatsappShareButton>

				<TwitterShareButton
					url={url}
					title={title}
					description={description}
					onClick={handleClick}
				>
					<TwitterIcon size={40} round={true} />
				</TwitterShareButton>

				<TelegramShareButton
					url={url}
					title={title}
					description={description}
					onClick={handleClick}
				>
					<TelegramIcon size={40} round={true} />
				</TelegramShareButton>
			</div>
		</div>
	);
};

export default ShareButton;
