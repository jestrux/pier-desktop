import { PrismaClient } from "@prisma/client";
import electron from "./electron.server";
import fs from "node:fs";
import { join } from "node:path";
import { AsyncDatabase } from "promised-sqlite3";

const isDev = process.env.NODE_ENV === "development";
const DB_PATH = isDev
	? join(__dirname, "../../prisma/dev.db")
	: join(electron.app.getPath("userData"), "some.db");

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

if (!isDev) initializeDatabase();

export const prisma = new PrismaClient({
	datasources: {
		db: {
			url: `file:${DB_PATH}`,
		},
	},
});

async function dbClient() {
	return await AsyncDatabase.open(DB_PATH);
}

export const runQuery = async (...params) => {
	const db = await dbClient();
	return db.run(...params);
};

export const queryAll = async (...params) => {
	const db = await dbClient();
	return db.all(...params);
};

export const getAll = async (table) => {
	return await queryAll(`SELECT * from ${table}`);
};

export default dbClient;
