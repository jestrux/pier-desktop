import { useState } from "react";
import {
	FormControl,
	FormLabel,
	Input,
	Radio,
	RadioGroup,
	Select,
	Switch,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import ReactTextareaAutosize from "react-textarea-autosize";
import TextareaMarkdown from "textarea-markdown-editor";

const PierField = ({ field, value, onChange }) => {
	const { colorMode } = useColorMode();

	switch (field.type) {
		case "boolean":
			return (
				<div className="flex items-center gap-2">
					<Switch
						id={field.label}
						colorScheme="primary"
						size="md"
						isChecked={value}
						onChange={onChange}
						name={field.name}
					/>

					<FormLabel
						className="first-letter:capitalize"
						m={0}
						htmlFor={field.label}
					>
						{field.label}
					</FormLabel>
				</div>
			);

		case "radio":
			return (
				<RadioGroup onChange={onChange} value={value} name={field.name}>
					<div
						className={`flex items-center flex-wrap ${
							typeof field.renderChoice == "function"
								? "gap-3"
								: "gap-6"
						}`}
					>
						{field.choices?.map((choice, index) => {
							if (!choice) return null;

							const choiceValue = choice?.value || choice;
							const selected = choiceValue == value;

							if (typeof field.renderChoice == "function") {
								return (
									<label
										key={index}
										className="cursor-pointer"
									>
										<input
											className="peer opacity-0 pointer-events-none"
											type="radio"
											name={field.name}
											value={choiceValue}
											checked={selected}
											onChange={() =>
												onChange(choiceValue)
											}
										/>

										{field.renderChoice(
											choiceValue,
											selected
										)}
									</label>
								);
							}

							return (
								<Radio
									colorScheme="primary"
									key={index}
									value={choiceValue}
									required={!field.optional}
								>
									<span className="first-letter:capitalize">
										{choice.label || choice}
									</span>
								</Radio>
							);
						})}
					</div>
				</RadioGroup>
			);

		case "choice":
			return (
				<FormControl>
					<Select
						placeholder="Choose one"
						onChange={onChange}
						value={value}
						name={field.name}
						required={!field.optional}
					>
						{field.choices?.map((choice, index) => {
							if (!choice) return null;
							return (
								<option
									key={index}
									value={choice.value || choice}
									required={!field.optional}
								>
									{choice.label || choice}
								</option>
							);
						})}
					</Select>
				</FormControl>
			);

		case "markdown": {
			return (
				<>
					<TextareaMarkdown.Wrapper>
						<ReactTextareaAutosize
							className="bg-transparent w-full resize-none text-md px-4 py-1.5 h-10 rounded-md border"
							name={field.name}
							defaultValue={value}
							onChange={onChange}
						/>
					</TextareaMarkdown.Wrapper>
				</>
			);
		}

		default: {
			let fieldType = field.type || "text";
			if (["image"].includes(fieldType)) fieldType = "text";

			return (
				<Input
					id={field.label}
					placeholder={field.placeholder}
					type={fieldType}
					size="md"
					name={field.name}
					value={value}
					style={{ colorScheme: colorMode }}
					onChange={onChange}
					required={!field.optional}
				/>
			);
		}
	}
};

export default function PierFormField({ field, onChange = () => {} }) {
	const [value, setValue] = useState(field.defaultValue);
	const handleChange = (e) => {
		let value = e;
		if (e.target) {
			const el = e.target;
			value = ["checkbox", "radio"].includes(el.type)
				? el.checked
				: el.value;
		}

		setValue(value);
		onChange({ [field.name]: value });
	};

	return (
		<div>
			<FormControl>
				{field.type != "boolean" && (
					<FormLabel
						className="first-letter:capitalize"
						mb={0}
						htmlFor={field.label}
					>
						{field.label}
					</FormLabel>
				)}

				<PierField
					field={field}
					value={value}
					onChange={handleChange}
				/>
			</FormControl>

			{field.hint && field.hint.length && (
				<Text fontSize="sm">
					Hint: <span className="opacity-75">{field.hint}</span>
				</Text>
			)}
		</div>
	);
}
