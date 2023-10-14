import { useRef, useState } from "react";
import { Combobox } from "~/components/reach-combobox";
import Modal from "~/components/Modal";

import SpotlightPageContent from "./SpotlightPageContent";
import { SpotlightPageProvider } from "./SpotlightPageContext";

export default function SpotlightSearchPage({
	placeholder = "Type to search actions",
	open,
	onClose,
	onPop,
	onPopAll,
	children,
	page,
	dragProps,
	// ...props
}) {
	const spotlightPageWrapperRef = useRef();
	const [searchTerm, setSearchTerm] = useState("");
	const [navigationValue, setNavigationValue] = useState(null);

	const handleSelect = (value) => {
		document.dispatchEvent(
			new CustomEvent("spotlight-search-value-changed", {
				detail: {
					page,
					value,
				},
			})
		);

		const selected = spotlightPageWrapperRef.current.querySelector(
			`[data-reach-combobox-option][data-value="${value}"]`
		);

		if (selected) selected.dispatchEvent(new CustomEvent("on-select"));
	};

	const [lastStateUpdate, setLastUpdate] = useState(Date.now());
	let spotlightState = useRef({});
	const setSpotlightState = (newValue) => {
		spotlightState.current = { ...spotlightState.current, ...newValue };
		setLastUpdate(Date.now());
	};

	const comboProps = {
		placeholder,
		searchTerm,
		setSearchTerm,
		setNavigationValue,
		spotlightState,
		open,
		page,
		onClose,
		onPop,
		onPopAll,
	};

	return (
		<Modal
			isOpen={open}
			onClose={onClose}
			label={placeholder}
			showOverlayBg={false}
			dragProps={dragProps}
		>
			<SpotlightPageProvider
				value={{
					page,
					setSpotlightState,
					spotlightState: spotlightState.current,
					lastStateUpdate,
					searchTerm,
					navigationValue,
				}}
			>
				<Combobox
					ref={spotlightPageWrapperRef}
					id="spotlightSearchWrapper"
					aria-label="Cities"
					className="w-full"
					openOnFocus
					onSelect={handleSelect}
				>
					<SpotlightPageContent {...comboProps}>
						{children}
					</SpotlightPageContent>
				</Combobox>
			</SpotlightPageProvider>
		</Modal>
	);
}
