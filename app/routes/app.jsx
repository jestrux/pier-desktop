import { Outlet } from "@remix-run/react";
import { useHydrated } from "remix-utils";

import { useLoaderData } from "@remix-run/react";
import tinycolor from "tinycolor2";
import StandaloneAppContext from "~/StandaloneApp/StandaloneAppContext";

import theme from "~/StandaloneApp/theme-old.css";
import { redirect } from "@remix-run/server-runtime";
import {
	createSection,
	deleteSection,
	updateAppSettings,
	updateSectionSettings,
} from "~/server/api/index.server";
import { prisma } from "~/server/db.server";
import { useEffect } from "react";
import { formDataObject } from "~/utils";
import seedApp from "~/server/seeder";

export const action = async ({ request }) => {
	const data = formDataObject(await request.formData());

	if (data.appId) return await updateAppSettings(data);
	else if (data.sectionId) {
		if (!data.settings) return await deleteSection(data.sectionId);

		return await updateSectionSettings(data);
	}

	return await createSection(data);
};

export const loader = async () => {
	let app;
	try {
		app = await prisma.pierApp.findFirstOrThrow({
			include: {
				sections: true,
				pages: {
					include: {
						sections: true,
					},
				},
			},
		});
	} catch (error) {
		await seedApp();
		return redirect("/app");
	}

	app.settings = JSON.parse(app.settings);
	app.pages = app.pages.map((page) => {
		page.settings = JSON.parse(page.settings);
		return page;
	});
	const pages = app.pages;
	const currentPage = pages?.length ? pages[0] : null;

	const sections = [
		...app.sections,
		...(currentPage?.sections.length ? currentPage.sections : []),
		// ...pages.map(({ sections }) => sections).flat(),
	].map((section) => {
		return {
			...section,
			settings: JSON.parse(section.settings),
		};
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
		currentPage,
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
