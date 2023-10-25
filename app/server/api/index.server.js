import { prisma } from "~/server/db.server";

export { default as createModel } from "./createModel.server";

export { default as initializeDb } from "./initializeDb.server";

export const deleteApp = async (appId) => {
	return await prisma.pierApp.delete({
		where: {
			id: Number(appId),
		},
	});
};

export const updateApp = async ({ appId, ...payload } = {}) => {
	let settings;

	if (payload.active != undefined) {
		if (payload.active) {
			await prisma.pierApp.updateMany({
				data: {
					active: false,
				},
			});
		}

		payload.active = payload.active === "true";
	}

	if (payload.settings) {
		const { settings: oldSettings } = await prisma.pierApp.findFirst({
			where: {
				id: Number(appId),
			},
		});

		settings = JSON.stringify({
			...JSON.parse(oldSettings),
			...JSON.parse(payload.settings),
		});
	}

	return await prisma.pierApp.update({
		data: {
			id: Number(appId),
			...payload,
			...(settings ? { settings } : {}),
		},
		where: {
			id: Number(appId),
		},
	});
};

export const createPage = async (payload) => {
	if (payload.index != undefined) payload.index = Number(payload.index);

	return await prisma.pierPage.create({
		data: {
			...payload,
			appId: Number(payload.appId),
		},
	});
};

export const reorderPages = async ({ pages } = {}) => {
	for (let i = 0; i < pages.length; i++) {
		const { pageId, index } = pages[i];
		await prisma.pierPage.update({
			data: {
				id: Number(pageId),
				index: Number(index),
			},
			where: {
				id: Number(pageId),
			},
		});
	}

	return null;
};

export const updatePage = async ({ pageId, ...payload } = {}) => {
	let settings;

	if (payload.index != undefined) payload.index = Number(payload.index);

	if (payload.settings) {
		const { settings: oldSettings } = await prisma.pierPage.findFirst({
			where: {
				id: Number(pageId),
			},
		});

		settings = JSON.stringify({
			...JSON.parse(oldSettings),
			...JSON.parse(payload.settings),
		});
	}

	return await prisma.pierPage.update({
		data: {
			id: Number(pageId),
			...payload,
			...(settings ? { settings } : {}),
		},
		where: {
			id: Number(pageId),
		},
	});
};

export const deletePage = async (pageId) => {
	return await prisma.pierPage.delete({
		where: {
			id: Number(pageId),
		},
	});
};

export const createSection = async (payload) => {
	return await prisma.pierSection.create({
		data: {
			...payload,
			...(payload.pageId ? { pageId: Number(payload.pageId) } : {}),
			...(payload.appId ? { appId: Number(payload.appId) } : {}),
		},
	});
};

export const updateSectionSettings = async ({
	sectionId,
	settings: updatedSettings,
} = {}) => {
	const { settings: oldSettings } = await prisma.pierSection.findFirst({
		where: {
			id: Number(sectionId),
		},
	});

	const settings = {
		...JSON.parse(oldSettings),
		...JSON.parse(updatedSettings),
	};

	await prisma.pierSection.update({
		data: {
			id: Number(sectionId),
			settings: JSON.stringify(settings),
		},
		where: {
			id: Number(sectionId),
		},
	});

	return settings;
};

export const deleteSection = async (sectionId) => {
	return await prisma.pierSection.delete({
		where: {
			id: Number(sectionId),
		},
	});
};
