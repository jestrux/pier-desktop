import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import { useHydrated } from "remix-utils";
import SpotlightSearch from "./components/SpotlightSearch";

import styles from "~/styles.css";
import { useEffect } from "react";

export const links = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
	const hydrated = useHydrated();

	useEffect(() => {
		if (!hydrated) return;

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

	return (
		<html lang="en">
			<head>
				<meta charSet="utf8" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />

				{!hydrated ? (
					<script src="tailwindcss.js"></script>
				) : (
					<SpotlightSearch />
				)}
				{process.env.NODE_ENV === "development" && <LiveReload />}
			</body>
		</html>
	);
}
