import { createContext, useContext } from "react";

const StandaloneAppContext = createContext({
	app: {},
	pages: [],
	currentPage: {},
	pageProps: {
		appBar: {},
		banner: {},
		bannerColor: null,
		primaryBgTextColor: null,
		scrollBehavior: null,
	},
	sections: [],
});

export function useStandaloneAppContext() {
	return useContext(StandaloneAppContext);
}

export default StandaloneAppContext;
