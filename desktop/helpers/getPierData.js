const dbHelpers = require("./db-helpers");

async function getPierData(DB_PATH) {
	const { queryModel } = await dbHelpers(DB_PATH);

	let models = await queryModel("pier", {
		includeModelDetails: false,
	});

	models = models.map((model) => {
		try {
			model.fields = JSON.parse(model.fields);
		} catch (error) {
			/* empty */
		}

		return model;
	});

	if (models?.length) {
		const entries = await Promise.all(
			models.map((model) =>
				queryModel(model, {
					includeModelDetails: false,
				})
			)
		);

		models = models.map((model, index) => ({
			...model,
			entries: entries[index],
		}));
	}

	return models.reduce((agg, model) => {
		return {
			...agg,
			[model.name]: model,
		};
	}, {});
}

module.exports = getPierData;
