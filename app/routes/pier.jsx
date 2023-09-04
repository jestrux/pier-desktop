import { Outlet } from "@remix-run/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { chakraTheme } from "~/utils";

const theme = extendTheme(chakraTheme);

export default function Pier() {
	return (
		<ChakraProvider theme={theme}>
			<Outlet />
		</ChakraProvider>
	);
}
