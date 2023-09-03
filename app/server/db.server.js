import electron from "electron";
import sqlite from "sqlite3";
import { createModel } from "~/api";
import sampleApp from "~/orm/sampleApp";
import sampleDb from "~/orm/sampleDb";

const DB_PATH = electron.app.getPath("userData") + "/pier.db";
const db = new sqlite.Database(DB_PATH);

db.serialize(() => {
	db.run(
		"CREATE TABLE IF NOT EXISTS pier (_id TEXT, name TEXT, display_field TEXT, fields TEXT, settings TEXT)"
	);

	db.run("DELETE FROM pier");

	db.run(
		"CREATE TABLE IF NOT EXISTS pier_apps (_id, icon, color, type, name, settings)"
	);

	db.run("DELETE FROM pier_apps");

	db.run(
		"CREATE TABLE IF NOT EXISTS pier_pages (_id, icon DEFAULT 'home', name, [index] INTEGER DEFAULT 1, type TEXT DEFAULT 'custom', settings, app_id, FOREIGN KEY(app_id) REFERENCES pier_apps(_id))"
	);

	db.run("DELETE FROM pier_pages");

	db.run(
		"CREATE TABLE IF NOT EXISTS pier_sections (_id, name, type, [index] INTEGER DEFAULT 1, platform TEXT DEFAULT 'all', settings, parent_id, parent_type)"
	);

	db.run("DELETE FROM pier_sections");

	db.run(
		`INSERT INTO pier_apps (_id, icon, color, type, name, settings) VALUES (?, ?, ?, ?, ?, ?)`,
		[
			sampleApp._id,
			sampleApp.icon,
			sampleApp.color,
			sampleApp.type,
			sampleApp.name,
			JSON.stringify(sampleApp.settings),
		]
	);

	const samplePage = sampleApp.pages[0];

	db.run(
		`INSERT INTO pier_pages (_id, icon, name, type, settings, app_id) VALUES (?, ?, ?, ?, ?, ?)`,
		[
			samplePage._id,
			samplePage.icon,
			samplePage.name,
			samplePage.type,
			JSON.stringify(samplePage.settings),
			samplePage.app_id,
		]
	);

	[sampleApp.sections[0], sampleApp.pages[0].sections[0]].forEach(
		(section) => {
			db.run(
				`INSERT INTO pier_sections (_id, name, type, [index], platform, settings, parent_id, parent_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
				[
					section._id,
					section.name,
					section.type,
					section.index,
					section.platform,
					JSON.stringify(section.settings),
					section.parent_id,
					section.parent_type,
				]
			);
		}
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

export default db;
