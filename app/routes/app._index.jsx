import { Link, useLoaderData } from "@remix-run/react";
import Standalone from "~/Standalone";
import DataTable from "~/components/DataTable";
import { queryModel } from "~/orm";

export const loader = async ({ params }) => {
	const {
		data: [app],
	} = await queryModel("pier_apps", { includeModelDetails: false });
	const { data: pages } = await queryModel("pier_pages", {
		includeModelDetails: false,
	});
	const { data: sections } = await queryModel("pier_sections", {
		includeModelDetails: false,
	});

	return {
		app,
		pages,
		sections,
	};
};

export default function Index() {
	const data = useLoaderData();

	return (
		<>
			<Standalone {...data} />
		</>
	);
}
