import electron from "electron";

import { AsyncDatabase } from "promised-sqlite3";

export const DB_PATH = electron.app.getPath("userData") + "/pier.db";

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
