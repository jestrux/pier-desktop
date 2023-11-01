import { parseFields } from "~/utils";
import pageSectionFields from "./pageSectionFields";

export default function ctaSection() {
	let { sectionText, ...fields } = pageSectionFields({
		background: "#F2F2F2",
		color: "black",
		title: "Ready to get started?",
		subtitle:
			"Join many others like you jumping in and joining our movement.",
		layout: "Horizontal",
		buttonOne: "Make a donation",
		buttonTwo: "Partner with us",
	});

	fields = {
		...fields,
		inset: "boolean",
		...Object.fromEntries(
			parseFields(sectionText.fields, sectionText.defaultValue).reduce(
				(agg, _field) => {
					// eslint-disable-next-line no-unused-vars
					const { __id, label, value, name, ...field } = _field;
					return [...agg, [name, field]];
				},
				[]
			)
		),
	};

	return {
		index: 5,
		type: "ctaSection",
		name: "Cta Section",
		fields,
	};
}
