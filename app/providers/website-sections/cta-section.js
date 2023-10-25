import textSection from "./text-section";

export default function ctaSection() {
	const section = {
		...textSection(),
		index: 5,
		type: "ctaSection",
		name: "Cta Section",
	};

	delete section.fields.layout;

	return section;
}
