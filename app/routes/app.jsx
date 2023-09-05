import { Outlet } from "@remix-run/react";
import { useHydrated } from "remix-utils";

import { useLoaderData } from "@remix-run/react";
import tinycolor from "tinycolor2";
import StandaloneAppContext from "~/StandaloneApp/StandaloneAppContext";

import theme from "~/StandaloneApp/theme-old.css";
import { redirect } from "@remix-run/server-runtime";
import { initializeDb, updateSectionSettings } from "~/server/api/index.server";
import { getAll } from "~/server/db.server";
import { useEffect } from "react";
import { formDataObject } from "~/utils";

export const action = async ({ request }) => {
	const data = formDataObject(await request.formData());
	await updateSectionSettings(data);
	return redirect("/app");
};

export const loader = async () => {
	let apps;

	try {
		apps = await getAll("pier_apps", { includeModelDetails: false });
	} catch (error) {
		await initializeDb();
		return redirect("/app");
	}

	const app = apps[0];
	app.settings = JSON.parse(app.settings);
	let pages = await getAll("pier_pages", {
		includeModelDetails: false,
	});
	pages = pages.map((page) => {
		page.settings = JSON.parse(page.settings);
		return page;
	});
	let sections = await getAll("pier_sections", {
		includeModelDetails: false,
	});
	sections = sections.map((section) => {
		section.settings = JSON.parse(section.settings);
		return section;
	});

	const isLight = tinycolor(app.color).isLight();
	const primaryBgTextColor = isLight ? "black" : "white";
	const appBar = sections.find(({ type }) => type == "appBar");
	const scrollBehavior = appBar?.settings?.scrollBehavior ?? "Sticky";
	const banner = sections.find(({ type }) => type == "banner");
	const bannerColor = banner?.settings?.color ?? "inherit";

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
	const hyrated = useHydrated();
	const appData = useLoaderData();

	useEffect(() => {
		console.log("App wrapper loaded!!");

		if (hyrated) {
			document.dispatchEvent(
				new CustomEvent("pier:app-data-changed", {
					detail: appData,
				})
			);
		}
	}, [hyrated, appData]);

	return (
		<StandaloneAppContext.Provider value={appData}>
			<Outlet />
			{!useHydrated() && <script src="tailwindcss.js"></script>}
		</StandaloneAppContext.Provider>
	);
}
