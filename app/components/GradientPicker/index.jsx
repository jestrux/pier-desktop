import { useEffect, useState, Fragment } from "react";
import gradients from "./gradients";
import tinycolor from "tinycolor2";
import SpotlightGrid from "../SpotlightSearch/SpotlightComponents/SpotlightGrid";

export const gradientString = (colors) => {
	if (!colors.length || !Array.isArray(colors)) return null;

	const gradient =
		Array.isArray(colors) &&
		colors
			.map((color, idx) => {
				return `${color} ${(idx * 100) / (colors.length - 1)}%`;
			})
			.join(", ");

	return `linear-gradient(90deg, ${gradient})`;
};

const hexAverage = (...args) => {
	return args
		.map((arg) => new tinycolor(arg).toHex())
		.reduce(
			function (previousValue, currentValue) {
				return currentValue
					.replace(/^#/, "")
					.match(/.{2}/g)
					.map(function (value, index) {
						return previousValue[index] + parseInt(value, 16);
					});
			},
			[0, 0, 0]
		)
		.reduce(function (previousValue, currentValue) {
			return (
				previousValue +
				Math.floor(currentValue / args.length)
					.toString(16)
					.padStart(2, "0")
			);
		}, "#");
};

export default function GradientPicker(props) {
	const defaultValue = Object.values(gradients)[0];
	const valueProp = !Array.isArray(props.value)
		? defaultValue
		: props.value || defaultValue;
	const [, setColor] = useState(valueProp);
	const [shiftHeld, setShiftHeld] = useState(false);
	const [_value, setValue] = useState(valueProp);
	const valueString =
		Array.isArray(_value) &&
		_value
			.map((color, idx) => {
				return `${color} ${(idx * 100) / (_value.length - 1)}%`;
			})
			.join(", ");

	const onChange = (color) => {
		setColor(color);
		setValue(color);
		props.onChange(color);
	};

	const handleSetValue = (value) => {
		setValue(value);
		if (typeof onChange == "function") onChange(value);
	};

	const updateColor = (e) => {
		const { value: val, name } = e.target || { name: e };
		let newValue;

		if (["new", "remove"].includes(name)) {
			newValue = [..._value];
			if (name == "new") newValue.splice(1, 0, val);
			else newValue.splice(1, 1);
		} else {
			newValue =
				Array.isArray(_value) &&
				_value.map((color, i) => {
					if (i == name) return val;
					return color;
				});
		}

		handleSetValue(newValue);
	};

	const handleShiftPress = (e) => setShiftHeld(e.shiftKey);

	useEffect(() => {
		document.addEventListener("keyup", handleShiftPress, false);
		document.addEventListener("keydown", handleShiftPress, false);

		return () => {
			document.removeEventListener("keydown", handleShiftPress, false);
			document.removeEventListener("keyup", handleShiftPress, false);
		};
	}, []);

	return (
		<div className="grid grid-cols-2 items-start">
			<div className="border-r max-h-[324px] overflow-y-auto">
				<SpotlightGrid
					aspectRatio="2/1.5"
					columns={3}
					choices={Object.values(gradients)}
					onChange={(gradient) =>
						!gradient ? null : onChange(gradient)
					}
					onSelect={(gradient) =>
						props.onSelect(gradientString(gradient))
					}
				>
					{(gradient) => {
						if (!gradient) return null;

						return (
							<div
								className="w-full h-full rounded"
								style={{
									background: gradientString(gradient),
								}}
							></div>
						);
					}}
				</SpotlightGrid>
			</div>
			<div className="p-4 flex flex-col gap-3">
				<div className="w-full rounded-lg border overflow-hidden">
					<div
						className="rounded flex flex-col overflow-hidden"
						style={{ height: "290px" }}
					>
						<div
							className="m-3 flex-1 rounded border-gray"
							style={{
								background: `linear-gradient(90deg, ${valueString})`,
							}}
						></div>

						<div
							className="border-t px-3 py-3 flex items-center justify-between"
							style={{ height: "48px" }}
						>
							{Array.isArray(_value) &&
								_value.map((color, index) => {
									const label = (color, index) => {
										const removeMidColor =
											_value.length == 3 &&
											index == 1 &&
											shiftHeld;

										return (
											<label
												className="cursor-pointer h-full aspect-video rounded-sm border flex items-center justify-center"
												style={{
													background:
														index == "new"
															? ""
															: color,
												}}
												onClick={
													removeMidColor
														? (e) => {
																e.preventDefault();
																updateColor(
																	"remove"
																);
														  }
														: null
												}
											>
												<input
													className="absolute opacity-0"
													style={{
														width: 0,
														height: 0,
													}}
													type="color"
													value={color}
													name={index}
													onChange={updateColor}
												/>

												{(index == "new" ||
													removeMidColor) && (
													<svg
														className="opacity-50"
														width={12}
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth={3}
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d={
																index == "new"
																	? "M12 4.5v15m7.5-7.5h-15"
																	: "M19.5 12h-15"
															}
														/>
													</svg>
												)}
											</label>
										);
									};

									return (
										<Fragment key={index}>
											{label(color, index)}
											{index == 0 &&
												_value.length == 2 &&
												label(
													hexAverage(
														_value[0],
														_value[1]
													),
													"new"
												)}
										</Fragment>
									);
								})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
