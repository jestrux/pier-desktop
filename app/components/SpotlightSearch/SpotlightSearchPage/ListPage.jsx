import DragDropList from "~/components/DragDropList";
import {
	Bars3Icon,
	CheckCircleIcon,
	PlusIcon,
} from "@heroicons/react/24/solid";
import { useRef } from "react";
import SpotlightListItem from "../SpotlightComponents/SpotlightListItem";
import {
	useSpotlightPageContext,
	useSpotlightPageState,
} from "./SpotlightPageContext";
import { useSpotlightContext } from "../SpotlightContext";
import useFocusCapture from "~/hooks/useFocusCapture";
import { objectFieldChoices } from "~/utils";
import useAlerts from "~/components/Alerts/useAlerts";
import SpotlightListSection from "../SpotlightComponents/SpotlightListSection";

export default function ListPage({ page, ..._props }) {
	const props = {
		addAction: "Add new entry",
		editable: true,
		canAdd: true,
		..._props,
		...(page ?? {}),
	};
	const { captureFocus, restoreFocus } = useFocusCapture();
	const { confirm } = useAlerts();
	const {
		pushSpotlightPage,
		replaceCurrentSpotlightPage,
		popCurrentSpotlightPage,
	} = useSpotlightContext();
	const [fields, setFields] = useSpotlightPageState(
		"value",
		objectFieldChoices(props.value)
	);
	const [fieldBeingEdited, setFieldBeingEdited] =
		useSpotlightPageState("fieldBeingEdited");

	const updateField = (
		fieldId,
		newProps,
		{ replace = false, dontPersist = false } = {}
	) => {
		if (!fieldId) return;

		let newFields;

		if (!newProps)
			newFields = fields.filter(({ tempId }) => tempId != fieldId);
		else if (fieldId == props.addAction)
			newFields = [...fields, { ...newProps, tempId: newProps.label }];
		else
			newFields = fields.map((field) => {
				if (field.tempId == fieldId)
					field = replace ? newProps : { ...field, ...newProps };

				return field;
			});

		setFields(newFields);

		if (!dontPersist && typeof props.onSave == "function")
			props.onSave(newFields);
	};

	const lastSelection = useRef(Date.now());
	const { navigationValue, onSelect, onChange } = useSpotlightPageContext();

	onChange(() => {
		if (Date.now() - lastSelection.current > 50) setFieldBeingEdited(null);
	});

	onSelect(async (value) => {
		lastSelection.current = Date.now();
		const addingNewField = value == props.addAction;
		const field = addingNewField
			? { tempId: props.addAction }
			: fields.find((field) => field.tempId == value);

		if (typeof props.onEdit == "function") {
			const overriddenProps = props.onEdit(addingNewField ? null : field);
			const formProps = {
				type: "form",
				values: field,
				secondaryAction: "Delete",
				secondaryActionType: "danger",
				...overriddenProps,
			};

			if (overriddenProps.data) {
				updateField(value, overriddenProps.data, {
					replace: true,
					dontPersist:
						typeof formProps.onSave == "function" &&
						(addingNewField || !res),
				});
			}

			if (addingNewField) formProps.secondaryAction = null;

			let res = await pushSpotlightPage(formProps);

			if (!res) return;

			if (res.fromSecondaryAction) res = res.data;

			updateField(value, res, {
				replace: true,
				dontPersist:
					typeof formProps.onSave == "function" &&
					(addingNewField || !res),
			});
		} else if (typeof props.onSelect == "function") {
			const newPageProps = props.onSelect(field);

			if (!newPageProps) return popCurrentSpotlightPage(field);

			const navigationAction = newPageProps.replace
				? replaceCurrentSpotlightPage
				: pushSpotlightPage;
			navigationAction(newPageProps);
		} else if (props.editable) {
			captureFocus();
			setFieldBeingEdited(field);
		} else updateField(value, { hidden: !field.hidden });
	});

	if (
		typeof props.onSubmit == "function" &&
		typeof props.onSave != "function"
	) {
		props.onSubmit(() => {
			popCurrentSpotlightPage(
				typeof props.value[0] == "object"
					? fields
					: fields.map(({ label }) => label)
			);
		});
	}

	if (
		typeof props.secondaryAction?.onClick == "function" &&
		typeof props.onSecondaryAction == "function" &&
		typeof props.onSave == "function"
	) {
		props.onSecondaryAction(async () => {
			const { label, destructive, confirmText, onClick } =
				props.secondaryAction;

			if (destructive) {
				const res = await confirm({
					title: label + "?",
					actionType: "danger",
					okayText: confirmText || "Yes, Continue",
				});

				if (!res) return;
			}

			const newFields = await onClick(fields);

			if (newFields == undefined) return;

			setFields(newFields);
			props.onSave(newFields);
			popCurrentSpotlightPage();
		});
	}

	const handleSetFields = (fields) => {
		setFields([]);

		requestAnimationFrame(() => {
			setFields(fields);

			if (typeof props.onReorder == "function") props.onReorder(fields);
		});
	};

	const handleUpdateFieldValue = (e) => {
		e.preventDefault();

		updateField(
			fieldBeingEdited.tempId,
			{ label: e.target.input.value },
			{ dontPersist: true }
		);
		setFieldBeingEdited(null);
		restoreFocus();
	};

	const FieldItem = (field) => {
		const selected = navigationValue == field.tempId;
		const isNewEntry = field.tempId == props.addAction;
		return (
			<div
				key={field.tempId}
				className={`
                    h-12 flex items-center gap-2 px-4 text-base leading-none
                    ${isNewEntry && "border-t border-content/5 text-primary"}
                    ${selected && "data-reach-combobox-selected"}
                `}
			>
				<div className="w-5 flex-shrink-0">
					{isNewEntry ? (
						<PlusIcon width={20} />
					) : (
						<Bars3Icon width={20} />
					)}
				</div>
				<div className="flex-1 capitalize ml-1.5">
					{fieldBeingEdited?.tempId == field.tempId ? (
						<form onSubmit={handleUpdateFieldValue}>
							<input
								className="border -ml-1.5 py-1 px-1.5"
								autoFocus
								defaultValue={fieldBeingEdited.label}
								name="input"
							/>
						</form>
					) : (
						field.label
					)}
				</div>
				<span className="flex-shrink-0 ml-auto text-sm">
					{props.editable ? (
						!isNewEntry && selected ? (
							<span className="opacity-40">Click to edit</span>
						) : (
							typeof props.trailing == "function" &&
							props.trailing(field)
						)
					) : (
						props.optional && (
							<>
								!field.hidden ? (
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
							</>
						)
					)}
				</span>
			</div>
		);
	};

	return (
		<div className="relative">
			<SpotlightListSection>
				{fields.map((field) => {
					const leading =
						typeof props.leading == "function"
							? props.leading(field)
							: undefined;

					return (
						<SpotlightListItem
							key={field.tempId}
							value={field.tempId}
							label={field.label}
							leading={leading || undefined}
							trailing={
								props.editable ? (
									navigationValue == field.tempId ? (
										<span className="opacity-40">
											Click to edit
										</span>
									) : (
										typeof props.trailing == "function" &&
										props.trailing(field)
									)
								) : typeof props.trailing == "function" ? (
									props.trailing(field)
								) : !field.hidden ? (
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
						/>
					);
				})}

				{props.canAdd && (
					<SpotlightListItem
						className={`text-primary
                    ${
						navigationValue == props.addAction &&
						"data-reach-combobox-selected"
					}
                    `}
						label={props.addAction}
						value={props.addAction}
						leading={<PlusIcon width={20} />}
						trailing=" "
					/>
				)}
			</SpotlightListSection>

			{typeof props.onReorder == "function" && (
				<div className="absolute inset-0 bg-card">
					<DragDropList
						className="divide-y divide-content/5"
						items={fields}
						onChange={handleSetFields}
					>
						{({ item: field }) => FieldItem(field)}
					</DragDropList>

					{props.canAdd &&
						FieldItem({
							tempId: props.addAction,
							label: props.addAction,
						})}
				</div>
			)}
		</div>
	);
}
