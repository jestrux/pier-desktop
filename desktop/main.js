const { initRemix } = require("remix-electron");
const { app, BrowserWindow, dialog } = require("electron");
const { join } = require("node:path");

const isDev = process.env.NODE_ENV === "development";

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
