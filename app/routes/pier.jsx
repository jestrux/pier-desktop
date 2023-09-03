import { Outlet } from "@remix-run/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import styles from "~/styles.css";

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

export default function Pier() {
	return (
		<ChakraProvider theme={theme}>
			<Outlet />
		</ChakraProvider>
	);
}
