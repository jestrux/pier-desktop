import { objectFieldChoices } from "~/utils";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useSpotlightContext } from "../SpotlightContext";
import {
	useSpotlightPageContext,
	useSpotlightPageState,
} from "../SpotlightSearchPage/SpotlightPageContext";
import SpotlightListSection from "./SpotlightListSection";
import SpotlightListItem from "./SpotlightListItem";

export function ListPickerComponent({
	choices = [],
	children,
	leading,
	trailing,
	onSelect,
	onSubmit,
	multiple,
	...props
}) {
	const { popCurrentSpotlightPage } = useSpotlightContext();
	const [value, setValue] = useSpotlightPageState("value", props.value);

	const handleSelect = (selectedChoice) => {
		if (!multiple) onSelect(selectedChoice);
		else {
			if (value.includes(selectedChoice)) {
				setValue(value.filter((choice) => choice != selectedChoice));
			} else setValue([...value, selectedChoice]);
		}
	};

	if (typeof onSubmit == "function") {
		onSubmit(() => {
			popCurrentSpotlightPage(value);
		});
	}

	const { onChange } = useSpotlightContext();
	onChange(props.onChange);

	return (
		<SpotlightListSection>
			{objectFieldChoices(choices).map((choice) => {
				const selected = multiple
					? value?.includes(choice.label)
					: value?.toString().toLowerCase() ==
					  choice.label?.toLowerCase();
				return (
					<SpotlightListItem
						key={choice.tempId}
						value={choice.label}
						onSelect={handleSelect}
						leading={
							typeof leading == "function"
								? leading(choice.label)
								: leading
						}
						trailing={
							trailing != undefined ? (
								trailing
							) : selected ? (
								<CheckCircleIcon
									className="text-primary"
									width={24}
								/>
							) : (
								<svg
									width={20}
									className="opacity-30 mr-0.5"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<circle cx="12" cy="12" r="10"></circle>
								</svg>
							)
						}
						label={choice.label}
					>
						{typeof children == "function" &&
							children(choice.label, selected)}
					</SpotlightListItem>
				);
			})}
		</SpotlightListSection>
	);
}

export function ListPickerPage(props) {
	const handleSelect = (value) => {
		popCurrentSpotlightPage(value);
	};
	const { popCurrentSpotlightPage } = useSpotlightPageContext();

	return <ListPickerComponent {...props} onSelect={handleSelect} />;
}
