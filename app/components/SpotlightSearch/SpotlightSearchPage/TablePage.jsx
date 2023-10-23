import { parseFields } from "~/utils";
import SpotlightListItem from "../SpotlightComponents/SpotlightListItem";
import { useSpotlightContext } from "../SpotlightContext";
import { PlusIcon } from "@heroicons/react/24/outline";
import SpotlightNavigationButton from "../SpotlightComponents/SpotlightNavigationButton";
import { useState } from "react";

export default function TablePage({ page }) {
	const { pushSpotlightPage } = useSpotlightContext();
	const { fields: _fields, values: _values, onChange } = page;
	const [values, setValues] = useState(_values);
	const fields = parseFields(_fields, values);
	const editRow = async (row, index) => {
		const res = await pushSpotlightPage({
			title: "Edit Row",
			type: "form",
			fields: page.fields,
			values: row,
			secondaryAction: {
				label: "Remove row",
				destructive: true,
				confirmText: "Remove",
				onClick: () => onRemoveRow(index),
			},
		});

		if (res && !res.fromSecondaryAction) {
			const newValues = values.map((v, i) => {
				if (i == index) return res;
				return v;
			});
			setValues(newValues);
			onChange(newValues);
			console.log("On edit row: ", res);
		}
	};

	const onRemoveRow = async (index) => {
		const newValues = values.filter((_, i) => i != index);
		setValues(newValues);
		onChange(newValues);
		return true;
	};

	const onAddRow = async (row) => {
		if (row) {
			const newValues = [...values, row];
			setValues(newValues);
			onChange(newValues);
		}
	};

	return (
		<>
			<div
				className="bg-content/[0.03] border-b grid divide-x divide-content/10"
				style={{
					gridTemplateColumns: Array(fields.length)
						.fill("1fr")
						.join(" "),
				}}
			>
				{fields.map((field, index) => (
					<div key={index} className="p-3 capitalize font-bold">
						{field.label}
					</div>
				))}
			</div>

			<div className="divide-y divide-content/10">
				{values.map((row, index) => (
					<SpotlightListItem
						key={index}
						value={index + 1}
						replace
						onSelect={() => editRow(row, index)}
					>
						<div
							className="-mx-4 grid divide-x divide-content/10"
							style={{
								gridTemplateColumns: Array(fields.length)
									.fill("1fr")
									.join(" "),
							}}
						>
							{fields.map((field, index) => (
								<div key={index} className="p-3 truncate">
									{row[field.label]}
								</div>
							))}
						</div>
					</SpotlightListItem>
				))}

				<SpotlightNavigationButton
					replace
					className="text-primary"
					label="Add Row"
					page={{
						title: "Add Row",
						type: "form",
						fields: page.fields,
					}}
					onPop={onAddRow}
				>
					<div className="flex justify-center items-center w-full gap-2">
						<PlusIcon width={20} /> Add Row
					</div>
				</SpotlightNavigationButton>
			</div>
		</>
	);
}
