import SpotlightListItem from "../SpotlightComponents/SpotlightListItem";
import { useSpotlightContext } from "../SpotlightContext";

export default function EditBanner() {
	const { pierAppData, addSection, editSection } = useSpotlightContext();
	const banner = pierAppData.pageProps.banner;

	return (
		<SpotlightListItem
			value="Page Banner"
			onSelect={() =>
				banner ? editSection(banner) : addSection("banner")
			}
			trailing={SpotlightListItem.NavIcon}
		/>
	);
}
