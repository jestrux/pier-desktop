import pageSectionFields from "./pageSectionFields";

export default function mediaSection() {
	const section = {
		index: 2,
		type: "mediaSection",
		name: "Media Section",
	};

	const fields = {
		...pageSectionFields({
			background: "#F2F2F2",
			color: "black",
			title: "Unwind in luxe",
			subtitle:
				"With over 20 years of knowledge, we use emerging technologies to solve problems and shape the behaviors of tomorrow. We’ve taken the time to study every part of the industry and have the process down pat.\n\nWe’re very passionate and take a lot of pride in everything we do and that's clear in the meticulous care into every little detail.",
			layout: "Regular",
			buttonOne: "See all available activities",
			buttonTwo: null, //"Book a tour",
		}),
	};

	section.fields = {
		...fields,
		image: {
			type: "image",
			defaultValue:
				"https://images.unsplash.com/photo-1682685796063-d2604827f7b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwxfDF8YWxsfDI2fHx8fHx8Mnx8MTY5NzM2MDg0NXw&ixlib=rb-4.0.3&q=80&w=800",
		},
		flipped: "boolean",
	};

	return section;
}
