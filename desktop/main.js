const { initRemix } = require("remix-electron");
const express = require("express");
const { app, BrowserWindow, dialog } = require("electron");
const { join } = require("node:path");
const { PrismaClient } = require("@prisma/client");

const http = require("http");
const { Server } = require("socket.io");

const isDev = process.env.NODE_ENV === "development";

const expressApp = express();
const server = http.createServer(expressApp);

const DB_PATH = isDev
	? join(__dirname, "../prisma/dev.db")
	: join(app.getPath("userData"), "some.db");

let prisma;

const io = new Server(server);

io.on("connection", (socket) => {
	console.log("A new user connected to socket!");
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
	});

	app.settings = JSON.parse(app.settings);
	app.pages = app.pages
		.map((page) => {
			page.settings = JSON.parse(page.settings);
			page.sections = page.sections.map((section) => {
				return {
					...section,
					section: JSON.parse(section.settings),
				};
			});
			return page;
		})
		.sort((a, b) => a.index - b.index);

	// console.log("Pier app:", app);

	return app;
}

expressApp.get("/reload", async (req, res) => {
	try {
		const app = await getApp();
		io.emit("app-changed", JSON.stringify({ app, models: [] }));
		return res.json({ app, models: [] });
	} catch (error) {
		console.log("Pier error: ", error);
		return res.send(JSON.stringify(error));
	}
});

expressApp.get("/app/*", async (req, res) => {
	try {
		const app = await getApp();
		return res.json({ app, models: [] });
	} catch (error) {
		console.log("Pier error: ", error);
		return res.send(JSON.stringify(error));
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
