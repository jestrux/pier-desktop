export default function inlineGridSection() {
	return {
		index: 2,
		platform: "mobile",
		type: "inlineGridSection",
		name: "Inline Grid Section",
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
			gridLayout: {
				type: "settings",
				defaultValue: {
					aspectRatio: "portrait",
					overlayText: false,
				},
				fields: {
					aspectRatio: {
						type: "radio",
						label: "Aspect Ratio",
						choices: ["portrait", "landscape", "square"],
					},
					overlayText: "boolean",
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
					subtitle: "text",
				},
			},
		},
	};
}
