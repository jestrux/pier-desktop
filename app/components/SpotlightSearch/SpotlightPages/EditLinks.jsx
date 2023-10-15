import { useState } from "react";
import SpotlightNavigationButton from "../SpotlightComponents/SpotlightNavigationButton";

export default function EditNavLinks() {
	const defaultLinks = ["Home", "About Us", "Blog", "Contact Us"];
	const [links, setLinks] = useState(defaultLinks);

	const onEditLinks = () => ({
		title: "Edit Link",
		action: "Save Link",
		secondaryAction: {
			label: "Remove Link",
			confirmText: "Remove",
			destructive: true,
			onClick: () => null,
		},
		fields: {
			label: "text",
			appPage: {
				type: "boolean",
				label: "Link to app page",
			},
			url: {
				label: "External URL",
				defaultValue: "#",
				show: (state) => !state.appPage,
			},
			page: {
				type: "choice",
				choices: ["Page 1", "Page 2"],
				show: (state) => state.appPage,
			},
			underline: {
				type: "boolean",
				label: "Underline link",
			},
		},
	});

	return (
		<SpotlightNavigationButton
			label="Edit nav links"
			page={{
				type: "list",
				title: "Edit nav links",
				values: links,
				// editable
				onEdit: onEditLinks,
				onSave: setLinks,
				secondaryAction: {
					label: links?.length ? "Remove Links" : "Add default links",
					destructive: links.length,
					confirmText: "Remove",
					onClick: () => (!links.length ? defaultLinks : []),
				},
			}}
		/>
	);
}
