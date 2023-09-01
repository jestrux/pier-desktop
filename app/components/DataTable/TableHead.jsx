import centeredFields from "./centeredFields";

export default function TableHead({ field, isFirst }) {
	let width;

	if (field.type == "image") width = field.meta.face ? 100 : 100;

	return (
		<th
			className={`text-sm py-0 truncate border-b border-content/30
				${centeredFields.includes(field.type) ? "text-center" : "text-left"}
			`}
			style={{ width }}
		>
			<span className={isFirst ? "pl-1" : ""}>
				{field.label.replace("_", " ")}
			</span>
		</th>
	);
}
