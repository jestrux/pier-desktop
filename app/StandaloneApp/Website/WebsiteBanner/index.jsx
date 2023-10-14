import { useStandaloneAppContext } from "~/StandaloneApp/StandaloneAppContext";
import useBannerProps from "./useBannerProps";
import SectionButtons from "~/StandaloneApp/components/SectionButtons";
import MarkdownText from "~/StandaloneApp/components/MarkdownText";

const CenteredBanner = () => {
	const { title, subtitle, image, background, imageCornerRadius, buttons } =
		useBannerProps();

	return (
		<div>
			<div
				className="absolute inset-0 h-4/6"
				style={{ background: `${background}` }}
			></div>

			<div className="flex flex-col items-center text-center max-w-5xl mx-auto py-24 relative">
				<h2 className="section-title">
					<MarkdownText>{title}</MarkdownText>
				</h2>

				<div className="mt-4 section-subtitle">
					<MarkdownText>{subtitle}</MarkdownText>
				</div>

				<div className="mt-8">
					<SectionButtons buttons={buttons} />
				</div>
			</div>

			<div
				className={`${imageCornerRadius} aspect-video relative -mt-6 max-w-5xl mx-auto overflow-hidden`}
				style={{ background: `${background}` }}
			>
				<img
					className={`${imageCornerRadius} smix-blend-luminosity absolute stop-0 left-0 w-full h-full object-cover`}
					src={image}
					alt=""
				/>
			</div>
		</div>
	);
};

const RegularBanner = () => {
	const { title, subtitle, image, background, imageCornerRadius, buttons } =
		useBannerProps();

	return (
		<div>
			<div
				className="absolute inset-0 -bottom-2"
				style={{ background: `${background}` }}
			></div>

			<div className="section-wrapper inset flex items-center justify-center py-12 min-h-[600px]">
				<div className="pt-10 pb-24 pr-12 relative flex-1 overflow-hidden">
					<h2 className="section-title">
						<MarkdownText>{title}</MarkdownText>
					</h2>

					<div className="mt-4 section-subtitle">
						<MarkdownText>{subtitle}</MarkdownText>
					</div>

					<div className="mt-8">
						<SectionButtons buttons={buttons} />
					</div>
				</div>

				<div
					className={`${imageCornerRadius} rounded-4xl flex-shrink-0 self-stretch relative w-7/12 max-w-[680px] overflow-hidden bg-[--primary-color]`}
					style={{ background: `${background}` }}
				>
					<img
						className={`${imageCornerRadius} smix-blend-luminosity absolute w-full h-full object-cover`}
						src={image}
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};

export default function WebsiteBanner() {
	const { pageProps } = useStandaloneAppContext();
	const { banner, scrollBehavior } = pageProps;

	if (!banner) return;

	const bannerLayout = () => {
		if (banner.settings.layout?.toLowerCase() == "centered")
			return <CenteredBanner />;

		return <RegularBanner />;
	};

	return (
		<section
			id="banner"
			className={`{ ${scrollBehavior == "Lift" ? "-mt-16 pt-16" : ""} ${
				scrollBehavior == "Leave" ? "pt-16" : ""
			} relative text-[--banner-text-color]`}
		>
			{bannerLayout()}
		</section>
	);
}
