import { parseFields } from "~/utils";
import SpotlightSettingsItem from "../SpotlightComponents/SpotlightSettingsItem";

export default function SettingsPage({ page }) {
	const { fields: _fields, values, onChange } = page;
	const fields = parseFields(_fields, values);

	const handleChange = (field, value) => {
		return onChange(
			field.type == "object" ? value : { [field.name]: value }
		);
	};

	return (
		<>
			{fields.map((field, index) => (
				<SpotlightSettingsItem
					key={index}
					field={field}
					values={values}
					onChange={async (value) => await handleChange(field, value)}
				/>
			))}
		</>
	);
}
