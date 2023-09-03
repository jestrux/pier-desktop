import { useStandaloneAppContext } from "./StandaloneAppContext";
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
					{/* @include('pier-website.banner.index') */}
					<div className="p-3">
						<div className="flex items-center gap-3 mb-4">App</div>
						<h1 className="mb-5 text-3xl font-bold text-blue-100">
							{app.name}
						</h1>
					</div>
				</div>
			</main>
		</>
	);
}
