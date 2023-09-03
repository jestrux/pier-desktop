import { useStandaloneAppContext } from "./StandaloneAppContext";
import WebsiteBanner from "./Website/WebsiteBanner";
import WebsiteNavbar from "./Website/WebsiteNavbar";

export default function StandaloneApp() {
	const { app, pageProps } = useStandaloneAppContext();
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
					<WebsiteBanner />
				</div>
			</main>
		</>
	);
}
