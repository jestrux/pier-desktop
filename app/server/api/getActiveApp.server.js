import { prisma } from "../db.server";

export default async function getActiveApp() {
	let app = await prisma.pierApp.findFirstOrThrow({
		include: {
			sections: true,
			pages: {
				include: {
					sections: true,
				},
			},
		},
		where: {
			active: true,
		},
	});

	app.settings = JSON.parse(app.settings);
	app.sections = app.sections.map((section) => {
		return {
			...section,
			settings: JSON.parse(section.settings),
		};
	});
	app.pages = app.pages
		.map((page) => {
			page.settings = JSON.parse(page.settings);
			page.sections = page.sections.map((section) => {
				return {
					...section,
					settings: JSON.parse(section.settings),
				};
			});
			return page;
		})
		.sort((a, b) => a.index - b.index);
	const pages = app.pages;
	const currentPage = pages?.length ? pages[0] : null;

	const sections = [
		...app.sections,
		...(currentPage?.sections.length ? currentPage.sections : []),
		// ...pages.map(({ sections }) => sections).flat(),
	];

	return {
		app,
		pages,
		currentPage,
		sections,
	};
}
