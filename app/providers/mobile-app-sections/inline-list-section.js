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
					imageShape: "square",
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
						image: "https://images.unsplash.com/photo-1696671296367-1549e8236fe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8YWxsfDEzfHx8fHx8Mnx8MTY5NzM2MDg0NXw&ixlib=rb-4.0.3&q=80&w=900",
						title: "Some title",
						subtitle:
							"A really long ass description will go here and make some noise",
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
