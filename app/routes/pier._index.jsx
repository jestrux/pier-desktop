import { Link, useLoaderData } from "@remix-run/react";
import { currentAppDatabase } from "~/server/db.server";

export const loader = async () => {
	let models;

	try {
		const { queryModel } = await currentAppDatabase();
		models = await queryModel("pier", { includeModelDetails: false });
	} catch (error) {
		console.log("Pier: Error fetching models: ", error);
		models = [];
	}

	return models;
};

export default function Index() {
	const data = useLoaderData();

	return (
		<main className="p-5">
			<h1 className="mb-5 text-3xl font-bold">Models</h1>

			<table
				className="table w-full m-0"
				style={{ tableLayout: "fixed" }}
			>
				<tbody>
					{(data ?? []).map((model, index) => (
						<tr key={index}>
							<td className="border-b border-content/10">
								<Link to={`models/${model.name}`}>
									{model.name}
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
}
