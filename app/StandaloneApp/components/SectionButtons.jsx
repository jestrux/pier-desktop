import { useStandaloneAppContext } from "../StandaloneAppContext";

export default function SectionButtons({ buttons, small }) {
	const { app } = useStandaloneAppContext();
	buttons = buttons.filter(({ hidden }) => !hidden);

	if (!buttons?.length) return null;

	return (
		<div className="flex items-center gap-3">
			{buttons.map((button, index) => {
				const useAppColor = button.useAppColor;
				let styling = "";
				switch (button.style) {
					case "Filled":
						styling = !useAppColor
							? "bg-black dark:bg-white text-white dark:text-black "
							: "bg-[--primary-color] text-[--primary-text-color] ";
						styling += "shadow hover:opacity-90 ";

						break;

					case "Outline":
						styling = !useAppColor ? "" : "text-primary ";
						styling += "relative ";

						break;

					default:
						styling = "hover:underline hover:opacity-90 ";
						break;
				}

				const cornerRadius = {
					none: "rounded-none",
					regular: "rounded-md",
					full: "rounded-full",
				}[app.settings.roundedCorners];

				styling += `${cornerRadius} `;

				styling += small ? "h-9 px-4 text-sm font-semibold " : "h-12 px-6 font-bold ";

				return (
					<a
						key={index}
						href="#"
						className={`${styling} group min-w-[80px] flex items-center justify-center text-center focus:outline-none`}
					>
						{button.style == "Outline" && (
							<span
								className={`${cornerRadius} absolute inset-0 opacity-50 border border-current`}
							>
								<span
									className={`${cornerRadius} block w-full h-full opacity-0 group-hover:opacity-25 bg-current`}
								></span>
							</span>
						)}
						{button.label}
					</a>
				);
			})}
		</div>
	);
}
