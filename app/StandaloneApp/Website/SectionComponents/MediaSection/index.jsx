import classNames from "classnames";
import SectionText from "../../SectionText";

export default function MediaSection(settings) {
	const { background, color, flipped, image } = settings || {};

	return (
		<section
			className="px-6 md:px-0 py-10 md:py-20"
			style={{ background: background, color: color }}
		>
			<div className="max-w-7xl p-4 mx-auto">
				<div
					className={classNames({
						"flex gap-20 items-center": true,
						"flex-row-reverse": flipped,
					})}
				>
					<div className="aspect-[1/0.9] relative flex-1 rounded-2xl overflow-hidden">
						<img
							className="object-cover inset-0 w-full h-full"
							src={image}
						/>
					</div>
					<div className="flex-1 pb-6">
						<SectionText {...settings} onMediaSection />
					</div>
				</div>
			</div>
		</section>
	);
}
