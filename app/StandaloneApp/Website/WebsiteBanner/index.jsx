import { useStandaloneAppContext } from "~/StandaloneApp/StandaloneAppContext";
import useBannerProps from "./useBannerProps";
import SectionButtons from "~/StandaloneApp/components/SectionButtons";
import MarkdownText from "~/StandaloneApp/components/MarkdownText";
import classNames from "classnames";

const CenteredBanner = () => {
	const {
		title,
		subtitle,
		image,
		background,
		imageCornerRadius,
		buttons,
		fullWidth,
	} = useBannerProps();

	return (
		<div>
			<div
				className="absolute inset-0 h-4/6"
				style={{ background: `${background}` }}
			></div>

			<div className="flex flex-col items-center text-center max-w-5xl mx-auto py-24 relative">
				<h2
					style={{
						fontFamily: "var(--heading-font-family)",
						// fontSize: "var(--heading-font-size)",
						fontSize: "3.75rem",
						lineHeight: "1.22",
						fontWeight: "var(--heading-font-weight)",
						textTransform: "var(--heading-text-transform)",
					}}
				>
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
				className={classNames({
					[imageCornerRadius]: true,
					"relative -mt-6 mx-auto overflow-hidden": true,
					"aspect-video  max-w-5xl": !fullWidth,
					"aspect-[3/1]": fullWidth,
				})}
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
					<h2
						style={{
							fontFamily: "var(--heading-font-family)",
							fontSize: "calc(var(--heading-font-size)*1.3)",
							lineHeight: "1.15",
							fontWeight: "var(--heading-font-weight)",
							textTransform: "var(--heading-text-transform)",
						}}
					>
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
			className={`${scrollBehavior == "Lift" ? "-mt-16 pt-16" : ""} ${
				scrollBehavior == "Leave" ? "pt-16" : ""
			} relative text-[--banner-text-color]`}
		>
			{bannerLayout()}
		</section>
	);
}
