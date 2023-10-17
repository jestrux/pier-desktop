import SpotlightListItem from "../SpotlightComponents/SpotlightListItem";
import { useSpotlightContext } from "../SpotlightContext";

export default function EditAppBar() {
	const { pierAppData, addSection, editSection } = useSpotlightContext();
	const appBar = pierAppData.pageProps.appBar;

	return (
		<SpotlightListItem
			value="App NavBar"
			onSelect={() =>
				appBar ? editSection(appBar) : addSection("appBar", "app")
			}
			trailing={SpotlightListItem.NavIcon}
		/>
	);
}
