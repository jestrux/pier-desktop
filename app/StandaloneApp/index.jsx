import { useStandaloneAppContext } from "./StandaloneAppContext";
import SectionText from "./Website/SectionText";
import WebsiteBanner from "./Website/WebsiteBanner";
import WebsiteNavbar from "./Website/WebsiteNavbar";

export default function StandaloneApp() {
	const { app, sections, pageProps } = useStandaloneAppContext();
	const { primaryBgTextColor, bannerColor } = pageProps;

	return (
		<>
			<style>
				{`
					:root {
						--primary-color: ${app.color};
						--banner-text-color: ${bannerColor};
						--primary-text-color: ${primaryBgTextColor};
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
