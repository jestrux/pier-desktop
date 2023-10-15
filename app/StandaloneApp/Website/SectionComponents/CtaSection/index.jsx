export default function CtaSection() {
	return (
		<section className="py-8 md:py-12 border-t border-neutral-200/60 bg-accent">
			<div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row items-center text-center md:text-left">
				<div className="flex-1 flex flex-col">
					<h2 className="text-xl font-bold md:text-3xl">
						Ready for a purposeful trip?
					</h2>

					<p className="mt-3 text- leading-loose opacity-80">
						Contact us with any of our products and we'll sort you
						out.
					</p>
				</div>

				<div className="mt-6 flex items-center gap-3">
					<a
						href="https://www.nicinsurance.co.tz/products"
						className="btn text-lg font-semibold py-3 px-6"
					>
						Book a tour now
					</a>
				</div>
			</div>
		</section>
	);
}
