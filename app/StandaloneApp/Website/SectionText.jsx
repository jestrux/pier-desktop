import classNames from "classnames";
import MarkdownText from "../components/MarkdownText";
import SectionButtons from "../components/SectionButtons";

export default function SectionText({
	title,
	subtitle,
	buttonOne,
	buttonTwo,
	layout,
	onMediaSection,
	onCtaSection,
}) {
	const buttons = [buttonOne, buttonTwo].filter(
		(button) => button && !button.hidden
	);

	return (
		<div
			className={classNames({
				"w-full flex": true,
				"items-center justify-center text-center": layout == "Centered",
				"flex-col gap-5": layout != "Horizontal",
				"justify-between gap-12": layout == "Horizontal",
				...(layout != "Horizontal"
					? {}
					: onCtaSection
					? { "items-center": true }
					: { "items-start": true }),
			})}
		>
			<div
				className={classNames({
					"flex flex-col": true,
					"gap-2": onMediaSection,
					"items-center justify-center text-center":
						layout == "Centered",
				})}
			>
				<h2
					className="text-2xl font-black"
					style={{
						fontFamily: "var(--heading-font-family)",
						fontSize: "var(--heading-font-size)",
						fontWeight: "var(--heading-font-weight)",
						textTransform: "var(--heading-text-transform)",
						// lineHeight: onCtaSection ? 1.2 : "",
					}}
				>
					<MarkdownText>{title}</MarkdownText>
				</h2>

				<div className="mt-3 text-base/loose md:text-xl/loose opacity-80 max-w-4xl">
					<MarkdownText
						className={classNames({
							"flex flex-col gap-4": onMediaSection,
						})}
					>
						{subtitle}
					</MarkdownText>
				</div>
			</div>

			{/* <h2 className="text-2xl md:text-5xl/tight uppercase tracking-wide font-black">
				Eco-friendly tours
			</h2>

			<p className="max-w-4xl mt-3 text-base md:text-xl/loose opacity-80">
				The eco-friendly tours that we organize allow us to empower
				women and youth of our community, raise awareness about
				environmental concerns, and mitigate climate change.
			</p> */}

			{buttons?.length > 0 && (
				<div className="flex-shrink-0">
					<SectionButtons buttons={buttons} />
				</div>
			)}
		</div>
	);
}
