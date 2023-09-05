import { Link, useLoaderData } from "@remix-run/react";
import { queryModel } from "~/server/orm";

export const loader = async () => {
	return await queryModel("pier", { includeModelDetails: false });
};

export default function Index() {
	const { data } = useLoaderData();

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
