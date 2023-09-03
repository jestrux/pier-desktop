import { Outlet } from "@remix-run/react";
import { useHydrated } from "remix-utils";

import { useLoaderData } from "@remix-run/react";
import { queryModel } from "~/orm";
import tinycolor from "tinycolor2";
import StandaloneAppContext from "~/StandaloneApp/StandaloneAppContext";

import theme from "~/StandaloneApp/theme-old.css";

export const loader = async () => {
	const {
		data: [app],
	} = await queryModel("pier_apps", { includeModelDetails: false });
	app.settings = JSON.parse(app.settings);
	let { data: pages } = await queryModel("pier_pages", {
		includeModelDetails: false,
	});
	pages = pages.map((page) => {
		page.settings = JSON.parse(page.settings);
		return page;
	});
	let { data: sections } = await queryModel("pier_sections", {
		includeModelDetails: false,
	});
	sections = sections.map((section) => {
		section.settings = JSON.parse(section.settings);
		return section;
	});

	const isLight = tinycolor(app.color).isLight();
	const primaryBgTextColor = isLight ? "black" : "white";
	const appBar = sections.find(({ type }) => type == "appBar")?.settings;
	const scrollBehavior = appBar?.scrollBehavior ?? "Sticky";
	const banner = sections.find(({ type }) => type == "banner")?.settings;
	const bannerColor = banner?.color ?? "inherit";

	return {
		app,
		pages,
		currentPage: pages?.length ? pages[0] : null,
		sections,
		pageProps: {
			appBar,
			primaryBgTextColor,
			scrollBehavior,
			banner,
			bannerColor,
		},
	};
};

export const links = () => [{ rel: "stylesheet", href: theme }];

export default function StandaloneAppWrapper() {
	return (
		<StandaloneAppContext.Provider value={useLoaderData()}>
			<Outlet />
			{!useHydrated() && <script src="tailwindcss.js"></script>}
		</StandaloneAppContext.Provider>
	);
}
