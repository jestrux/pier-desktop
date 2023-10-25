import { materialColors } from "~/utils";
import SpotlightNavigationButton from "../SpotlightComponents/SpotlightNavigationButton";
import { useSpotlightContext } from "../SpotlightContext";
import { useFetcher } from "@remix-run/react";

export default function AppSettings() {
	const { pierAppData } = useSpotlightContext();
	const fetcher = useFetcher();

	return (
		<SpotlightNavigationButton
			label="App Settings"
			page={{
				title: "Edit App Settings",
				type: "settings",
				fields: {
					color: {
						type: "radio",
						choices: Object.entries(materialColors).map(
							([label, value]) => ({ label, value })
						),
					},
					fontFamily: {
						label: "Font Family",
						type: "radio",
						choices: [
							{
								label: "Montserrat",
								value: "'Montserrat', sans-serif",
							},
							{
								label: "Open Sans",
								value: "'Open Sans', sans-serif",
							},
						],
					},
					headings: {
						type: "settings",
						fields: {
							uppercaseHeadings: "boolean",
							headingFontFamily: {
								label: "Font Family",
								type: "radio",
								choices: [
									{
										label: "Sans Serif",
										value: "'Montserrat', sans-serif",
									},
									{
										label: "Serif",
										value: "'Cormorant Garamond', serif",
									},
								],
							},
							headingFontSize: {
								label: "Font Size",
								type: "radio",
								choices: [
									{
										label: "Regular",
										value: "2.5rem",
									},
									{
										label: "Large",
										value: "2.85rem",
									},
									{
										label: "X Large",
										value: "3.2rem",
									},
								],
							},
							headingFontWeight: {
								label: "Font Weight",
								type: "radio",
								choices: [
									{
										label: "bold",
										value: 700,
									},
									{
										label: "bolder",
										value: 800,
									},
									{
										label: "black",
										value: 900,
									},
								],
							},
						},
					},
					roundedCorners: {
						type: "radio",
						choices: ["none", "regular", "full"],
					},
				},
				values: {
					...pierAppData.app?.settings,
					color: pierAppData.app?.color,
				},
				onChange: async (value) => {
					if (value.color) {
						fetcher.submit(
							{
								appId: pierAppData.app.id,
								color: value.color,
							},
							{ method: "patch", action: "/app" }
						);
					} else
						fetcher.submit(
							{
								appId: pierAppData.app.id,
								settings: JSON.stringify(value),
							},
							{ method: "patch", action: "/app" }
						);
				},
			}}
		/>
	);
}
