import { useFetcher } from "@remix-run/react";
import { useSpotlightContext } from "../SpotlightContext";
import PageIcons, { pageIconChoices } from "~/components/PageIcons";
import SpotlightNavigationButton from "../SpotlightComponents/SpotlightNavigationButton";

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
			index: pierAppData.pages.length,
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
			title: "Edit page",
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

	const reorderPages = (pages) => {
		const reorderedPages = pages.reduce(
			(agg, { id, index: oldIndex }, index) => {
				if (oldIndex == index) return agg;

				return [
					...agg,
					{
						pageId: id,
						index,
					},
				];
			},
			[]
		);

		if (reorderedPages.length) {
			fetcher.submit(
				{
					_action: "reorderPages",
					pages: JSON.stringify(reorderedPages),
				},
				{ method: "patch", action: "/app" }
			);
		}

		return pages;
	};

	return {
		addPage,
		editPage,
		reorderPages,
	};
};

export default function AppPages() {
	const { addPage, editPage, reorderPages } = useAppPages();
	const { pierAppData } = useSpotlightContext();

	if (!pierAppData?.pageProps) return;

	return (
		<SpotlightNavigationButton
			label="App pages"
			page={{
				type: "list",
				title: "App pages",
				value: pierAppData.pages.map((page) => ({
					...page,
					label: page.name,
				})),
				addAction: "Add page",
				onSelect: () => null,
				onReorder: reorderPages,
			}}
			onPop={(page) => {
				if (!page?.tempId) return;

				if (page.tempId == "Add page") return addPage();

				editPage(page);
			}}
		/>
	);
}
