import { useFetcher } from "@remix-run/react";
import { useSpotlightContext } from "../SpotlightContext";
import SpotlightNavigationButton from "../SpotlightComponents/SpotlightNavigationButton";
import SpotlightListItem from "../SpotlightComponents/SpotlightListItem";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function ManageApps() {
	const { pierAppData, pushSpotlightPage } = useSpotlightContext();
	const fetcher = useFetcher();

	if (!pierAppData?.apps) return;

	const toggleApp = (app, status) => {
		const active = status ?? !app.active;
		fetcher.submit(
			{ appId: app.id, active },
			{
				method: "patch",
				action: "/apps",
			}
		);
	};

	const editApp = (app) => {
		pushSpotlightPage({
			title: "Edit " + app.name,
			type: "action",
			action: {
				label: app.active ? "Close App" : "Open App",
				onClick: () => toggleApp(app),
			},
			secondaryAction: {
				label: "Remove " + app.name,
				destructive: true,
				confirmText: "Remove",
				onClick: () => {
					return fetcher.submit(
						{
							appId: app.id,
						},
						{ method: "delete", action: "/apps" }
					);
				},
			},
			// fields: getPageSection(section.type)?.fields,
			// values: section.settings,
			onChange: async (value) => {
				fetcher.submit(
					{
						appId: app.id,
						value,
					},
					{ method: "patch", action: "/apps" }
				);
			},
		});
	};

	const addApp = async (type) => {
		if (!type) return;

		const listenForNewEntry = (e) => {
			editApp(e.detail.apps.at(-1));

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

		fetcher.submit(
			{ type },
			{
				method: "post",
				action: "/apps",
			}
		);
	};

	return (
		<>
			{pierAppData.apps.map((app) => (
				<SpotlightListItem
					key={app.id}
					label={app.name}
					value={app.id}
					onSelect={async () => {
						if (!pierAppData.app) {
							console.log("App: ", pierAppData.app);
							toggleApp(app, true);
							setTimeout(() => {
								editApp({ ...app, active: true });
							}, 90);
							return;
						}

						editApp(app);
					}}
					trailing={SpotlightListItem.NavIcon}
				/>
			))}

			<SpotlightNavigationButton
				className="text-primary"
				leading={<PlusIcon width={20} />}
				label="Add App"
				page={{
					title: "Select App Type",
					type: "select",
					fields: [
						{ label: "Website", value: "website" },
						{ label: "Mobile App", value: "mobileApp" },
						{ label: "Admin Panel", value: "adminPanel" },
					],
				}}
				onPop={addApp}
			/>
		</>
	);
}
