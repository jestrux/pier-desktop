import StandaloneApp from "~/StandaloneApp";
import QRCode from "react-qr-code";
import { useStandaloneAppContext } from "~/StandaloneApp/StandaloneAppContext";

export const links = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700;900&family=Open+Sans:wght@100;400;500;600;700&display=swap",
	},
];

export default function Index() {
	const { app, ipAddress, sections, pageProps } = useStandaloneAppContext();
	// <link rel="preconnect" href="https://fonts.googleapis.com" />
	// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	// <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
	// return <StandaloneApp />;

	if (!app) return null;

	const { _id, icon, color, type, name } = app;

	return (
		<div className="bg-canvas h-screen p-10 flex justify-center items-center relative">
			<div className="bg-card scale-90 w-[380px] aspect-[1/2] relative flex justify-center border-8 border-primary rounded-[30px]">
				<span className="absolute inset-x-0 h-10 px-4 flex items-center bg-content/5 justify-between">
					<span className="w-14 text-lg leading-none font-semibold">
						{new Intl.DateTimeFormat("en-GB", {
							timeStyle: "short",
						}).format(new Date())}
					</span>

					<span
						id="notch"
						className="mr-6 border border-black bg-black w-20 h-6 rounded-full"
					></span>

					<span className="flex items-center gap-4">
						<svg
							className="w-5 h-5"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2.2}
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
							/>
						</svg>
					</span>
				</span>

				<span
					id="rightBtn"
					className="absolute -right-2.5 top-20 border-2 border-primary h-10 rounded-md"
				></span>

				<div className="mt-10 h-full w-full rounded-[21px] overflow-hidden">
					<div className="p-12 flex flex-col gap-12 items-center justify-center text-center">
						<QRCode
							bgColor={"transparent"}
							fgColor="currentColor"
							size={150}
							value={JSON.stringify({
								app: { _id, icon, color, type, name },
								baseUrl: ipAddress,
							})}
							viewBox="0 0 256 256"
						/>

						<span className="text-lg">
							Open Pier mobile app and scan the qr code above.
						</span>
					</div>
				</div>

				<span
					id="leftBtn"
					className="absolute -left-2.5 top-16 border-2 border-primary h-6 rounded-md"
				></span>
				<span
					id="leftBtn"
					className="absolute -left-2.5 top-32 border-2 border-primary h-12 rounded-md"
				></span>
				<span
					id="leftBtn"
					className="absolute -left-2.5 top-48 border-2 border-primary h-12 rounded-md"
				></span>
			</div>
		</div>
	);
}
