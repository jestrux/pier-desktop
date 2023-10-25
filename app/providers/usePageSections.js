import { useSpotlightContext } from "~/components/SpotlightSearch/SpotlightContext";
import * as websiteSections from "./website-sections";
import * as mobileAppSections from "./mobile-app-sections";
import * as adminPanelSections from "./admin-panel-sections";

export default function usePageSections() {
	const { pierAppData } = useSpotlightContext();
	let sections = {
		website: websiteSections,
		mobileApp: mobileAppSections,
		adminPanel: adminPanelSections,
	}[pierAppData?.app?.type ?? "website"];

	return {
		sections,
		getSection: (type) => {
			const section = sections[type];
			return typeof section == "function" ? section() : null;
		},
		sectionArray: Object.values(sections)
			.map((section) => section())
			.sort((a, b) => a.index - b.index),
	};
}
