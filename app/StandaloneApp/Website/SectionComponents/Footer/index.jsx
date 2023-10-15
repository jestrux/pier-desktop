export default function Footer() {
	return (
		<footer className="bg-primary text-[--primary-text-color] /80 relative z-10">
			<div className="max-w-7xl mx-auto pt-6 md:pt-12 pb-4 md:pb-10 leading-loose text-sm">
				<div className="text-center md:text-left md:grid grid-cols-12 gap-6">
					<div className="hidden pl-6 col-span-3 md:flex flex-col items-between md:items-start">
						<div className="flex flex-col gap-3">
							<h5 className="text-lg font-bold">
								About Us
							</h5>
							<p className="leading-[2.5]">
								The National Insurance Corporation was
								established in 1963 as first Insurance Company
							</p>
						</div>
					</div>

					<div className="col-span-3 md:flex flex-col items-between md:items-start ">
						<div className="flex flex-col gap-3">
							<h5 className="text-lg font-bold mb-2">
								Useful links
							</h5>

							<a href="https://www.nicinsurance.co.tz/intermediaries">
								Become an Agent / Broker
							</a>

							<a href="https://www.nicinsurance.co.tz/customer-feedback-form">
								Customer Feedback Form
							</a>
							<a href="https://www.nicinsurance.co.tz/news">
								Latest News
							</a>
						</div>
					</div>

					<div className="pt-8 md:pt-0 col-span-3 md:flex flex-col items-between md:items-start ">
						<div className="flex flex-col gap-3">
							<h5 className="text-lg font-bold">
								Our Head Office
							</h5>

							<p className="leading-[2.5]">
								NIC Insurance House,
								<br />
								Samora Avenue | Pamba Road,
								<br />
								Dar es Salaam. Tanzania
							</p>
						</div>
					</div>

					<div className="pt-8 md:pt-0 md:pl-8 col-span-3 flex flex-col items-center md:items-start">
						<div className="flex flex-col items-center md:items-start gap-3">
							<h5 className="text-lg font-bold">
								Contacts
							</h5>
							<a href="tel:0800110041">
								<p className="flex items-center gap-3">
									<svg
										className="w-4"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
											clipRule="evenodd"
										></path>
									</svg>
									080 0110 041
								</p>
							</a>
							<a href="mailto:info-nic@nictanzania.co.tz">
								<p className="flex items-center gap-3">
									<svg
										className="w-4"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z"></path>
										<path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z"></path>
									</svg>
									info-nic@nictanzania.co.tz
								</p>
							</a>

							<a
								href="https://twitter.com/nic_tanzania"
								target="blank"
							>
								<p className="flex items-center gap-3">
									<svg
										className="w-4"
										fill="currentColor"
										viewBox="0 0 512 512"
									>
										<path d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"></path>
									</svg>
									@nic_tanzania
								</p>
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
