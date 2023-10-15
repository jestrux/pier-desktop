import SpotlightNavigationButton from "../SpotlightComponents/SpotlightNavigationButton";
import { useSpotlightContext } from "../SpotlightContext";
import { useFetcher } from "@remix-run/react";

export default function EditBanner() {
	const { pierAppData } = useSpotlightContext();
	const fetcher = useFetcher();

	return (
		<SpotlightNavigationButton
			label="App Banner"
			page={{
				title: "Edit Banner",
				secondaryAction: {
					label: "Remove Banner",
					destructive: true,
					confirmText: "Remove",
					onClick: () => {
						return null;
					},
				},
				type: "settings",
				fields: {
					background: "color",
					color: {
						type: "radio",
						choices: ["inherit", "black", "white"],
					},
					layout: {
						label: "Layout",
						type: "radio",
						choices: ["Regular", "Centered"],
					},
					text: {
						type: "object",
						fields: {
							title: "markdown",
							subtitle: "markdown",
						},
					},
					buttonOne: "button",
					buttonTwo: "button",
					image: "image",
				},
				values: pierAppData.pageProps?.banner?.settings,
				onChange: async (value) => {
					const banner = pierAppData.pageProps.banner;
					fetcher.submit(
						{
							sectionId: banner.id,
							settings: JSON.stringify(value),
						},
						{ method: "post", action: "/app" }
					);
				},
			}}
		/>
	);
}
