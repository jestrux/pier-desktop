export default function inlineListSection() {
	return {
		index: 0,
		platform: "mobile",
		type: "inlineListSection",
		name: "Inline List Section",
		fields: {
			text: {
				optional: true,
				type: "object",
				fields: {
					title: { type: "text", optional: true },
					subtitle: { type: "text", optional: true },
				},
				defaultValue: {
					title: "Apartments",
					subtitle:
						"The little things that actually boost your energy.",
				},
			},
			layout: {
				type: "settings",
				defaultValue: {
					inset: true,
					imageShape: "circle",
				},
				fields: {
					inset: "boolean",
					imageShape: {
						type: "radio",
						label: "Image Shape",
						choices: ["square", "rectangle", "circle"],
					},
					imageSize: {
						type: "radio",
						label: "Image Size",
						choices: ["xsmall", "small", "regular", "large"],
					},
				},
			},
			data: {
				type: "table",
				defaultValue: [
					{
						image: "https://images.unsplash.com/photo-1589156215870-a324614b3fff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDV8fGJsYWNrJTIwZ2lybHxlbnwwfHx8fDE2OTgwNzgzNDN8MA&ixlib=rb-4.0.3&q=80&w=900",
						title: "Lianna Dumei",
						subtitle: "Marketing lead, KPMG",
					},
					{
						image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDF8fGJsYWNrJTIwd29tYW58ZW58MHx8fHwxNjk4MDc3OTEyfDA&ixlib=rb-4.0.3&q=80&w=900",
						title: "Edna Saul",
						subtitle: "Chief strategist, Kalope",
					},
					{
						image: "https://images.unsplash.com/photo-1611432579699-484f7990b127?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDM1fHxibGFjayUyMHdvbWFufGVufDB8fHx8MTY5ODA3ODEyNXww&ixlib=rb-4.0.3&q=80&w=900",
						title: "Tina Fey",
						subtitle: "Owner, Fey Consultants",
					},
				],
				fields: {
					image: "image",
					title: "text",
					subtitle: { type: "text", optional: true },
				},
			},
		},
	};
}
