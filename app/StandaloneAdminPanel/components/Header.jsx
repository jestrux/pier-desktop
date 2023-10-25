export default function Header() {
	return (
		<header id="mainNav">
			<span id="pageTitle" className="mr-2 font-bold">
				Dashboard
			</span>
			<a
				href="#/About Us Numbers/list/add"
				className="px-4 py-2 border border-current flex font-semibold gap-1 items-center rounded-full text-primary text-sm leading-none hover:bg-neutral-200/50"
			>
				<svg
					height="18px"
					fill="currentColor"
					viewBox="0 0 24 24"
					className="-ml-1"
				>
					<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
				</svg>
				<span className="lowercase first-letter:uppercase inline-block">
					New entry
				</span>
			</a>
			<span className="flex-1"></span>
			<div className="mr-8 flex gap-4 items-center">
				<div className="relative hidden">
					<button
						id="showFiltersButton"
						className="rounded-md border-2 py-1 px-2 flex items-center focus:outline-none"
					>
						<svg
							fill="#888"
							width="24"
							height="24"
							viewBox="0 0 24 24"
						>
							<path d="M7,6h10l-5.01,6.3L7,6z M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6 c0,0,3.72-4.8,5.74-7.39C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z" />
						</svg>
						<svg viewBox="0 0 24 24" className="h-4 w-4 ml-1">
							<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
						</svg>
					</button>
					<div
						id="filterDropdown"
						className="popover-custom shadow-md rounded-md absolute hidden"
						style={{
							"will-change": "top, left; top: 5px; left: -280px",
						}}
					>
						<div className="p-3 flex flex-col gap-2"></div>
						<div className="h-8 flex items-center px-3 bg-neutral-100 rounded-b-md">
							<button className="underline text-xs font-semibold">
								Reset filters
							</button>
						</div>
					</div>
				</div>
				<div className="relative rounded-full">
					<svg
						fill="#aaa"
						className="absolute inset-y-0 ml-3 my-auto inset-left-0 w-6 h-6"
					>
						<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
					</svg>
					<input
						type="search"
						placeholder="Type to search..."
						className="min-w-[250px] rounded-full py-1 pl-10 pr-3 border border-gray-500 outline-none"
					/>
				</div>
			</div>
		</header>
	);
}
