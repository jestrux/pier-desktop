import { Outlet } from "@remix-run/react";
import { useHydrated } from "remix-utils";

import { useLoaderData } from "@remix-run/react";
import tinycolor from "tinycolor2";
import StandaloneAppContext from "~/StandaloneApp/StandaloneAppContext";

import theme from "~/StandaloneApp/theme-old.css";
import { redirect } from "@remix-run/server-runtime";
import {
	createPage,
	createSection,
	deletePage,
	deleteSection,
	reorderPages,
	updateAppSettings,
	updatePage,
	updateSectionSettings,
} from "~/server/api/index.server";
import { prisma } from "~/server/db.server";
import { useEffect } from "react";
import { formDataObject } from "~/utils";
import seedApp from "~/server/seeder";
import getIp from "~/server/getIp.server";

export const action = async ({ request }) => {
	const { _action, ...data } = formDataObject(await request.formData());

	console.log("Payload:", data);

	if (_action) {
		if (_action == "reorderPages")
			return await reorderPages({ pages: JSON.parse(data.pages) });

		if (_action == "editPage") return await updatePage(data);

		if (_action == "addPage") return await createPage(data);
	}

	if (data.appId) {
		if (request.method == "PATCH") return await updateAppSettings(data);
	}

	if (data.sectionId) {
		if (request.method == "DELETE")
			return await deleteSection(data.sectionId);

		return await updateSectionSettings(data);
	}

	if (data.pageId) {
		if (request.method == "DELETE") return await deletePage(data.pageId);
	}

	return await createSection(data);
};

export const loader = async ({ context }) => {
	const ipAddress = getIp();

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
	app.pages = app.pages
		.map((page) => {
			page.settings = JSON.parse(page.settings);
			return page;
		})
		.sort((a, b) => a.index - b.index);
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
	const footer = sections.find(({ type }) => type == "footer");

	if (typeof context.socket.emit == "function")
		context.socket.emit("app-changed", JSON.stringify({ app, models: [] }));

	return {
		ipAddress,
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
			footer,
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
