import PageIcons, { pageIconChoices } from "~/components/PageIcons";
import { materialColors } from "~/utils";

export default function quickActionsSection() {
	return {
		index: 0,
		platform: "mobile",
		type: "quickActionsSection",
		name: "Quick Actions",
		fields: {
			text: {
				optional: true,
				type: "object",
				fields: {
					title: { type: "text", optional: true },
					subtitle: { type: "text", optional: true },
				},
				defaultValue: {
					title: "Apartments",
					subtitle:
						"The little things that actually boost your energy.",
				},
			},
			data: {
				type: "table",
				defaultValue: [
					{
						icon: "bell",
						color: "#ff9800",
						title: "Upcoming payments",
						link: "#",
					},
				],
				fields: {
					icon: {
						type: "radio",
						choices: pageIconChoices,
						renderChoice(icon, selected) {
							const Icon = PageIcons[icon];

							return (
								<span
									className={`peer-focus:ring-4 flex items-center justify-center aspect-square rounded p-1.5 relative border
										${selected ? "bg-content/10" : "border-transparent"}
									`}
								>
									<span className="w-6">
										<Icon />
									</span>
								</span>
							);
						},
						defaultValue: "bell",
					},
					color: {
						type: "radio",
						choices: Object.values(materialColors),
						renderChoice(color, selected) {
							return (
								<span
									className={`peer-focus:ring-4 flex items-center justify-center aspect-square rounded p-1.5 relative border
										${selected ? "bg-content/10" : "border-transparent"}
									`}
								>
									<span
										className="w-6 h-6 rounded-full"
										style={{ backgroundColor: color }}
									></span>
								</span>
							);
						},
						defaultValue: "#ff9800",
					},
					title: { type: "text", defaultValue: "Quick Action" },
					link: { type: "text", defaultValue: "#" },
				},
			},
		},
	};
}
