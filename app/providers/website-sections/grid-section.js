import pageSectionFields from "./pageSectionFields";

export default function gridSection() {
	const section = {
		index: 4,
		type: "gridSection",
		name: "Grid Section",
	};

	const fields = {
		...pageSectionFields({
			textSettingsLabel: "Grid Text",
			title: "Eco-friendly tours",
			subtitle:
				"The eco-friendly tours that we organize raise awareness about environmental concerns.",
			layout: "Horizontal",
			buttonOne: "See all tours",
			buttonTwo: null, //"Book a tour",
		}),
	};

	section.fields = {
		...fields,
		gridLayout: {
			type: "settings",
			defaultValue: {
				aspectRatio: "portrait",
				columns: 4,
				gap: "2rem",
				overlayText: false,
			},
			fields: {
				aspectRatio: {
					type: "radio",
					label: "Aspect Ratio",
					choices: ["portrait", "landscape", "square"],
				},
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
				overlayText: "boolean",
			},
		},
		gridCard: {
			type: "settings",
			defaultValue: {
				padding: "0.5rem",
				textPlacement: "bottomLeft",
			},
			fields: {
				padding: {
					type: "radio",
					label: "Padding",
					choices: [
						{ label: "small", value: "0.25rem" },
						{ label: "regular", value: "0.5rem" },
						{ label: "large", value: "0.75rem" },
						{ label: "xlarge", value: "1rem" },
					],
				},
				textPlacement: {
					type: "radio",
					label: "Text placement",
					choices: ["bottomLeft", "bottomCenter"],
					show: (data) => data.overlayText,
				},
			},
		},
	};

	return section;
}
