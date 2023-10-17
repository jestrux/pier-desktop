import textSection from "./text-section";

export default function featureSection() {
	const section = {
		...textSection(),
		index: 3,
		type: "featureSection",
		name: "Feature Section",
	};

	section.fields = {
		...section.fields,
		featureLayout: {
			type: "settings",
			defaultValue: {
				columns: 4,
				gap: "2rem",
			},
			fields: {
				columns: {
					type: "radio",
					label: "Number of columns",
					choices: [
						{ label: "two", value: 2 },
						{ label: "three", value: 3 },
						{ label: "four", value: 4 },
						{ label: "five", value: 5 },
					],
				},
				gap: {
					type: "radio",
					label: "Spacing",
					choices: [
						{ label: "none", value: 0 },
						{ label: "small", value: "1rem" },
						{ label: "regular", value: "2rem" },
						{ label: "large", value: "3.5rem" },
						{ label: "xlarge", value: "6rem" },
					],
				},
			},
		},
	};

	return section;
}
