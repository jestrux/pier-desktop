import { PrismaClient } from "@prisma/client";
import electron from "./electron.server";
import fs from "node:fs";
import { join } from "node:path";
import getActiveApp from "./api/getActiveApp.server";
import dbHelpers from "./helpers/db-helpers";

const isDev = process.env.NODE_ENV === "development";

const DB_FOLDER = isDev
	? join(__dirname, "../../prisma")
	: electron.app.getPath("userData");

const DB_PATH = isDev ? join(DB_FOLDER, "dev.db") : join(DB_FOLDER, "pier.db");

const initializeDatabase = () => {
	try {
		const devDbPath = isDev
			? join(__dirname, "../../prisma/dev.db")
			: join(process.resourcesPath, "prisma/dev.db");

		// database file does not exist, need to create
		fs.copyFileSync(join(devDbPath), DB_PATH, fs.constants.COPYFILE_EXCL);
		console.log("New database file created");
	} catch (err) {
		if (err.code != "EEXIST") {
			console.error(`Failed creating sqlite file.`, err);
		} else {
			console.log("Database file detected");
		}
	}
};

export const prisma = new PrismaClient({
	datasources: {
		db: {
			url: `file:${DB_PATH}`,
		},
	},
});

if (!isDev) initializeDatabase();

export const currentAppDatabase = async () => {
	try {
		const { app } = (await getActiveApp()) ?? {};

		return await dbHelpers(join(DB_FOLDER, `db-${app.id}-${app.name}.db`));
	} catch (error) {
		console.log("Error loading pier db helpers: ", error);

		return null;
	}
};
