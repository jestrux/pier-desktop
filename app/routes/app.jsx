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
	updateApp,
	updatePage,
	updateSectionSettings,
} from "~/server/api/index.server";
import { useEffect } from "react";
import { formDataObject } from "~/utils";
import getIp from "~/server/getIp.server";
import getActiveApp from "~/server/api/getActiveApp.server";
import { prisma } from "~/server/db.server";

export const action = async ({ request }) => {
	const { _action, ...data } = formDataObject(await request.formData());

	if (_action) {
		if (_action == "reorderPages")
			return await reorderPages({ pages: JSON.parse(data.pages) });

		if (_action == "editPage") return await updatePage(data);

		if (_action == "addPage") return await createPage(data);
	}

	if (data.appId) {
		if (request.method == "PATCH") return await updateApp(data);
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
	const apps = await prisma.pierApp.findMany();

	try {
		const { app, pages, currentPage, sections } = await getActiveApp();
		const isLight = tinycolor(app.color).isLight();
		const primaryBgTextColor = isLight ? "#000000" : "#FFFFFF";
		const appBar = sections.find(({ type }) => type == "appBar");
		const scrollBehavior = appBar?.settings?.scrollBehavior ?? "Sticky";
		const banner = sections.find(({ type }) => type == "banner");
		const bannerColor = banner?.settings?.color ?? "inherit";
		const footer = sections.find(({ type }) => type == "footer");

		const socket =
			typeof context.socket?.emit == "function" ? context.socket : null;

		if (socket) {
			socket.emit(
				"app-changed",
				JSON.stringify({
					app: { ...app, primaryBgTextColor },
					models: [],
				})
			);

			socket.on("screenshot", (data) => {
				console.log("Screenshot: ", data);
			});
		}

		return {
			apps,
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
	} catch (error) {
		return redirect("/apps");
	}
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
