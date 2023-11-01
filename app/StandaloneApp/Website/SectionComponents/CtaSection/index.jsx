import SectionText from "../../SectionText";

export default function CtaSection(settings) {
	const { background, color, inset } = settings;
	const bgAndColor = {
		background,
		color,
	};

	return (
		<section className="py-8 md:py-12" style={inset ? {} : bgAndColor}>
			<div
				className="relative rounded-2xl max-w-7xl mx-auto p-4"
				style={bgAndColor}
			>
				{inset && (
					<span className="rounded-2xl absolute inset-0 opacity-50 border border-current"></span>
				)}

				<div className={inset && "p-12"}>
					<SectionText {...settings} onCtaSection />
				</div>
			</div>
		</section>
	);
}
