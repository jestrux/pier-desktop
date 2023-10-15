import useWebsiteSections from "~/providers/website-sections/useWebsiteSections";
import SpotlightNavigationButton from "../SpotlightComponents/SpotlightNavigationButton";
import { useSpotlightContext } from "../SpotlightContext";
import { useFetcher } from "@remix-run/react";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddSection() {
	const { pierAppData, editSection } = useSpotlightContext();
	const fetcher = useFetcher();
	const { sections, sectionArray } = useWebsiteSections();

	const handleAddSection = async (type) => {
		if (!type || typeof sections[type] != "function") return;

		const section = sections[type]();
		const defaultFields = Object.entries(section.fields).filter(
			([, field]) => field.defaultValue != undefined
		);
		const defaultValues = defaultFields.reduce(
			(agg, [fieldName, field]) => {
				return {
					...agg,
					...(["object", "form", "settings"].includes(field.type)
						? field.defaultValue
						: { [fieldName]: field.defaultValue }),
				};
			},
			{}
		);

		const payload = {
			name: section.name,
			type: section.type,
			settings: JSON.stringify(defaultValues),
			pageId: pierAppData.currentPage.id,
		};

		document.addEventListener(
			"pier:app-data-changed",
			listenForNewEntry,
			false
		);

		fetcher.submit(payload, {
			method: "post",
			action: "/app",
		});
	};

	const listenForNewEntry = (e) => {
		editSection(e.detail.sections.at(-1));

		document.removeEventListener(
			"pier:app-data-changed",
			listenForNewEntry,
			false
		);
	};

	return (
		<SpotlightNavigationButton
			className="text-primary"
			leading={<PlusIcon width={20} />}
			label="Add Section"
			page={{
				title: "Add Section",
				type: "select",
				fields: sectionArray.map(({ type, name }) => ({
					label: name,
					value: type,
				})),
			}}
			onPop={handleAddSection}
		/>
	);
}
