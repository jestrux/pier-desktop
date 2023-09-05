import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import SpotlightSearchPage from "./SpotlightSearchPage";
import { SpotlightProvider, useSpotlightContext } from "./SpotlightContext";
import DraggableElement from "~/components/DraggableElement";

import { chakraTheme } from "~/utils";

import SpotlightNavigationButton from "./SpotlightComponents/SpotlightNavigationButton";
import useKeyDetector from "~/hooks/useKeyDetector";
import { useFetcher } from "@remix-run/react";
import SpotlightSettingsItem from "./SpotlightComponents/SpotlightSettingsItem";

const theme = extendTheme(chakraTheme);

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

	const fetcher = useFetcher();

	useKeyDetector({
		key: "Cmd + /",
		action: () => showSpotlightSearch(),
	});

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
						<SpotlightSettingsItem
							label="Show app name"
							checked={
								pierAppData.pageProps?.appBar?.settings
									?.showAppName
							}
							onChange={async (showAppName) => {
								const appBar = pierAppData.pageProps.appBar;
								fetcher.submit(
									{
										sectionId: appBar._id,
										settings: JSON.stringify({
											showAppName,
										}),
									},
									{ method: "post", action: "/app" }
								);
							}}
							// trailing="Click to refresh"
						/>
						<SpotlightSettingsItem
							field={{
								label: "Navbar layout",
								type: "radio",
								choices: ["Regular", "Centered"],
								value: pierAppData.pageProps?.banner?.settings
									?.layout,
							}}
							onChange={async (layout) => {
								// hideSpotlightSearch();
								// pushSpotlightPage({
								// 	title: "Refresh app",
								// 	content: <h1>This is some page content</h1>,
								// });

								const banner = pierAppData.pageProps.banner;
								fetcher.submit(
									{
										sectionId: banner._id,
										settings: JSON.stringify({
											layout,
										}),
									},
									{ method: "post", action: "/app" }
								);
							}}
							// trailing="Click to refresh"
						/>
						<SpotlightNavigationButton
							label="Edit App"
							page={{
								title: "",
								content: <h1>This is some page content</h1>,
							}}
							// trailing="Click to refresh"
						/>
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
		</ChakraProvider>
	);
}
