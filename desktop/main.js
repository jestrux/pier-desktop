const { initRemix } = require("remix-electron");
const tinycolor = require("tinycolor2");
const express = require("express");
const { app, BrowserWindow, dialog } = require("electron");
const { join } = require("node:path");
const { PrismaClient } = require("@prisma/client");

const http = require("http");
const { Server } = require("socket.io");
const { writeFile } = require("node:fs");
const seedPierModels = require("./helpers/seedPierModels");
const getPierData = require("./helpers/getPierData");

const isDev = process.env.NODE_ENV === "development";

const expressApp = express();
const server = http.createServer(expressApp);

const DB_FOLDER = isDev
	? join(__dirname, "../prisma")
	: app.getPath("userData");

const DB_PATH = isDev ? join(DB_FOLDER, "dev.db") : join(DB_FOLDER, "pier.db");

const UPLOAD_PATH = isDev
	? join(__dirname, "../prisma/screenshots")
	: join(app.getPath("userData"), "screenshots");

let prisma;

const io = new Server(server);

io.on("connection", (socket) => {
	console.log("A new user connected to socket!");

	socket.on("screenshot", (data) => {
		console.log("IO Screenshot");
		writeFile(
			UPLOAD_PATH + `app-${data.appId}.png`,
			Buffer.from(data.image, "base64"),
			(err) => {
				console.log("Save screenshot: ", err ? err : "success");
			}
		);
		// io.broadcast("screenshot", data);
	});
});

async function getApp() {
	if (!prisma) {
		prisma = new PrismaClient({
			datasources: {
				db: {
					url: `file:${DB_PATH}`,
				},
			},
		});
	}

	const app = await prisma.pierApp.findFirstOrThrow({
		include: {
			sections: true,
			pages: {
				include: {
					sections: true,
				},
			},
		},
		where: {
			active: true,
		},
	});

	app.settings = JSON.parse(app.settings);
	app.sections = app.sections
		.map((section) => {
			return {
				...section,
				settings: JSON.parse(section.settings),
			};
		})
		.sort((a, b) => a.index - b.index);

	app.pages = app.pages
		.map((page) => {
			page.settings = JSON.parse(page.settings);
			page.sections = page.sections
				.map((section) => {
					return {
						...section,
						settings: JSON.parse(section.settings),
					};
				})
				.sort((a, b) => a.index - b.index);

			return page;
		})
		.sort((a, b) => a.index - b.index);

	// console.log("Pier app:", app);

	const isLight = tinycolor(app.color).isLight();
	app.primaryBgTextColor = isLight ? "#000000" : "#FFFFFF";

	try {
		app.data = await getPierData(
			join(DB_FOLDER, `db-${app.id}-${app.name}.db`)
		);
	} catch (error) {
		console.log("No database setup", error);
	}

	return app;
}

expressApp.get("/seed-pier-models", async (req, res) => {
	try {
		const app = await getApp();
		if (!app) return res.json({ error: "No current app" });

		console.log("Setup pier models...");

		const models = await seedPierModels(
			join(DB_FOLDER, `db-${app.id}-${app.name}.db`)
		);
		return res.json(models);
	} catch (error) {
		console.log("Pier error: ", error);
		return res.json({ error });
	}
});

expressApp.get("/reload", async (req, res) => {
	try {
		const app = await getApp();
		io.emit("app-changed", JSON.stringify({ app, models: [] }));
		return res.json(app);
	} catch (error) {
		console.log("Pier error: ", error);
		return res.json({ app: null, models: [] });
	}
});

expressApp.get("/app/*", async (req, res) => {
	try {
		const app = await getApp();
		return res.json({ app, models: [] });
	} catch (error) {
		console.log("Pier error: ", error);
		return res.json({ app: null, models: [] });
	}
});

server.listen(3120, () => {
	console.log("Listen on the port 3120...");
});

/** @type {BrowserWindow | undefined} */
let win;

/** @param {string} url */
async function createWindow(url) {
	win = new BrowserWindow({ width: 4000, height: 4000, show: false });
	await win.loadURL(url);
	win.show();

	if (isDev) {
		// win.webContents.openDevTools();
	}
}

app.on("ready", async () => {
	// return;

	try {
		if (isDev) {
			const {
				default: installExtension,
				REACT_DEVELOPER_TOOLS,
			} = require("electron-devtools-installer");

			await installExtension(REACT_DEVELOPER_TOOLS);
		}

		const url = await initRemix({
			serverBuild: join(__dirname, "build"),
			getLoadContext: () => ({
				socket: io,
				seedPierModels: () => seedPierModels(DB_PATH),
			}),
		});
		await createWindow(url);
	} catch (error) {
		dialog.showErrorBox("Error", getErrorStack(error));
		console.error(error);
	}
});

/** @param {unknown} error */
function getErrorStack(error) {
	return error instanceof Error
		? error.stack || error.message
		: String(error);
}
