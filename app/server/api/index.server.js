import { prisma } from "~/server/db.server";

export { default as createModel } from "./createModel.server";

export { default as initializeDb } from "./initializeDb.server";

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