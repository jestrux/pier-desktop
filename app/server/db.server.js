import electron from "electron";
import { existsSync, unlinkSync } from "node:fs";
import sqlite from "sqlite3";
import { createModel } from "~/api";
import sampleDb from "~/orm/sampleDb";

const DB_PATH = electron.app.getPath("userData") + "/pier.db";
// unlinkSync(DB_PATH);
const dbInitialized = existsSync(DB_PATH);
const db = new sqlite.Database(DB_PATH);

if (!dbInitialized) {
	db.serialize(() => {
		db.run(
			"CREATE TABLE IF NOT EXISTS pier (_id TEXT, name TEXT, display_field TEXT, fields TEXT, settings TEXT)"
		);
		db.run("DELETE FROM pier");

		db.run(
			"CREATE TABLE IF NOT EXISTS pier_apps (_id, icon, color, type, name, settings)"
		);
		db.run(
			"CREATE TABLE IF NOT EXISTS pier_pages (_id, icon DEFAULT 'home', name, [index] INTEGER DEFAULT 1, type TEXT DEFAULT 'custom', settings, app_id, FOREIGN KEY(app_id) REFERENCES pier_apps(_id))"
		);
		db.run(
			"CREATE TABLE IF NOT EXISTS pier_page_sections (_id, name, type, [index] INTEGER DEFAULT 1, platform TEXT DEFAULT 'all', settings, parent_id, parent_type)"
		);
	});

	const { models, data } = sampleDb;
	models.forEach((model) =>
		createModel({
			db,
			model: model,
			data: data[model.name],
		})
	);
}

export default db;
