import { ChevronRightIcon } from "@heroicons/react/24/outline";
import SpotlightListItem from "./SpotlightListItem";
import { camelCaseToSentenceCase } from "~/utils";
import { useSpotlightContext } from "../SpotlightContext";

export default function SpotlightNavigationButton({ label, page, ...props }) {
	const { pushSpotlightPage } = useSpotlightContext();

	const handleClick = async () => {
		pushSpotlightPage({
			// secondaryAction: "Submit",
			// secondaryActionType: "danger",
			// confirmText: "Delete",
			// title: "Edit Links",
			type: "detail",
			// content,
			...(page || {}),
		});
	};

	return (
		<SpotlightListItem
			trailing={
				<ChevronRightIcon className="w-4 opacity-40" strokeWidth={2} />
			}
			{...props}
			label={camelCaseToSentenceCase(label)}
			value={label}
			onSelect={handleClick}
		/>
	);
}
