import server from "~/server/electron.server";
const dbClient = server.db;

const testModel = {
	name: "User",
	display_field: "name",
	fields: [
		{ label: "name", type: "string", required: true },
		{ label: "email", type: "email", required: true },
		{
			label: "password",
			type: "password",
			required: true,
		},
	],
};

export const model_table = (model) => {
	return (model?.name || model || "").toLowerCase();
};

export const queryModelDetails = (model) => {
	// const stmt = dbClient.prepare("SELECT * FROM hello WHERE a=:aval AND b=:bval");
	// const res = stmt.getAsObject({ ":aval": 1, ":bval": "world" });
	// stmt.free();
	// return res;

	return new Promise((resolve, reject) => {
		dbClient.all(
			`SELECT * FROM pier WHERE name = '${model}'`,
			(err, rows) => {
				if (err) return reject(err);

				const data = rows[0];
				data.fields = JSON.parse(data.fields);
				data.settings = JSON.parse(data.settings);
				resolve(data);
			}
		);
	});
};

export const queryModel = (
	model,
	{ q, rowId, includeModelDetails = true } = {}
) => {
	// const stmt = dbClient.prepare("SELECT * FROM hello WHERE a=:aval AND b=:bval");
	// const res = stmt.getAsObject({ ":aval": 1, ":bval": "world" });
	// stmt.free();
	// return res;

	return new Promise(async (resolve, reject) => {
		const modelDetails = !includeModelDetails
			? null
			: await queryModelDetails(model, { q, rowId });

		const rowFilter = !rowId?.length ? "" : `WHERE _id = ${rowId}`;
		const query = `SELECT * FROM ${model_table(model)}${rowFilter}`;
		// const query = !modelDetails
		// 	? `SELECT * FROM ${model_table(model)}${rowFilter}`
		// 	: queryModelString(modelDetails, { q, rowId });

		dbClient.all(query, (err, data) => {
			if (err) return reject(err);

			if (rowId?.length) data = data?.[0] ?? null;

			resolve({ model: modelDetails, data });
		});
	});
};

export const modelFieldsObject = (model) =>
	(model?.fields || []).reduce(
		(agg, entry) => ({ ...agg, [entry.label]: entry }),
		{
			_id: { label: "_id", type: "string" },
		}
	);

export const queryModelString = (model, options = {}) => {
	const table = model_table(model);
	let searchField = model.display_field;
	let searchValue = (options || {})?.q;
	if (searchValue?.length) {
		const [field, value] = searchValue.toString().split(":");
		if (value?.length) {
			searchField = field;
			searchValue = value;
		}
	}
	let userFilters = [];

	if (options) {
		if (options.q) {
			userFilters.push(`${searchField} LIKE '%${searchValue}%'`);
		}

		if (options.rowId) {
			userFilters.push(`_id = '${options.rowId}'`);
		}
	}

	let queryFilters = userFilters.length
		? `WHERE ${userFilters.join(" AND ")}`
		: "";

	let query = `SELECT * FROM ${model_table(model)} ${queryFilters};`;
	const referenceFields = model.fields.filter(
		({ type }) => type == "reference"
	);
	if (referenceFields.length) {
		const randomId = () =>
			`md${Math.random().toFixed(4).replace("0.", "")}`;
		const baseModelKey = randomId();
		const fieldsObject = modelFieldsObject(model);
		const fieldNames = Object.keys(fieldsObject);
		let fieldSelector = fieldNames
			.filter(
				(fieldName) =>
					!["reference", "multi-reference"].includes(
						fieldsObject[fieldName].type
					)
			)
			.map((fieldName) => {
				return `${baseModelKey}.${fieldName} as ${fieldName}`;
			})
			.join(", ");

		queryFilters = userFilters.length
			? `WHERE ${userFilters
					.map((f) => `${baseModelKey}.${f}`)
					.join(" AND ")}`
			: "";

		let joinQueries = "";

		referenceFields.forEach((field) => {
			const { model, mainField } = field.meta;
			const joinedTable = model_table({ name: model });
			const modelKey = randomId();

			// if (searchField == field.label)
			// 	fullSearchField = `${modelKey}.${mainField}`;
			fieldSelector += `, json_object('_id', ${modelKey}._id, 'name', ${modelKey}.${mainField}) as ${joinedTable}`;
			joinQueries += `LEFT JOIN (SELECT _id, ${mainField} FROM ${joinedTable}) as ${modelKey} ON ${baseModelKey}.${field.label} = ${modelKey}._id`;
		});

		const innerQuery = `SELECT ${fieldNames.join(",")} FROM ${table}`;
		query = `SELECT ${fieldSelector} FROM (${innerQuery}) as ${baseModelKey} ${joinQueries} ${queryFilters};`;
	}

	return query;
};
