const { AsyncDatabase } = require("promised-sqlite3");
const samplePierData = require("./samplePierData");

async function createModel({ db, model, data }) {
	const fields = ["_id", ...model.fields.map((f) => f.label)];
	const columns = fields.map((f) => `${f} text`).join(", ");
	const _data = data
		.map((row) => {
			const cols = fields
				.map((field) => {
					const value = row[field].toString().replaceAll("'", "''");
					return `'${value}'`;
				})
				.join(",");

			return `(${cols})`;
		})
		.join(",");

	const table = model?.name.toLowerCase();

	// db.serialize(() => {
	try {
		await db.run(`DELETE FROM pier WHERE _id = '${model._id}'`);

		await db.run(
			`INSERT INTO pier (_id, name, display_field, fields, settings) VALUES (?, ?, ?, ?, ?)`,
			[
				model._id,
				model.name,
				model.display_field,
				JSON.stringify(model.fields),
				model.settings,
			]
		);

		await db.run(`CREATE TABLE IF NOT EXISTS ${table} (${columns})`);

		await db.run(`DELETE FROM ${table}`);

		if (data?.length) {
			await db.run(
				`INSERT INTO ${table} (${fields.join(",")}) VALUES ${_data}`
			);
			// db.run("INSERT INTO Users VALUES (?, ?)", ["John Wick", 20]);

			// const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
			// for (let i = 0; i < 10; i++) {
			// 	stmt.run("Ipsum " + i);
			// }
			// stmt.finalize();
		}
	} catch (error) {
		console.log("Pier db error: ", error);
	}
	// });

	// db.close();
}

async function modelImporter(models, { saveModel, onChange } = {}, callback) {
	const savedModels = models
		.filter(({ status }) => status == "saved")
		.map(({ name }) => name);

	const modelIsValid = (model) => {
		let referenceFields;
		try {
			referenceFields = JSON.parse(model.fields);
		} catch (error) {
			referenceFields = model.fields;
		}

		const metaModels = referenceFields
			.filter(({ type }) =>
				["reference", "multi-reference"].includes(type)
			)
			.map(({ meta }) => meta.model);

		return (
			!metaModels.length ||
			metaModels.every((metaModel) => savedModels.includes(metaModel))
		);
	};

	models = models.map((model) => {
		const processed = ["saved", "pending"].includes(model.status);
		if (!processed && modelIsValid(model)) model.status = "pending";

		return model;
	});

	if (onChange) onChange(models);

	const importModel = async (model) => {
		let fields = model.fields;
		let settings = model.settings;

		try {
			const parsedFields = JSON.parse(fields);
			fields = parsedFields;
		} catch (error) {
			/* empty */
		}

		// try {
		// 	const parsedSettings = JSON.parse(settings);
		// 	settings = parsedSettings;
		// } catch (error) {}

		const parsedModel = {
			...model,
			displayField: model.display_field,
			name: model.name, //.replace(/ /g, ""),
			fields,
			settings: JSON.stringify(settings),
		};

		// delete parsedModel.settings;

		await saveModel(parsedModel);

		models = models.map((m) => {
			if (m.name == model.name) m.status = "saved";

			return m;
		});

		if (onChange) onChange(models);
	};

	const pendingModels = (strict) =>
		models.filter(({ status }) =>
			strict ? status == "pending" : !status || status == "pending"
		);

	await Promise.all(pendingModels(true).map(importModel));

	if (pendingModels().length)
		return modelImporter(models, { saveModel, onChange }, callback);

	callback(models);
}

async function seedPierModels(DB_PATH) {
	const db = await AsyncDatabase.open(DB_PATH);
	const { models, data } = samplePierData;

	try {
		console.log("Setup pier models...");

		await db.run(
			"CREATE TABLE IF NOT EXISTS pier (_id TEXT, name TEXT, display_field TEXT, fields TEXT, settings TEXT)"
		);

		// await db.run("DELETE FROM pier");

		await new Promise((res) => {
			modelImporter(
				models,
				{
					saveModel: async (model) => {
						console.log("Save model: ", model);

						await db.run(
							`DROP TABLE IF EXISTS ${model?.name.toLowerCase()}`
						);

						return createModel({
							db,
							model: model,
							data: data[model.name],
						});
					},
				},
				res
			);
		});

		return await db.all(`SELECT * FROM pier`);
	} catch (error) {
		console.log("Pier init models error: ", error);
		return null;
	}
}

module.exports = seedPierModels;
