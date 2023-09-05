import dbClient from "~/server/db.server";

export { default as createModel } from "./createModel.server";

export { default as initializeDb } from "./initializeDb.server";

export const updateSectionSettings = async ({
	sectionId,
	settings: updatedSettings,
} = {}) => {
	const db = await dbClient();
	const { settings: oldSettings } = await db.get(
		"SELECT settings FROM pier_sections WHERE _id = ?",
		sectionId
	);

	// console.log("User settings: ", updatedSettings, oldSettings);

	const settings = JSON.stringify({
		...JSON.parse(oldSettings),
		...JSON.parse(updatedSettings),
	});

	await db.run(
		`UPDATE pier_sections SET settings = $settings WHERE _id = $id`,
		{
			$settings: settings,
			$id: sectionId,
		}
	);

	// db.close();

	return settings;
};
