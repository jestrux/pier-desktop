import { Outlet } from "@remix-run/react";
import { useEffect } from "react";
import { useHydrated } from "remix-utils";

function AppTheming() {
	const hydrated = useHydrated();

	useEffect(() => {
		if (!hydrated) return;

		window.addEventListener("load", () => {
			console.log("Window loaded");
		});

		window.tailwind.config = {
			theme: {
				extend: {
					colors: {
						canvas: "rgb(var(--canvas-color) / <alpha-value>)",
						card: "rgb(var(--card-color) / <alpha-value>)",
						popup: "rgb(var(--popup-color) / <alpha-value>)",
						divider: "rgb(var(--divider-color) / <alpha-value>)",
						content: "rgb(var(--content-color) / <alpha-value>)",
						primary: "rgb(var(--primary-color) / <alpha-value>)",
						"primary-light":
							"rgb(var(--primary-light-color) / <alpha-value>)",
					},
				},
			},
		};
	}, [hydrated]);

	if (!hydrated) return <script src="tailwindcss.js"></script>;

	return <link rel="stylesheet" href="app-theme.css" />;
}

export default function StandaloneApp() {
	return (
		<>
			<Outlet />
			<AppTheming />
		</>
	);
}
