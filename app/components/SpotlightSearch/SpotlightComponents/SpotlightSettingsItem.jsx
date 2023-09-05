import { useRef } from "react";
import { Switch } from "@chakra-ui/react";
import Menu from "~/components/Menu";
// import FieldEditor from "@/Commands/CommandPages/FieldEditor";
import { useSpotlightContext } from "~/components/SpotlightSearch/SpotlightContext";
// import PickColor from "@/Commands/CommandPages/PickColor";
// import ImagePicker from "@/Commands/CommandPages/ImagePicker";
import {
	buttonEditorListProps,
	camelCaseToSentenceCase,
	randomId,
} from "~/utils";
import SpotlightListItem from "./SpotlightListItem";
import { useSpotlightPageState } from "../SpotlightSearchPage/SpotlightPageContext";

const SettingsTrailing = ({ field = {}, onChange }) => {
	let { type, value, choices } = field;

	if (type == "boolean")
		return <Switch colorScheme="primary" size="md" isChecked={value} />;
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
		const { type, label, value, ...otherProps } = field;
		const title = "Edit " + label;
		let newValue = null;

		if (type == "radio")
			return el.current.querySelector(`#menuTriggerButton`).click();

		// if (type == "form") {
		//     newValue = await pushSpotlightPage({
		//         title,
		//         type: "form",
		//         fields: otherProps.fields,
		//         data: value,
		//     });
		// }

		// if (type == "sectionText") {
		//     newValue = await pushSpotlightPage({
		//         title,
		//         type: "form",
		//         fields: {
		//             title: "markdown",
		//             subtitle: "markdown",
		//         },
		//         data: value,
		//     });
		// }

		// if (type == "image") {
		//     newValue = await pushSpotlightPage({
		//         type: "action",
		//         title,
		//         content: <ImagePicker value={value} />,
		//     });
		// }

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

		// if (type == "buttons") {
		//     const [pageProps, editorProps] = buttonEditorListProps({
		//         buttons: value,
		//         pierAppData.app,
		//         onSave: (newValue) => handleChange(newValue),
		//     });

		//     newValue = await pushSpotlightPage({
		//         title,
		//         ...pageProps,
		//         content: <FieldEditor {...editorProps} />,
		//     });
		// }

		if (newValue?.fromSecondaryAction) newValue = newValue.data;

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
