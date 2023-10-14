import { useRef } from "react";
import { Switch } from "@chakra-ui/react";
import Menu from "~/components/Menu";
// import FieldEditor from "@/Commands/CommandPages/FieldEditor";
import { useSpotlightContext } from "~/components/SpotlightSearch/SpotlightContext";
// import PickColor from "@/Commands/CommandPages/PickColor";
import { camelCaseToSentenceCase, onEditButton, randomId } from "~/utils";
import SpotlightListItem from "./SpotlightListItem";
import { useSpotlightPageState } from "../SpotlightSearchPage/SpotlightPageContext";

const SettingsTrailing = ({ field = {}, onChange }) => {
	let { type, value, choices } = field;

	if (type == "boolean")
		return (
			<Switch
				id="switchItem"
				colorScheme="primary"
				size="md"
				defaultChecked={value}
				onChange={(e) => onChange(e.target.checked)}
			/>
		);
	if (type == "radio") {
		return (
			<Menu plain choices={choices} value={value} onChange={onChange} />
		);
	}
	if (type == "image") {
		return (
			<img
				className="max-h-6 max-w-[100px] object-cover object-left rounded-sm"
				src={value}
				alt=""
			/>
		);
	}
	if (type == "color") {
		return (
			<span
				className="w-6 h-6 block rounded-full border"
				style={{
					background: value,
				}}
			></span>
		);
	}

	let preview = "Click to edit";

	if (value) {
		if (type == "sectionText") preview = `${value.title} ${value.subtitle}`;
		if (type == "buttons") {
			preview =
				value
					.filter(({ hidden }) => !hidden)
					.map(({ label }) => label)
					.join(", ") || "Hidden (click to show)";
		}
	}

	return <div className="truncate opacity-40 max-w-xs">{preview}</div>;
};

export default function SpotlightSettingsItem({
	onChange = () => {},
	...props
}) {
	const ref = useRef("ref" + randomId());
	const el = useRef();
	const { pushSpotlightPage, pierAppData } = useSpotlightContext();
	const [field, setField] = useSpotlightPageState(
		ref.current,
		props.field || {
			...props,
			type: "boolean",
			value: props.checked,
		}
	);

	const handleChange = (newValue) => {
		setField({ ...field, value: newValue });
		onChange(newValue);
	};

	const editField = async () => {
		const { type, fields, label, value, ...otherProps } = field;
		const title = "Edit " + label;
		let newValue = null;

		if (type == "radio")
			return el.current.querySelector(`#menuTriggerButton`).click();

		if (type == "boolean")
			return el.current.querySelector(`#switchItem`).click();

		if (type == "object") {
			const res = await pushSpotlightPage({
				title,
				type: "form",
				fields,
				values: props.values,
			});

			newValue = Object.fromEntries(
				Object.entries(res).filter(([key]) =>
					Object.keys(fields).includes(key)
				)
			);
		}

		if (type == "button") {
			newValue = await pushSpotlightPage({
				...onEditButton(pierAppData.app, value),
				title,
			});
		}

		// if (type == "form") {
		//     newValue = await pushSpotlightPage({
		//         title,
		//         type: "form",
		//         fields: otherProps.fields,
		//         values: value,
		//     });
		// }

		if (type == "image") {
			newValue = await pushSpotlightPage({
				type: "image",
				title,
				value,
			});

			console.log("New value: ", newValue);
		}

		// if (type == "color") {
		//     newValue = await pushSpotlightPage({
		//         type: "action",
		//         title,
		//         secondaryAction: "Transparent",
		//         onSecondaryAction: () => "inherit",
		//         content: (
		//             <PickColor
		//                 value={value}
		//                 pickGradient={otherProps.pickGradient ?? true}
		//             />
		//         ),
		//     });
		// }

		if (newValue?.fromSecondaryAction) newValue = newValue.data;

		// console.log("New value: ", newValue);

		if (newValue != null && newValue != undefined) handleChange(newValue);
	};

	return (
		<div ref={el}>
			<SpotlightListItem
				label={camelCaseToSentenceCase(field.label)}
				value={camelCaseToSentenceCase(field.label)}
				onSelect={
					props.field ? editField : () => handleChange(!field.value)
				}
				trailing={
					<SettingsTrailing field={field} onChange={handleChange} />
				}
			/>
		</div>
	);
}
