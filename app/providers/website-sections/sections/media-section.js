import textSection from "./text-section";

export default function mediaSection() {
	const section = {
		...textSection(),
		index: 2,
		type: "mediaSection",
		name: "Media Section",
	};

	section.fields = {
		...section.fields,
		image: {
			type: "image",
			defaultValue:
				"https://images.unsplash.com/photo-1682685796063-d2604827f7b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwxfDF8YWxsfDI2fHx8fHx8Mnx8MTY5NzM2MDg0NXw&ixlib=rb-4.0.3&q=80&w=800",
		},
	};

	return section;
}
