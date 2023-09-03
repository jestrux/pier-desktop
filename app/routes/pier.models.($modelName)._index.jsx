import { Link, useLoaderData } from "@remix-run/react";
import DataTable from "~/components/DataTable";
import { queryModel } from "~/orm";

export const loader = async ({ params }) => {
	return await queryModel(params.modelName);
};

export default function Index() {
	const { data, model } = useLoaderData();

	return (
		<main className="p-3">
			<div className="flex items-center gap-3 mb-4">
				<Link to="/">Home</Link>
			</div>
			<h1 className="mb-5 text-3xl font-bold">{model.name}</h1>

			<DataTable model={model} data={data} />

			{/* <ul>
				{(data ?? []).map((model, index) => (
					<li key={index}>
						<Link to={`/models/${model.name}`}>{model.name}</Link>
					</li>
				))}
			</ul> */}
		</main>
	);
}
