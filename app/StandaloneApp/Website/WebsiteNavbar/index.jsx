import { ServerOnly } from "remix-utils";
import { useStandaloneAppContext } from "~/StandaloneApp/StandaloneAppContext";
import SectionButtons from "~/StandaloneApp/components/SectionButtons";

export default function WebsiteNavbar() {
	const { app, currentPage, pageProps } = useStandaloneAppContext();
	const {
		appBar: _appBar,
		banner: _banner,
		bannerColor,
		scrollBehavior,
	} = pageProps;
	const appBar = _appBar?.settings;
	const banner = _banner?.settings;
	const showAppName = appBar?.showAppName ?? false;
	const activeLink = appBar?.activeLink ?? {
		showIndicator: true,
		useAppColorForText: false,
	};

	const layout = appBar.layout ?? "Regular";
	const links = appBar.links ?? [];
	const buttons = (appBar.buttons ?? []).filter(({ hidden }) => !hidden);
	const bgClass = "border-b border-[--border-color] bg-white dark:bg-black ";

	const scrollBehaviorClass =
		{
			Sticky: "sticky ",
			Lift: "Lift sticky ",
			Leave: "Leave absolute top-0 inset-x-0 ",
			Collapse: "absolute top-0 inset-x-0 ",
		}[scrollBehavior] ?? "";

	// @include('pier-website.navbar.mobile')

	const styles = () => {
		let styles = "";

		if (banner) {
			styles += `
				.Leave {
					background: transparent;
					border-color: transparent;
				}
			`;

			if (bannerColor != "inherit") {
				styles += `
					.Leave {
						color: ${bannerColor};
						--text-color: ${bannerColor};
						--inverted-text-color: ${bannerColor == "white" ? "black" : "white"};
					}

					.Lift:not(.scrolled) {
						color: ${bannerColor};
						--text-color: ${bannerColor};
						--inverted-text-color: ${bannerColor == "white" ? "black" : "white"};
					}
				`;
			}
		}

		return styles;
	};

	return (
		<>
			<style>
				{`
            .Lift:not(.scrolled) {
                background: transparent;
                border-color: transparent;
            }

            ${styles()}
        `}
			</style>
			<section
				id="mainNavigationMenu"
				className={`${bgClass} ${scrollBehaviorClass} hidden md:block z-50`}
				style={{ top: "-0.1px" }}
			>
				<div className="section-wrapper h-14 flex gap-8 justify-between">
					{layout != "Centered Logo" && (
						<a href="#" className="flex items-center gap-3">
							<img
								className="max-h-8 max-w-[130px]"
								src={app.icon}
								alt=""
							/>

							{showAppName && (
								<span className="text-base leading-none font-semibold">
									{app.name}
								</span>
							)}
						</a>
					)}

					<nav
						className={`${layout == "Left Nav" ? "mr-auto" : ""} ${
							layout == "Regular" ? "ml-auto" : ""
						} flex items-center`}
					>
						<ul className="relative z-50 flex items-center h-full gap-9">
							{links.map((link, index) => {
								const page = link.page;
								const url = page
									? `/app/${app.name}/${page}`
									: link.url;
								const selected = currentPage?.name == page;
								const underline = link.underline ?? false;
								let styling = "";

								if (selected) {
									styling = activeLink.showIndicator
										? "border-primary "
										: "border-transparent ";
									styling += activeLink.useAppColorForText
										? "text-primary "
										: "";
								} else {
									styling = "border-transparent ";

									if (underline)
										styling += underline
											? "underline "
											: "";
									else
										styling +=
											!activeLink.useAppColorForText
												? "opacity-50 "
												: "";
								}

								return (
									<li key={index} className="h-full">
										<a
											href={url}
											className={`${styling} text-sm uppercase tracking-wide font-bold flex items-center h-full px-1 border-b-2`}
										>
											<span>{link.label}</span>
										</a>
									</li>
								);
							})}
						</ul>
					</nav>

					{layout == "Centered Logo" && (
						<a
							href="https://ipfsoftwares.com"
							className="flex items-center gap-3"
						>
							<img className="h-8" src={app.icon} alt="" />

							{showAppName && (
								<span className="text-base leading-none font-semibold">
									{app.name}
								</span>
							)}
						</a>
					)}

					<SectionButtons buttons={buttons} small />
				</div>
			</section>

			<ServerOnly>{() => <script src="pier-nav.js"></script>}</ServerOnly>
		</>
	);
}
