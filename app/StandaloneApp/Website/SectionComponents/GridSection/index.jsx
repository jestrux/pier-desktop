import classNames from "classnames";
import SectionText from "../../SectionText";

export default function GridSection(settings) {
	const { background, color } = settings || {};
	const data = [
		{
			image: "https://www.rauecoculturaltourism.org/wp-content/uploads/2023/04/IMG_2275.jpg",
			title: "Local food cooking class",
			description:
				"Contact us with any of our insurance offerings and we'll sort you out.",
			action: "Learn more",
		},
		{
			image: "https://www.rauecoculturaltourism.org/wp-content/uploads/2023/04/Kikuletwa-Hot-springs-Swing-rope.jpg",
			title: "Trip to Lake Chala",
			description:
				"Contact us with any of our insurance offerings and we'll sort you out.",
			action: "Learn more",
		},
		{
			image: "https://www.rauecoculturaltourism.org/wp-content/uploads/2023/04/Rau-forest-reserve-cycling-.jpg",
			title: "Rau forest cycling tour",
			description:
				"Contact us with any of our insurance offerings and we'll sort you out.",
			action: "Learn more",
		},
		{
			image: "https://www.rauecoculturaltourism.org/wp-content/uploads/2023/04/forest-meditation-around-Rau-forest-reserve.jpg",
			title: "Silent walk & meditation",
			description:
				"Contact us with any of our insurance offerings and we'll sort you out.",
			action: "Learn more",
		},
		{
			image: "https://www.rauecoculturaltourism.org/wp-content/uploads/2023/04/night-life-of-Rau-forest-reserve-Moshi.jpg",
			title: "Rau forest at night",
			description:
				"Contact us with any of our insurance offerings and we'll sort you out.",
			action: "Learn more",
		},
		{
			image: "https://www.rauecoculturaltourism.org/wp-content/uploads/2023/04/c4e3c948-522d-45e7-8f3b-d4612e9538b9.jpg",
			title: "Moringa oleifera herbals",
			description:
				"Contact us with any of our insurance offerings and we'll sort you out.",
			action: "Learn more",
		},
	];

	return (
		<section
			className="px-6 md:px-0 py-10 md:py-20"
			style={{ background: background, color: color }}
		>
			<div className="max-w-7xl mx-auto p-4 flex flex-col gap-12">
				<SectionText {...settings} />

				<div
					className={classNames({
						"grid gap-6": true,
						"grid-cols-2": settings.columns == 2,
						"grid-cols-3": settings.columns == 3,
						"grid-cols-4": settings.columns == 4,
						"grid-cols-5": settings.columns == 5,
					})}
				>
					{data.map((entry, index) => (
						<div
							key={index}
							className={classNames({
								"overflow-hidden": true,
								"bg-white dark:bg-white/10 border border-black/10 dark:border-white/20 shadow rounded-md":
									settings.inset,
							})}
						>
							<div className="relative flex flex-col">
								<div className="">
									<img
										className={classNames({
											"w-full object-cover": true,
											"rounded-md": !settings.inset,
											"aspect-[2/1.2]":
												settings.aspectRatio ==
												"landscape",
											"aspect-[1/1.35]":
												settings.aspectRatio ==
												"portrait",
											"aspect-square":
												settings.aspectRatio ==
												"square",
										})}
										src={entry.image}
										alt=""
									/>
								</div>

								<div
									className={classNames({
										"text-[--content-color] flex flex-col gap-0.5": true,
										"p-5": settings.inset,
										"mt-3": !settings.inset,
										"absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/70 via-70% to-black text-white justify-end":
											settings.overlayText,
									})}
								>
									<h2
										className={classNames({
											"font-bold": true,
											"text-base":
												settings.textSize == "small",
											"text-lg":
												settings.textSize == "regular",
											"text-xl":
												settings.textSize == "large",
											"text-2xl":
												settings.textSize == "xlarge",
										})}
									>
										{entry.title}
									</h2>

									<p
										className={classNames({
											"leading-loose opacity-80": true,
											"text-[9px]":
												settings.textSize == "small",
											"text-xs":
												settings.textSize == "regular",
											"text-sm":
												settings.textSize == "large",
											"text-base":
												settings.textSize == "xlarge",
										})}
									>
										{entry.description}
									</p>

									{/* <div className="mt-3">
								<a
									href="#"
									className="btn btn-outline h-10 text-sm w-full"
								>
									{entry.action}
								</a>
							</div> */}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
