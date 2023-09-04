import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import SpotlightSearchPage from "./SpotlightSearchPage";
import { SpotlightProvider, useSpotlightContext } from "./SpotlightContext";
import DraggableElement from "~/components/DraggableElement";

import { chakraTheme } from "~/utils";

import SpotlightListItem from "./SpotlightComponents/SpotlightListItem";
import SpotlightNavigationButton from "./SpotlightComponents/SpotlightNavigationButton";
import useKeyDetector from "~/hooks/useKeyDetector";

const theme = extendTheme(chakraTheme);

export function SpotlightSearchWrapper() {
	const {
		spotlightInnerPages,
		spotlightSearchVisible,
		hideSpotlightSearch,
		showSpotlightSearch,
		popCurrentSpotlightPage,
		popSpotlightToRoot,
		...props
	} = useSpotlightContext();

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
						<SpotlightListItem
							value="App Properties"
							onSelect={async () => {
								hideSpotlightSearch();
							}}
							trailing="Click to refresh"
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
