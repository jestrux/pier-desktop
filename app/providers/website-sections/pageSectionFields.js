export default function pageSectionFields({
	textSettingsLabel = "Section Text",
	background = "inherit",
	color = "inherit",
	layout = "Centered",
	title = "Brand content that builds trust",
	subtitle = "With over 20 years of knowledge, we use emerging technologies to solve problems and shape the behaviors for the artistry squeeze.",
	buttonOne = "Get started",
	buttonTwo = "Learn more",
} = {}) {
	return {
		background: {
			type: "color",
			defaultValue: background,
		},
		color: {
			type: "radio",
			choices: ["inherit", "black", "white"],
			defaultValue: color,
		},
		sectionText: {
			label: textSettingsLabel,
			type: "settings",
			fields: {
				layout: {
					type: "radio",
					choices: ["Regular", "Centered", "Horizontal"],
				},
				title: "markdown",
				subtitle: "markdown",
				buttonOne: "button",
				buttonTwo: "button",
			},
			defaultValue: {
				layout,
				title,
				subtitle,
				buttonOne: {
					label: buttonOne || "Get started",
					appPage: false,
					url: "#",
					style: "Outline",
					useAppColor: false,
					hidden: !buttonOne,
				},
				buttonTwo: {
					label: buttonTwo || "Learn more",
					appPage: false,
					url: "#",
					style: "Filled",
					useAppColor: true,
					hidden: !buttonTwo,
				},
			},
		},
	};
}
