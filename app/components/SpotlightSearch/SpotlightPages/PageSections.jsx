import { ChevronRightIcon } from "@heroicons/react/24/outline";
import SpotlightListItem from "../SpotlightComponents/SpotlightListItem";
import SpotlightListSection from "../SpotlightComponents/SpotlightListSection";
import { useSpotlightContext } from "../SpotlightContext";
import AddSection from "./AddSection";

export default function PageSections() {
	const { pierAppData, editSection } = useSpotlightContext();

	if (!pierAppData?.pageProps) return;

	const { banner, appBar } = pierAppData.pageProps;
	const sections = pierAppData.sections.filter(
		({ id }) => ![banner?.id, appBar.id].includes(id)
	);

	return (
		<SpotlightListSection title="Page sections">
			{sections.map((section) => (
				<SpotlightListItem
					key={section.id}
					label={section.name}
					value={section.id}
					onSelect={() => editSection(section)}
					trailing={
						<ChevronRightIcon
							className="w-4 opacity-40"
							strokeWidth={2}
						/>
					}
				/>
			))}

			<AddSection />
		</SpotlightListSection>
	);
}
