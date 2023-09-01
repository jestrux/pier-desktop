import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import styles from "./styles.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export const meta = () => [{ title: "New Remix App" }];

export const links = () => [{ rel: "stylesheet", href: styles }];

const theme = extendTheme({
	config: {
		// initialColorMode: "dark",
		useSystemColorMode: true,
	},
	colors: {
		primary: {
			200: "#b070f1",
			500: "rebeccapurple",
		},
		contentAlpha: {
			50: "#D4D4D4",
			200: "#C4C4C4",
			500: "#808080",
			600: "#666666",
		},
	},
});

export default function App() {
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
				<ChakraProvider theme={theme}>
					<Outlet />
				</ChakraProvider>
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === "development" && <LiveReload />}
			</body>
		</html>
	);
}
