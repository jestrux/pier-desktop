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
					#pierStandaloneApp {
						--content-color: #000;
						--primary-color: ${app.color};
						--heading-text-transform: ${app.settings.uppercaseHeadings ? "uppercase" : ""};
						--heading-font-size: ${app.settings.headingFontSize ?? "1.875rem"};
						--heading-font-family: ${!hydrated ? "" : app.settings.headingFontFamily ?? ""};
						--heading-font-weight: ${app.settings.headingFontWeight ?? "900"};
						--banner-text-color: ${bannerColor};
						--primary-text-color: ${primaryBgTextColor};
						--bg-gray-color: rgba(0,0,0,0.05);
						--bg-gray-color: rgb(242,242,242);
					}

					@media (prefers-color-scheme: dark) {
						#pierStandaloneApp {
							--content-color: #fff;
							--bg-gray-color: rgba(255,255,255,0.06);
							--bg-gray-color: rgb(32,30,30);
						}
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
					
					.section-title,
					.section-title * {
						font-size: 3.75rem !important;
						line-height: 1.1 !important;
						font-weight: 750 !important;
					}

					.section-subtitle {
						opacity: 0.9;
					}

					.section-subtitle,
					.section-subtitle * {
						font-size: 1.5rem !important;
						line-height: 1.625 !important;
						line-height: 1.8 !important;
					}

					.section-title strong,
					.section-subtitle strong {
						color: var(--primary-color);
					}
				`}
			</style>

			<main
				id="pierStandaloneApp"
				className="bg-[--bg-color] text-[--text-color]"
			>
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
							const background = section.settings?.background;
							const adaptiveColorMap = {
								inherit: {
									background: "inherit",
									color: "inherit",
								},
								gray: {
									background: "var(--bg-gray-color)",
									color: "inherit",
								},
								primary: {
									background: "var(--primary-color)",
									color: "var(--primary-text-color)",
								},
							};

							const adaptiveColors = adaptiveColorMap[background];
							if (adaptiveColors) {
								section.settings.background =
									adaptiveColors.background;
								section.settings.color = adaptiveColors.color;
							}

							if (section.type == "textSection") {
								return (
									<div className="py-24" key={index}>
										<div
											className={`max-w-7xl mx-auto p-4 flex flex-col ${
												section.settings?.layout ==
													"Centered" &&
												"items-center justify-center text-center"
											}`}
										>
											<SectionText
												{...section.settings}
											/>
										</div>
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
