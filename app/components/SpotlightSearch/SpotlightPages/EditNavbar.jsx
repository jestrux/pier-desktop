import SpotlightNavigationButton from "../SpotlightComponents/SpotlightNavigationButton";
import { useSpotlightContext } from "../SpotlightContext";
import { useFetcher } from "@remix-run/react";

const navLayouts = {
	Regular:
		'<svg height="12" viewBox="0 0 189 10"><defs><clipPath id="a"><path fill="none" d="M0 0h57v3H0z"/></clipPath></defs><g data-name="Group 11"><g fill="currentColor" stroke="currentColor" stroke-width=".6" data-name="Rectangle 4" transform="translate(168 1)"><rect width="21" height="8" stroke="none" rx="4"/><rect width="20.4" height="7.4" x=".3" y=".3" fill="none" rx="3.7"/></g><g clip-path="url(#a)" data-name="Repeat Grid 1" transform="translate(105 4)"><path fill="currentColor" d="M0 0h12v3H0zM15 0h12v3H15zM30 0h12v3H30zM45 0h12v3H45z" data-name="Rectangle 2"/></g><path fill="currentColor" d="M5.5 0 11 10H0Z" data-name="Polygon 1"/></g></svg>',
	"Left Nav":
		'<svg height="12" viewBox="0 0 189 10"><defs><clipPath id="a"><path fill="none" d="M0 0h57v3H0z"/></clipPath></defs><g data-name="Group 12"><g fill="currentColor" stroke="currentColor" stroke-width=".6" data-name="Rectangle 7" transform="translate(168 1)"><rect width="21" height="8" stroke="none" rx="4"/><rect width="20.4" height="7.4" x=".3" y=".3" fill="none" rx="3.7"/></g><g clip-path="url(#a)" data-name="Repeat Grid 2" transform="translate(19 4)"><path fill="currentColor" d="M0 0h12v3H0zM15 0h12v3H15zM30 0h12v3H30zM45 0h12v3H45z" data-name="Rectangle 2"/></g><path fill="currentColor" d="M5.5 0 11 10H0Z" data-name="Polygon 2"/></g></svg>',
	"Centered Nav":
		'<svg height="12" viewBox="0 0 189 10"><defs><clipPath id="a"><path fill="none" d="M0 0h58v3H0z"/></clipPath></defs><g data-name="Group 10"><g fill="currentColor" stroke="currentColor" stroke-width=".6" data-name="Rectangle 4" transform="translate(168 1)"><rect width="21" height="8" stroke="none" rx="4"/><rect width="20.4" height="7.4" x=".3" y=".3" fill="none" rx="3.7"/></g><g clip-path="url(#a)" data-name="Repeat Grid 1" transform="translate(59 4)"><path fill="currentColor" d="M0 0h12v3H0zM15 0h12v3H15zM30 0h12v3H30zM45 0h12v3H45z" data-name="Rectangle 2"/></g><path fill="currentColor" d="M5.5 0 11 10H0Z" data-name="Polygon 1"/></g></svg>',
	"Centered Logo":
		'<svg height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 189 10"><g data-name="Group 9"><g fill="currentColor" stroke="currentColor" stroke-width=".6" data-name="Rectangle 4" transform="translate(168 1)"><rect width="21" height="8" stroke="none" rx="4"/><rect width="20.4" height="7.4" x=".3" y=".3" fill="none" rx="3.7"/></g><path fill="currentColor" d="M90.5 0 96 10H85Z" data-name="Polygon 1"/><path fill="currentColor" d="M0 4h12v3H0z" data-name="Rectangle 2"/></g></svg>',
};

export default function EditNavbar() {
	const { pierAppData } = useSpotlightContext();
	const fetcher = useFetcher();

	return (
		<SpotlightNavigationButton
			label="App Navbar"
			page={{
				title: "Edit Navbar",
				secondaryAction: {
					label: "Remove Navbar",
					destructive: true,
					confirmText: "Remove",
					onClick: () => {
						return null;
					},
				},
				type: "settings",
				fields: {
					layout: {
						type: "radio",
						choices: Object.keys(navLayouts),
					},
					scrollBehavior: {
						type: "radio",
						choices: [
							"Sticky",
							"Lift",
							"Leave",
							// "Collapse",
						],
					},
					showAppName: {
						label: "Show App Name",
						type: "boolean",
					},
					buttonOne: "button",
					buttonTwo: "button",
				},
				values: pierAppData.pageProps?.appBar?.settings,
				onChange: async (value) => {
					const appBar = pierAppData.pageProps.appBar;
					fetcher.submit(
						{
							sectionId: appBar.id,
							settings: JSON.stringify(value),
						},
						{ method: "post", action: "/app" }
					);
				},
			}}
		/>
	);
}
