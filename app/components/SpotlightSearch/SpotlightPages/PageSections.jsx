import { PlusIcon } from "@heroicons/react/24/outline";
import SpotlightListItem from "../SpotlightComponents/SpotlightListItem";
import SpotlightListSection from "../SpotlightComponents/SpotlightListSection";
import SpotlightNavigationButton from "../SpotlightComponents/SpotlightNavigationButton";
import { useSpotlightContext } from "../SpotlightContext";
import useWebsiteSections from "~/providers/website-sections/useWebsiteSections";

export default function PageSections() {
	const { pierAppData, addSection, editSection } = useSpotlightContext();
	const { sectionArray } = useWebsiteSections();

	if (!pierAppData?.pageProps) return;

	const { banner, appBar, footer } = pierAppData.pageProps;
	const sections = pierAppData.sections.filter(
		({ id }) => ![banner?.id, appBar?.id, footer?.id].includes(id)
	);

	return (
		<SpotlightListSection title="Page sections">
			{sections.map((section) => (
				<SpotlightListItem
					key={section.id}
					label={section.name}
					value={section.id}
					onSelect={() => editSection(section)}
					trailing={SpotlightListItem.NavIcon}
				/>
			))}

			<SpotlightNavigationButton
				className="text-primary"
				leading={<PlusIcon width={20} />}
				label="Add Section"
				page={{
					title: "Add Section",
					type: "select",
					fields: sectionArray
						.filter(
							({ type }) =>
								!["appBar", "banner", "footer"].includes(type)
						)
						.map(({ type, name }) => ({
							label: name,
							value: type,
						})),
				}}
				onPop={addSection}
			/>
		</SpotlightListSection>
	);
}
