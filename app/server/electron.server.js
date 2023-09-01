// @ts-nocheck
import electron from "electron";
import db from "./db.server";

export default {
	...electron,
	db,
	users() {
		return new Promise((res) => {
			db.all("SELECT * FROM users", (err, rows) => {
				res(rows);
			});
		});
	},
};
