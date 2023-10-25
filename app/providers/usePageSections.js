import * as websiteSections from "./website-sections";
import * as mobileAppSections from "./mobile-app-sections";
import * as adminPanelSections from "./admin-panel-sections";

export default function usePageSections(type = "website") {
	let sections = {
		website: websiteSections,
		mobileApp: mobileAppSections,
		adminPanel: adminPanelSections,
	}[type];

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
