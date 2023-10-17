/* eslint-disable no-unused-vars */
import { useFetcher } from "@remix-run/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import useWebsiteSections from "~/providers/website-sections/useWebsiteSections";
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
	addSection: (type) => {},
	editSection: (section) => {},
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
	const fetcher = useFetcher();
	const { getSection: getWebsiteSection } = useWebsiteSections();

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

	const editSection = (section) => {
		pushSpotlightPage({
			title: "Edit " + section.name,
			secondaryAction: {
				label: "Remove " + section.name,
				destructive: true,
				confirmText: "Remove",
				onClick: () => {
					return fetcher.submit(
						{
							sectionId: section.id,
						},
						{ method: "delete", action: "/app" }
					);
				},
			},
			type: "settings",
			fields: getWebsiteSection(section.type)?.fields,
			values: section.settings,
			onChange: async (value) => {
				fetcher.submit(
					{
						sectionId: section.id,
						settings: JSON.stringify(value),
					},
					{ method: "patch", action: "/app" }
				);
			},
		});
	};

	const addSection = async (type, parent = "page") => {
		const section = getWebsiteSection(type);

		if (!section) return console.log("Section not found: ", type);

		let defaultValues = section.defaultValues;

		if (!defaultValues) {
			const defaultFields = Object.entries(section.fields).filter(
				([, field]) => field.defaultValue != undefined
			);

			defaultValues = defaultFields.reduce((agg, [fieldName, field]) => {
				return {
					...agg,
					...(["object", "form", "settings"].includes(field.type)
						? field.defaultValue
						: { [fieldName]: field.defaultValue }),
				};
			}, {});
		}

		const payload = {
			name: section.name,
			type: section.type,
			settings: JSON.stringify(defaultValues),
			...(parent == "page"
				? { pageId: pierAppData.currentPage.id }
				: { appId: pierAppData.app.id }),
		};

		const listenForNewEntry = (e) => {
			editSection(e.detail.sections.at(-1));

			document.removeEventListener(
				"pier:app-data-changed",
				listenForNewEntry,
				false
			);
		};

		document.addEventListener(
			"pier:app-data-changed",
			listenForNewEntry,
			false
		);

		fetcher.submit(payload, {
			method: "post",
			action: "/app",
		});
	};

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
		addSection,
		editSection,
	};

	return (
		<SpotlightContext.Provider value={value}>
			<div key={spotlightRef}>{children}</div>
		</SpotlightContext.Provider>
	);
}

export function useSpotlightContext() {
	const context = useContext(SpotlightContext);
	const changeHandler = useRef();
	const selectHandler = useRef();
	const onChange = (callback) => (changeHandler.current = callback);
	const onSelect = (callback) => (selectHandler.current = callback);

	const handleSelect = ({ detail }) => {
		const { page, value } = detail || {};
		if (page?.id != context.page?.id) return;

		if (typeof selectHandler.current == "function")
			selectHandler.current(value);
	};

	useEffect(() => {
		if (typeof changeHandler.current == "function")
			changeHandler.current(context.navigationValue);
	}, [context.navigationValue]);

	useEffect(() => {
		document.addEventListener(
			"spotlight-search-value-changed",
			handleSelect,
			false
		);

		return () => {
			document.removeEventListener(
				"spotlight-search-value-changed",
				handleSelect,
				false
			);
		};
	}, []);

	return {
		...context,
		onChange,
		onSelect,
	};
}
