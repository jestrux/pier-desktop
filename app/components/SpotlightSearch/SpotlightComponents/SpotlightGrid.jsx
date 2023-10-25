import { useRef } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import useKeyDetector from "~/hooks/useKeyDetector";
import { useComboboxContext } from "~/components/reach-combobox";
import SpotlightListSection from "./SpotlightListSection";
import SpotlightListItem from "./SpotlightListItem";
import { useSpotlightPageContext } from "../SpotlightSearchPage/SpotlightPageContext";

const chunkArray = (a, perChunk) =>
	a.reduce((all, entry, i) => {
		const chunk = Math.floor(i % perChunk);
		all[chunk] = [...all[chunk], all[chunk].length + 1];
		return all;
	}, Array(perChunk).fill([]));

export default function SpotlightGrid({
	children,
	choices = [],
	columns: chunks = 4,
	aspectRatio = "1/1.3",
	onSubmit,
	onSelect,
	onChange,
}) {
	const { transition } = useComboboxContext();
	const currentColumnRef = useRef(0);
	const navValue = useRef(1);
	const [currentColumn, setCurrentColumn] = useState(0);
	const columns = chunkArray(choices, chunks);
	const { onChange: onItemFocused } = useSpotlightPageContext();
	const rows = Math.max(...columns.map((col) => col.length));

	onItemFocused((value) => {
		navValue.current = value;
		if (typeof onChange == "function")
			onChange(choices[currentColumn * rows + value - 1]);
	});

	const handleSetCurrentColumn = (newValue, direction) => {
		if (!navValue?.current) {
			setCurrentColumn(direction == "back" ? columns.length - 1 : 0);
			transition("NAVIGATE", {
				value: 1,
			});
			return;
		}

		const columnsInRow = columns.filter(
			(column) => column[navValue.current - 1]
		);
		const max = columnsInRow.length - 1;
		if (newValue > max) newValue = 0;
		if (newValue < 0) newValue = max;

		currentColumnRef.current = newValue;

		onChange(choices[newValue * rows + navValue.current - 1]);

		ReactDOM.flushSync(() => {
			setCurrentColumn(newValue);
		});
	};

	useKeyDetector({
		key: "ArrowLeft",
		action: () =>
			handleSetCurrentColumn(currentColumnRef.current - 1, "back"),
	});

	useKeyDetector({
		key: "ArrowRight",
		action: () => handleSetCurrentColumn(currentColumnRef.current + 1),
	});

	if (typeof onSubmit == "function") {
		onSubmit(() => {
			if (typeof onSelect == "function")
				onSelect(choices[currentColumn * rows + navValue.current - 1]);
		});
	}

	const handleSelect = (value) => {
		if (typeof onSelect == "function")
			onSelect(choices[currentColumn * rows + value - 1]);
	};

	return (
		<div
			className="grid p-1 mt-0.5"
			style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
		>
			{columns.map((entries, i) => (
				<SpotlightListSection key={i}>
					<div className="flex flex-col">
						{entries.map((entry, index) => (
							<SpotlightListItem
								className="w-full spotlight-grid-item"
								key={i + "inner" + index}
								value={currentColumn == i ? entry : undefined}
								onSelect={handleSelect}
								leading={null}
								trailing={null}
							>
								{() => (
									<div className="p-1">
										<div
											className="relative"
											style={{ aspectRatio }}
										>
											{children(
												choices[i * rows + index]
											)}
										</div>
									</div>
								)}
							</SpotlightListItem>
						))}
					</div>
				</SpotlightListSection>
			))}
		</div>
	);
}
