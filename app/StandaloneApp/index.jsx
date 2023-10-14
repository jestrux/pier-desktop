import { useHydrated } from "remix-utils";
import { useStandaloneAppContext } from "./StandaloneAppContext";
import SectionText from "./Website/SectionText";
import WebsiteBanner from "./Website/WebsiteBanner";
import WebsiteNavbar from "./Website/WebsiteNavbar";

export default function StandaloneApp() {
	const hydrated = useHydrated();
	const { app, sections, pageProps } = useStandaloneAppContext();
	const { primaryBgTextColor, bannerColor } = pageProps;

	return (
		<>
			<style>
				{!hydrated
					? ""
					: `
					:root {
						--primary-color: ${app.color};
						--heading-text-transform: ${app.settings.uppercaseHeadings ? "uppercase" : ""};
						--heading-font-size: ${app.settings.headingFontSize ?? "1.875rem"};
						--heading-font-family: ${app.settings.headingFontFamily ?? ""};
						--heading-font-weight: ${app.settings.headingFontWeight ?? "900"};
						--banner-text-color: ${bannerColor};
						--primary-text-color: ${primaryBgTextColor};
					}

					body {
						font-family: ${app.settings.fontFamily ?? `"Open Sans", sans-serif`};
						font-weight: ${app.settings.fontWeight ?? "500"};
					}
				`}
			</style>

			<main className="bg-[--bg-color] text-[--text-color]">
				<WebsiteNavbar />

				<div style={{ minHeight: "140vh" }}>
					{sections.map((section, index) => {
						let settings;

						try {
							settings = JSON.parse(section.settings);
						} catch (error) {
							if (section.settings) settings = section.settings;
						}

						if (section.type == "banner")
							return <WebsiteBanner key={index} />;

						if (section.type == "sectionText") {
							return (
								<div className="py-24" key={index}>
									<SectionText {...settings} />
								</div>
							);
						}

						return null;
					})}
				</div>
			</main>
		</>
	);
}
