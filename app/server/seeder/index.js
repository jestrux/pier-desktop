import formattedApp from "../api/getActiveApp.server";
import { prisma } from "../db.server";
import sampleAdminPanel from "./sampleAdminPanel";
import sampleMobileApp from "./sampleMobileApp";
import sampleWebsite from "./sampleWebsite";

export default async function seedApp(_type = "website") {
	const { icon, color, type, name, settings, pages, sections } = {
		adminPanel: sampleAdminPanel,
		mobileApp: sampleMobileApp,
		website: sampleWebsite,
	}[_type];

	await prisma.pierApp.updateMany({
		data: {
			active: false,
		},
	});

	const app = await (async () => {
		return await prisma.pierApp.create({
			data: {
				icon,
				color,
				type,
				name,
				settings: JSON.stringify(settings),
			},
		});
	})();

	const page = await (async () => {
		const { name, icon, type, settings, index } = pages[0];

		return await prisma.pierPage.create({
			data: {
				name,
				icon,
				type,
				index,
				appId: app.id,
				settings: JSON.stringify(settings),
			},
		});
	})();

	const _sections = [
		...sections.map((section) => ({ ...section, appId: app.id })),
		...pages[0].sections.map((section) => ({
			...section,
			pageId: page.id,
		})),
	];

	await Promise.all(
		_sections.map(async (section) => {
			const {
				name,
				color,
				type,
				platform,
				index,
				appId,
				pageId,
				settings,
			} = section;

			return await prisma.pierSection.create({
				data: {
					name,
					color,
					type,
					platform,
					index,
					appId,
					pageId,
					settings: JSON.stringify(settings),
				},
			});
		})
	);

	return formattedApp(app.id);
}
