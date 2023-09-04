import electron from "electron";
import { writeFileSync, readFileSync } from "node:fs";

const STORAGE_PATH = electron.app.getPath("userData") + "/pier-storage.json";

function parseData() {
	const defaultData = {};
	try {
		return JSON.parse(readFileSync(STORAGE_PATH));
	} catch (error) {
		return defaultData;
	}
}

function writeData(key, value) {
	let contents = parseData();
	contents[key] = value;
	writeFileSync(STORAGE_PATH, JSON.stringify(contents));
}

function readData(key) {
	let contents = parseData();
	return contents[key];
}

export default {
	readData,
	writeData,
};
