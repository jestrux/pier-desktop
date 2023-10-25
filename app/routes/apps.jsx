import { Outlet } from "@remix-run/react";
import { useHydrated } from "remix-utils";

import { useLoaderData } from "@remix-run/react";
import StandaloneAppContext from "~/StandaloneApp/StandaloneAppContext";

import theme from "~/StandaloneApp/theme-old.css";
import { redirect } from "@remix-run/server-runtime";
import { deleteApp, updateApp } from "~/server/api/index.server";
import { prisma } from "~/server/db.server";
import { useEffect } from "react";
import { formDataObject } from "~/utils";
import seedApp from "~/server/seeder";

export const action = async ({ request }) => {
	const data = formDataObject(await request.formData());

	if (request.method == "DELETE") {
		await deleteApp(data.appId);
		return redirect("/apps");
	}

	if (request.method == "PATCH") {
		return await updateApp(data);
	}

	return await seedApp(data.type);
	// return redirect("/app/" + app.id);
};

export const loader = async () => {
	let apps;

	try {
		apps = await prisma.pierApp.findMany();
		if (apps.find(({ active }) => active)) return redirect("/app");
	} catch (error) {
		apps = [];
	}

	return {
		apps,
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
