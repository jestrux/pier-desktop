import { useFetcher } from "@remix-run/react";
import SpotlightListItem from "../SpotlightComponents/SpotlightListItem";
import SpotlightListSection from "../SpotlightComponents/SpotlightListSection";
import { useSpotlightContext } from "../SpotlightContext";
import PageIcons, { pageIconChoices } from "~/components/PageIcons";
import { PlusIcon } from "@heroicons/react/24/outline";

const useAppPages = () => {
	const fetcher = useFetcher();
	const { pushSpotlightPage, pierAppData } = useSpotlightContext();
	const fields = {
		name: {
			type: "text",
			defaultValue: "New page",
		},
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
			defaultValue: "home",
		},
	};

	const addPage = () => {
		const payload = {
			name: "New page",
			icon: "bolt",
			settings: JSON.stringify({
				layout: "default",
			}),
			appId: pierAppData.app.id,
			_action: "addPage",
		};

		const listenForNewEntry = (e) => {
			editPage(e.detail.pages.at(-1));

			document.removeEventListener(
				"pier:app-data-changed",
				listenForNewEntry,
				false
			);
		};

		document.addEventListener(
			"pier:app-data-changed",
			listenForNewEntry,
			false
		);

		fetcher.submit(payload, {
			method: "post",
			action: "/app",
		});
	};

	const editPage = (page, deletable = true) => {
		pushSpotlightPage({
			title: "Edit " + page.name,
			secondaryAction: !deletable
				? null
				: {
						label: "Remove " + page.name,
						destructive: true,
						confirmText: "Remove",
						onClick: () => {
							return fetcher.submit(
								{
									pageId: page.id,
								},
								{ method: "delete", action: "/app" }
							);
						},
				  },
			type: "form",
			fields,
			values: page,
			onSave: async (value) => {
				if (!value) return;

				const { name, icon } = value;
				console.log("On save:", value);
				fetcher.submit(
					{
						pageId: page.id,
						name,
						icon,
						// settings: JSON.stringify(value),
						_action: "editPage",
					},
					{ method: "patch", action: "/app" }
				);
			},
		});
	};

	return {
		addPage,
		editPage,
		fields,
	};
};

export default function AppPages() {
	const { addPage, editPage } = useAppPages();
	const { pierAppData } = useSpotlightContext();

	if (!pierAppData?.pageProps) return;

	return (
		<SpotlightListSection title="App pages">
			{pierAppData.pages.map((page, index) => {
				const selected = pierAppData.currentPage?.id == page.id;
				const Icon =
					selected && PageIcons[page.icon + "-filled"]
						? PageIcons[page.icon + "-filled"]
						: PageIcons[page.icon];

				return (
					<SpotlightListItem
						key={page.id}
						label={page.name}
						value={page.id}
						onSelect={() => editPage(page, index)}
						leading={<Icon width={20} />}
						trailing={SpotlightListItem.NavIcon}
					/>
				);
			})}

			<SpotlightListItem
				className="text-primary"
				value="Add Page"
				leading={<PlusIcon width={20} />}
				trailing={SpotlightListItem.NavIcon}
				onSelect={addPage}
			/>
		</SpotlightListSection>
	);
}
