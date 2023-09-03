export const createModel = ({
	db = dbClient,
	model = testModel,
	data = testData,
}) => {
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

	db.serialize(() => {
		try {
			db.run(`DELETE FROM pier WHERE _id = '${model._id}'`);

			db.run(
				`INSERT INTO pier (_id, name, display_field, fields, settings) VALUES (?, ?, ?, ?, ?)`,
				[
					model._id,
					model.name,
					model.display_field,
					JSON.stringify(model.fields),
					model.settings,
				]
			);

			db.run(`CREATE TABLE IF NOT EXISTS ${table} (${columns})`);

			db.run(`DELETE FROM ${table}`);

			if (data?.length) {
				db.run(
					`INSERT INTO ${table} (${fields.join(",")}) VALUES ${_data}`
				);
				// db.run("INSERT INTO Users VALUES (?, ?)", ["John Wick", 20]);

				// const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
				// for (let i = 0; i < 10; i++) {
				// 	stmt.run("Ipsum " + i);
				// }
				// stmt.finalize();
			}
		} catch (error) {}
	});

	// db.close();
};
