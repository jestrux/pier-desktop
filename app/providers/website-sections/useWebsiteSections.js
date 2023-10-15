import * as websiteSections from "./sections";

export default function useWebsiteSections() {
	return {
		sections: websiteSections,
		getSection: (type) => {
			const section = websiteSections[type];
			return typeof section == "function" ? section() : null;
		},
		sectionArray: Object.values(websiteSections)
			.map((section) => section())
			.sort((a, b) => a.index - b.index),
	};
}
