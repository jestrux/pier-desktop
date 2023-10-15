import {
	ChakraProvider,
	extendTheme,
	useColorMode,
} from "@chakra-ui/react";
import SpotlightSearchPage from "./SpotlightSearchPage";
import { SpotlightProvider, useSpotlightContext } from "./SpotlightContext";
import DraggableElement from "~/components/DraggableElement";

import { chakraTheme } from "~/utils";

import SpotlightNavigationButton from "./SpotlightComponents/SpotlightNavigationButton";
import useKeyDetector from "~/hooks/useKeyDetector";
import { useFetcher } from "@remix-run/react";
import SpotlightSettingsItem from "./SpotlightComponents/SpotlightSettingsItem";
import AlertsWrapper from "../Alerts";
import { useEffect, useState } from "react";
import { useHydrated } from "remix-utils";

const theme = extendTheme(chakraTheme);

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

export function SpotlightSearchWrapper() {
	const {
		pierAppData,
		spotlightInnerPages,
		spotlightSearchVisible,
		hideSpotlightSearch,
		showSpotlightSearch,
		popCurrentSpotlightPage,
		popSpotlightToRoot,
		...props
	} = useSpotlightContext();

	const hydrated = useHydrated();
	const { setColorMode } = useColorMode();

	useEffect(() => {
		if (!hydrated) return;

		const dark =
			window?.matchMedia &&
			window?.matchMedia("(prefers-color-scheme: dark)").matches;

		setColorMode(dark ? "dark" : "light");
	}, [hydrated]);

	const fetcher = useFetcher();

	useKeyDetector({
		key: "Cmd + /",
		action: () => showSpotlightSearch(),
	});

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

	const sectionText = pierAppData.sections?.find(
		({ type }) => type == "sectionText"
	);

	const defaultLinks = ["Home", "About Us", "Blog", "Contact Us"];

	const [links, setLinks] = useState(defaultLinks);

	return (
		<DraggableElement persistKey="spotlightPlacement">
			{(dragProps) => (
				<>
					<SpotlightSearchPage
						{...props}
						open={
							spotlightSearchVisible &&
							!spotlightInnerPages.length
						}
						onClose={hideSpotlightSearch}
						dragProps={dragProps}
					>
						<SpotlightNavigationButton
							label="Edit App Settings"
							page={{
								title: "Edit App Settings",
								type: "settings",
								fields: {
									fontFamily: {
										label: "Font Family",
										type: "radio",
										choices: [
											{
												label: "Montserrat",
												value: `"Montserrat", sans-serif`,
											},
											{
												label: "Open Sans",
												value: `"Open Sans", sans-serif`,
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
														value: `"Montserrat", sans-serif`,
													},
													{
														label: "Serif",
														value: `"Cormorant Garamond", serif`,
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
								values: pierAppData.app?.settings,
								onChange: async (value) => {
									fetcher.submit(
										{
											appId: pierAppData.app.id,
											settings: JSON.stringify(value),
										},
										{ method: "post", action: "/app" }
									);
								},
							}}
						/>
						<SpotlightNavigationButton
							label="Edit Navbar"
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
						<SpotlightNavigationButton
							label="Edit Banner"
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
						<SpotlightNavigationButton
							label={
								sectionText
									? "Edit Section Text"
									: "Add Section Text"
							}
							page={{
								title: sectionText
									? "Edit Section Text"
									: "Add Section Text",
								secondaryAction: !sectionText
									? null
									: {
											label: "Remove Section Text",
											destructive: true,
											confirmText: "Remove",
											onClick: () => {
												return null;
											},
									  },
								type: sectionText ? "settings" : "form",
								fields: {
									layout: {
										label: "Layout",
										type: "radio",
										choices: ["Regular", "Centered"],
										defaultValue: "Regular",
									},
									...(sectionText
										? {
												text: {
													type: "object",
													fields: {
														title: "markdown",
														subtitle: "markdown",
													},
												},
												buttonOne: "button",
												buttonTwo: "button",
										  }
										: {
												title: "markdown",
												subtitle: "markdown",
										  }),
								},
								values: sectionText?.settings,
								onSave: async (value) => {
									const payload = {
										name: "Section Text",
										type: "sectionText",
										settings: JSON.stringify(value),
										pageId: pierAppData.currentPage.id,
									};

									console.log("Payloa: ", payload);

									fetcher.submit(payload, {
										method: "post",
										action: "/app",
									});
								},
								onChange: async (value) => {
									fetcher.submit(
										{
											sectionId: sectionText.id,
											settings: JSON.stringify(value),
										},
										{ method: "post", action: "/app" }
									);
								},
							}}
						/>
						{/* <SpotlightNavigationButton
							label="Edit nav links"
							page={{
								type: "list",
								title: "Edit nav links",
								values: defaultLinks,
								// editable
								// onEdit={onEditLinks}
								onSave: setLinks,
								secondaryAction: {
									label: links?.length
										? "Remove Links"
										: "Add default links",
									destructive: links.length,
									confirmText: "Remove",
									onClick: () =>
										!links.length ? defaultLinks : [],
								},
							}}
						/> */}
					</SpotlightSearchPage>

					{spotlightInnerPages.map((page) => (
						<SpotlightSearchPage
							key={page.id}
							page={page}
							open={
								spotlightSearchVisible &&
								page.id == spotlightInnerPages.at(-1).id
							}
							onClose={hideSpotlightSearch}
							onPopAll={popSpotlightToRoot}
							onPop={popCurrentSpotlightPage}
							dragProps={dragProps}
						>
							{page.content}
						</SpotlightSearchPage>
					))}
				</>
			)}
		</DraggableElement>
	);
}

export default function SpotlightSearch() {
	return (
		<ChakraProvider theme={theme}>
			<SpotlightProvider>
				<SpotlightSearchWrapper />
			</SpotlightProvider>

			<AlertsWrapper />
		</ChakraProvider>
	);
}
