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
	app.sections = app.sections
		.map((section) => {
			return {
				...section,
				settings: JSON.parse(section.settings),
			};
		})
		.sort((a, b) => a.index - b.index);
	app.pages = app.pages
		.map((page) => {
			page.settings = JSON.parse(page.settings);
			page.sections = page.sections
				.map((section) => {
					return {
						...section,
						settings: JSON.parse(section.settings),
					};
				})
				.sort((a, b) => a.index - b.index);
			return page;
		})
		.sort((a, b) => a.index - b.index);
	const pages = app.pages;
	let currentPage;

	if (pages?.length)
		currentPage = pages.find((page) => page.active) ?? pages[0];

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
