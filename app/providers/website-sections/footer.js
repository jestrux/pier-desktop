export const defaultSettings = {
	background: "black",
	color: "white",
};

export default function footer() {
	return {
		index: 100,
		type: "footer",
		name: "Global Footer",
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
		},
		defaultValues: defaultSettings,
	};
}
