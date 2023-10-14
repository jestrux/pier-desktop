import PierFormField from "~/components/PierFormField";
import { useRef } from "react";
import { parseFields } from "~/utils";
import { useSpotlightPageState } from "./SpotlightPageContext";
import { useSpotlightContext } from "../SpotlightContext";

export default function FormPage({ page, onSubmit }) {
	const fields = parseFields(page.fields, page.values);
	const [data, setData] = useSpotlightPageState(
		"data",
		Object.entries(page.fields).reduce((agg, [key, { defaultValue }]) => {
			if (defaultValue && agg[key] == undefined) agg[key] = defaultValue;
			return agg;
		}, page.values || {})
	);
	const { popCurrentSpotlightPage } = useSpotlightContext();

	const submitButtonRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let newData = fields.reduce((agg, field) => {
			const formField = e.target[field.name];

			if (!formField) return agg;

			const value =
				field.type == "boolean" ? formField?.checked : formField?.value;

			agg = { ...agg, [field.name]: value };

			return agg;
		}, {});
		const fieldKeys = Object.keys(page.fields);
		const mergedValues = Object.entries(page.values || {}).reduce(
			(agg, [key, value]) => {
				if (!fieldKeys.includes(key)) agg[key] = value;

				return agg;
			},
			newData
		);

		Object.entries(mergedValues).forEach(([key, value]) => {
			if (value == undefined) delete mergedValues[key];
		});

		if (typeof page.onSave == "function") {
			try {
				const res = await page.onSave(mergedValues);
				popCurrentSpotlightPage(res);
			} catch (error) {
				console.log("Save error: ", error);
			}
		} else {
			popCurrentSpotlightPage(mergedValues);
		}
	};

	if (typeof onSubmit == "function") {
		onSubmit(() => {
			submitButtonRef.current.click();
		});
	}

	return (
		<form id="theForm" onSubmit={handleSubmit}>
			<div className="px-4 mt-5 mb-6 flex flex-col gap-5">
				{fields.map((field, key) => {
					if (field.show && !field.show(data)) return;

					return (
						<PierFormField
							key={key}
							field={field}
							onChange={(newProps) =>
								setData({ ...data, ...newProps })
							}
						/>
					);
				})}
			</div>

			<button ref={submitButtonRef} type="submit" className="hidden" />
		</form>
	);
}
