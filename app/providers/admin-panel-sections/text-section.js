export default function textSection() {
	return {
		index: 1,
		type: "textSection",
		name: "Text Section",
		fields: {
			background: {
				type: "color",
				defaultValue: "inherit",
			},
			color: {
				type: "radio",
				choices: ["inherit", "black", "white"],
				defaultValue: "inherit",
			},
			layout: {
				label: "Layout",
				type: "radio",
				choices: ["Regular", "Centered"],
				defaultValue: "Centered",
			},
			text: {
				optional: true,
				type: "object",
				fields: {
					title: "markdown",
					subtitle: "markdown",
				},
				defaultValue: {
					title: "Ten remote productivity hacks and tricks",
					subtitle:
						"The little things that actually boost your energy and keep you going through your work day.",
				},
			},
			buttonOne: {
				type: "button",
				optional: true,
			},
			buttonTwo: {
				type: "button",
				optional: true,
				defaultValue: {
					label: "Learn more",
					appPage: false,
					url: "#",
					style: "Filled",
					useAppColor: true,
					hidden: false,
				},
			},
		},
	};
}
