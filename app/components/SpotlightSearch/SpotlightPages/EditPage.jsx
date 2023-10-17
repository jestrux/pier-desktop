import { useFetcher } from "@remix-run/react";
import SpotlightNavigationButton from "../SpotlightComponents/SpotlightNavigationButton";
import { useSpotlightContext } from "../SpotlightContext";
import { pageIconChoices } from "~/components/PageIcons";

export default function EditPage() {
	const { pierAppData } = useSpotlightContext();
	const fetcher = useFetcher();

	const handleAddPage = async (page) => {
		const payload = {
			name: page.name,
			icon: page.icon,
			settings: JSON.stringify({
				layout: "default",
			}),
			appId: pierAppData.app.id,
			_action: "addPage",
		};

		console.log("New page: ", payload);

		fetcher.submit(payload, {
			method: "post",
			action: "/app",
		});
	};

	return (
		<SpotlightNavigationButton
			label="Add Page"
			page={{
				title: "Add Page",
				type: "form",
				fields: {
					name: {
						type: "text",
						defaultValue: "New page",
					},
					icon: {
						type: "radio",
						choices: pageIconChoices,
						defaultValue: "home",
					},
				},
				// onSave: (data) => {
				// 	console.log("On save: ", data);
				// 	return data;
				// },
			}}
			onPop={handleAddPage}
		/>
	);
}
