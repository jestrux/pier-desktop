import { useStandaloneAppContext } from "~/StandaloneApp/StandaloneAppContext";

export default function useBannerProps() {
	const { app, pageProps } = useStandaloneAppContext();
	const { banner: _banner } = pageProps;
	const banner = _banner?.settings;

	const imageCornerRadius = {
		none: "rounded-none",
		regular: "rounded-xl",
		full: "rounded-[40px]",
	}[
		banner.layout == "Centered" && banner.fullWidth
			? "none"
			: app.settings.roundedCorners
	];

	return {
		...banner,
		background: banner.background ?? "",
		imageCornerRadius,
		buttons: [banner.buttonOne, banner.buttonTwo],
	};
}
