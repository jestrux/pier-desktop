import { useHydrated } from "remix-utils";
import { useStandaloneAppContext } from "./StandaloneAppContext";
import SectionText from "./Website/SectionText";
import WebsiteBanner from "./Website/WebsiteBanner";
import WebsiteNavbar from "./Website/WebsiteNavbar";
import Footer from "./Website/SectionComponents/Footer";
import CtaSection from "./Website/SectionComponents/CtaSection";
import FeatureSection from "./Website/SectionComponents/FeatureSection";
import MediaSection from "./Website/SectionComponents/MediaSection";
import GridSection from "./Website/SectionComponents/GridSection";

export default function StandaloneApp() {
	const hydrated = useHydrated();
	const { app, sections, pageProps } = useStandaloneAppContext();
	const { primaryBgTextColor, bannerColor } = pageProps;

	return (
		<>
			<style>
				{`
					:root {
						--primary-color: ${app.color};
						--heading-text-transform: ${app.settings.uppercaseHeadings ? "uppercase" : ""};
						--heading-font-size: ${app.settings.headingFontSize ?? "1.875rem"};
						--heading-font-family: ${!hydrated ? "" : app.settings.headingFontFamily ?? ""};
						--heading-font-weight: ${app.settings.headingFontWeight ?? "900"};
						--banner-text-color: ${bannerColor};
						--primary-text-color: ${primaryBgTextColor};
					}

					body {
						font-family: ${
							!hydrated
								? ""
								: app.settings.fontFamily ??
								  "'Open Sans', sans-serif"
						};
						font-weight: ${app.settings.fontWeight ?? 500};
					}

					.bg-primary {
						background-color: var(--primary-color);
					}
					
					.bg-accent {
						background-color: #FDFBE9;
					}
					
					.text-primary {
						color: var(--primary-color);
					}
					
				`}
			</style>

			<main className="bg-[--bg-color] text-[--text-color]">
				{pageProps.appBar && <WebsiteNavbar />}

				<div style={{ minHeight: "140vh" }}>
					{pageProps.banner && <WebsiteBanner />}

					{sections
						.filter(
							({ id }) =>
								![
									pageProps.banner?.id,
									pageProps.appBar?.id,
									pageProps.footer?.id,
								].includes(id)
						)
						.map((section, index) => {
							if (section.type == "textSection") {
								return (
									<div className="py-24" key={index}>
										<SectionText {...section.settings} />
									</div>
								);
							}

							const Component = {
								gridSection: GridSection,
								mediaSection: MediaSection,
								featureSection: FeatureSection,
								ctaSection: CtaSection,
								footer: Footer,
							}[section.type];

							if (Component) {
								return (
									<Component
										key={index}
										{...section.settings}
									/>
								);
							}

							return null;
						})}
				</div>

				{pageProps.footer && <Footer />}
			</main>
		</>
	);
}
