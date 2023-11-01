import pageSectionFields from "./pageSectionFields";

export default function featureSection() {
	const section = {
		index: 3,
		type: "featureSection",
		name: "Feature Section",
	};

	const fields = {
		...pageSectionFields({
			background: "#F2F2F2",
			color: "black",
			title: "Our core values",
			subtitle:
				"Contact us with any of our insurance offerings and we'll sort you out. We'll be waiting to hear from you.",
			layout: "Centered",
			buttonOne: null,
			buttonTwo: null,
		}),
	};

	section.fields = {
		...fields,
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
