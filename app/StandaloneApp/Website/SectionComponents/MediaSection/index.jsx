export default function MediaSection() {
	return (
		<section className="px-6 md:px-0 py-10 md:py-20">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col md:grid grid-cols-12 gap-20 items-center">
					<div className="aspect-[1/0.9] relative col-span-6 flex flex-col items-center text-center bg-primary text-white md:border md:rounded-2xl overflow-hidden">
						<img
							className="object-cover inset-0 w-full h-full"
							src="https://images.unsplash.com/photo-1682686580452-37f1892ee5e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwxfDF8YWxsfDExfHx8fHx8Mnx8MTY5NzM2MDg0NXw&ixlib=rb-4.0.3&q=80&w=900"
						/>
					</div>
					<div className="col-span-6 flex flex-col gap-4 text-lg/[2.5]">
						<h3 className="font-bold text-2xl md:text-4xl">
							Our Commitment
						</h3>

						<div>
							NIC invested in creating innovative solutions that
							guarantee the security and safety of your assets
							(your life and the life of your loved ones
							included). With our commitment to serve our
							customers.
						</div>

						<div>
							With our commitment to serve our customers with
							excellence and due diligence; rest assured knowing
							your desirable quality of life is safe and secure.
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
