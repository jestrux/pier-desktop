import { useSpotlightContext } from "../SpotlightContext";
import SpotlightListItem from "../SpotlightComponents/SpotlightListItem";

export default function EditFooter() {
	const { pierAppData, addSection, editSection } = useSpotlightContext();
	const footer = pierAppData.pageProps.footer;

	return (
		<SpotlightListItem
			value="App Footer"
			onSelect={() =>
				footer ? editSection(footer) : addSection("footer", "app")
			}
			trailing={SpotlightListItem.NavIcon}
		/>
	);
}
