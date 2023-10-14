import MarkdownText from "../components/MarkdownText";
import SectionButtons from "../components/SectionButtons";

export default function SectionText({ title, subtitle, buttonOne, buttonTwo }) {
	const buttons = [buttonOne, buttonTwo].filter(
		(button) => button && !button.hidden
	);

	return (
		<div className="flex flex-col items-center justify-center text-center">
			<h2 className="text-2xl md:text-5xl/none font-bold">
				<MarkdownText>{title}</MarkdownText>
			</h2>

			<div className="mt-3 text-base/loose md:text-xl/loose opacity-80 max-w-3xl">
				<MarkdownText>{subtitle}</MarkdownText>
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
				<div className="mt-6">
					<SectionButtons buttons={buttons} />
				</div>
			)}
		</div>
	);
}
