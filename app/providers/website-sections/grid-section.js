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
				aspectRatio: "landscape",
				columns: 4,
				gap: "2rem",
				overlayText: false,
			},
			fields: {
				aspectRatio: {
					type: "radio",
					label: "Aspect Ratio",
					choices: ["landscape", "square", "portrait"],
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
				inset: true,
				padding: "regular",
				textSize: "regular",
				textPlacement: "bottomLeft",
			},
			fields: {
				inset: {
					type: "boolean",
					label: "Inset content",
				},
				padding: {
					type: "radio",
					label: "Padding",
					choices: ["regular", "large"],
				},
				textSize: {
					type: "radio",
					label: "Text size",
					choices: ["small", "regular", "large", "xlarge"],
					show: (data) => data.overlayText,
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
