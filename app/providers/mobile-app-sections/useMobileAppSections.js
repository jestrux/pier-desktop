import * as mobileAppSections from "./sections";

export default function useMobileAppSections() {
	return {
		sections: mobileAppSections,
		getSection: (type) => {
			const section = mobileAppSections[type];
			return typeof section == "function" ? section() : null;
		},
		sectionArray: Object.values(mobileAppSections)
			.map((section) => section())
			.sort((a, b) => a.index - b.index),
	};
}
