import { ChakraProvider, extendTheme, useColorMode } from "@chakra-ui/react";
import SpotlightSearchPage from "./SpotlightSearchPage";
import { SpotlightProvider, useSpotlightContext } from "./SpotlightContext";
import DraggableElement from "~/components/DraggableElement";

import { chakraTheme } from "~/utils";

import useKeyDetector from "~/hooks/useKeyDetector";
import AlertsWrapper from "../Alerts";
import { useEffect } from "react";
import { useHydrated } from "remix-utils";
import AppSettings from "./SpotlightPages/AppSettings";
import EditBanner from "./SpotlightPages/EditBanner";
import EditAppBar from "./SpotlightPages/EditAppBar";
import PageSections from "./SpotlightPages/PageSections";
import SpotlightListSection from "./SpotlightComponents/SpotlightListSection";
import EditFooter from "./SpotlightPages/EditFooter";
import AppPages from "./SpotlightPages/AppPages";
import ManageApps from "./SpotlightPages/ManageApps";
import SpotlightNavigationButton from "./SpotlightComponents/SpotlightNavigationButton";

const theme = extendTheme(chakraTheme);

export function SpotlightSearchWrapper() {
	const {
		pierAppData,
		spotlightRef,
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

	useEffect(() => {
		if (!pierAppData?.apps) return;

		if (!pierAppData.apps.length) showSpotlightSearch();
	}, [pierAppData]);

	useKeyDetector({
		key: "Cmd + /",
		action: () => showSpotlightSearch(),
	});

	return (
		<DraggableElement persistKey="spotlightPlacement">
			{(dragProps) => (
				<>
					<SpotlightSearchPage
						key={spotlightRef}
						{...props}
						open={
							spotlightSearchVisible &&
							!spotlightInnerPages.length
						}
						onClose={hideSpotlightSearch}
						dragProps={dragProps}
					>
						{!pierAppData.app && <ManageApps />}

						{pierAppData.app && (
							<>
								{pierAppData.app.type == "website" && (
									<SpotlightListSection>
										<EditAppBar />

										<EditBanner />

										<EditFooter />
									</SpotlightListSection>
								)}

								<PageSections />

								<SpotlightListSection title="App Details">
									<AppPages />

									<AppSettings />
								</SpotlightListSection>

								<SpotlightNavigationButton
									label="Manage Apps"
									page={{
										title: "Manage Apps",
										type: "detail",
										content: <ManageApps />,
									}}
								/>
							</>
						)}
					</SpotlightSearchPage>

					{spotlightInnerPages.map((page) => (
						<SpotlightSearchPage
							key={spotlightRef + "-" + page.id}
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
