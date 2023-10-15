export default function GridSection() {
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
		<section className="px-6 md:px-0 py-10 md:py-20">
			<div className="max-w-7xl mx-auto p-4">
				<div className="flex flex-col items-center justify-center text-center">
					<h2
						className="text-2xl font-black"
						style={{
							fontFamily: "var(--heading-font-family)",
							fontSize: "var(--heading-font-size)",
							fontWeight: "var(--heading-font-weight)",
							textTransform: "var(--heading-text-transform)",
						}}
					>
						The activities
					</h2>

					<div className="mt-3 text-base/loose md:text-xl/loose opacity-80 max-w-3xl">
						<div>
							<p>
								What we'll be getting around to on your stay
								here. The little things that actually boost your
								energy and keep you going through your work day.
							</p>
						</div>
					</div>

					<div className="mt-6">
						<div className="flex items-center gap-3">
							<a
								href="#"
								className="bg-[--primary-color] text-[--primary-text-color] shadow hover:opacity-90 rounded-md h-12 px-6 font-bold  group min-w-[80px] flex items-center justify-center text-center focus:outline-none"
							>
								Learn more
							</a>
						</div>
					</div>
				</div>

				<div className="mt-8 grid grid-cols-4 gap-6">
					{data.map((entry, index) => (
						<div
							key={index}
							className="overflow-hidden border border-neutral-300 shadow-sm rounded"
						>
							<div className="flex flex-col gap-4 pb-6">
								<div className="">
									<img
										className="w-full aspect-[2/1.5] object-cover"
										src={entry.image}
										alt=""
									/>
								</div>

								<div className="px-6 flex flex-col gap-1 justify-center">
									<h2 className="text-2xl font-semibold md:text-xls">
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
