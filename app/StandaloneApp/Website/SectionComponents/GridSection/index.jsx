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

				<div className="grid grid-cols-4 gap-6">
					{data.map((entry, index) => (
						<div
							key={index}
							className="bg-white dark:bg-white/10 overflow-hidden border border-black/10 dark:border-white/20 shadow rounded-md"
						>
							<div className="flex flex-col gap-3 pb-4">
								<div className="">
									<img
										className="w-full aspect-[2/1.2] object-cover"
										src={entry.image}
										alt=""
									/>
								</div>

								<div className="text-[--content-color] px-5 flex flex-col gap-0.5 justify-center">
									<h2 className="text-lg font-bold">
										{entry.title}
									</h2>

									<p className="text-sm leading-loose opacity-80">
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
