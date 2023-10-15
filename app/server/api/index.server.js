import { prisma } from "~/server/db.server";

export { default as createModel } from "./createModel.server";

export { default as initializeDb } from "./initializeDb.server";

export const updateAppSettings = async ({
	appId,
	settings: updatedSettings,
} = {}) => {
	const { settings: oldSettings } = await prisma.pierApp.findFirst({
		where: {
			id: Number(appId),
		},
	});

	const settings = {
		...JSON.parse(oldSettings),
		...JSON.parse(updatedSettings),
	};

	await prisma.pierApp.update({
		data: {
			id: Number(appId),
			settings: JSON.stringify(settings),
		},
		where: {
			id: Number(appId),
		},
	});

	return settings;
};

export const createSection = async (payload) => {
	const res = await prisma.pierSection.create({
		data: {
			...payload,
			...(payload.pageId ? { pageId: Number(payload.pageId) } : {}),
			...(payload.appId ? { appId: Number(payload.appId) } : {}),
		},
	});

	console.log("New section: ", res);

	return res;
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
