import { prisma } from "../db.server";
import sampleApp from "../orm/sampleApp";

export default async function seedApp() {
	const app = await (async () => {
		const { icon, color, type, name } = sampleApp;
		return await prisma.pierApp.create({
			data: {
				icon,
				color,
				type,
				name,
				settings: JSON.stringify(sampleApp.settings),
			},
		});
	})();

	const page = await (async () => {
		const { name, icon, type, settings, index } = sampleApp.pages[0];

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

	const sections = [
		...sampleApp.sections.map((section) => ({ ...section, appId: app.id })),
		...sampleApp.pages[0].sections.map((section) => ({
			...section,
			pageId: page.id,
		})),
	];

	await Promise.all(
		sections.map(async (section) => {
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

	return;
}
