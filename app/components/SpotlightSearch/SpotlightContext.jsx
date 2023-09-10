/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { randomId } from "~/utils";

export const SpotlightContext = createContext({
	pierAppData: {},
	spotlightCommands: {},
	registerSpotlightCommand: (name, handler) => {},
	spotlightInnerPages: [],
	spotlightSearchVisible: false,
	showSpotlightSearch: () => {},
	hideSpotlightSearch: () => {},
	pushSpotlightPage: (page) => {},
	popCurrentSpotlightPage: (data) => {},
	replaceCurrentSpotlightPage: (page) => {},
	popSpotlightToRoot: () => {},
});

export function SpotlightProvider({ children }) {
	const [spotlightRef, setSpotlightRef] = useState(randomId());
	const [pierAppData, setPierAppData] = useState({});
	const [spotlightSearchVisible, setSpotlightSearchVisible] = useState(false);
	const [spotlightInnerPages, setSpotlightInnerPages] = useState([]);
	const spotlightCommands = useRef({});
	const registerSpotlightCommand = (name, handler) => {
		spotlightCommands.current[name] = handler;
	};

	const showSpotlightSearch = () => setSpotlightSearchVisible(true);

	const hideSpotlightSearch = () => {
		setSpotlightSearchVisible(false);
	};

	const getNewPage = (page) => {
		let pageResolver;
		const promise = new Promise((resolve) => {
			pageResolver = resolve;
		});

		return [
			{
				...page,
				resolver: pageResolver,
				type: page.type || "search",
				id: randomId(),
			},
			promise,
		];
	};

	const pushSpotlightPage = (page) => {
		const [newPage, resolver] = getNewPage(page);

		setSpotlightInnerPages([...spotlightInnerPages, newPage]);

		return resolver;
	};

	const popCurrentSpotlightPage = (data) => {
		const poppedPage = spotlightInnerPages.at(-1);

		if (typeof poppedPage.resolver == "function") poppedPage.resolver(data);

		setSpotlightInnerPages(
			spotlightInnerPages.filter((p) => p.id != poppedPage.id)
		);
	};

	const replaceCurrentSpotlightPage = (page) => {
		const currentPage = spotlightInnerPages.at(-1);
		const [newPage, resolver] = getNewPage(page);

		setSpotlightInnerPages(
			spotlightInnerPages.map((page) =>
				page.id == currentPage.id ? newPage : page
			)
		);

		return resolver;
	};

	const handlePierAppDataChanged = (e) => {
		// setSpotlightRef(randomId());
		setPierAppData(e.detail);
	};

	useEffect(() => {
		document.addEventListener(
			"pier:app-data-changed",
			handlePierAppDataChanged,
			false
		);

		return () =>
			document.removeEventListener(
				"pier:app-data-changed",
				handlePierAppDataChanged,
				false
			);
	}, []);

	const value = {
		pierAppData,
		spotlightCommands: spotlightCommands.current,
		registerSpotlightCommand,
		spotlightInnerPages,
		spotlightSearchVisible,
		showSpotlightSearch,
		hideSpotlightSearch,
		pushSpotlightPage,
		popCurrentSpotlightPage,
		replaceCurrentSpotlightPage,
		popSpotlightToRoot: () => setSpotlightInnerPages([]),
	};

	return (
		<SpotlightContext.Provider value={value}>
			<div key={spotlightRef}>{children}</div>
		</SpotlightContext.Provider>
	);
}

export function useSpotlightContext() {
	return useContext(SpotlightContext);
}
