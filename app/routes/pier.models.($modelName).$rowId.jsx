import { Link, useLoaderData } from "@remix-run/react";
import TableColumn from "~/components/DataTable/TableColumn";
import { currentAppDatabase } from "~/server/db.server";

export const loader = async ({ params }) => {
	try {
		const { queryModel } = await currentAppDatabase();
		return await queryModel(params.modelName, {
			rowId: params.rowId,
		});
	} catch (error) {
		return { data: null, model: null };
	}
};

export default function Index() {
	const { data, model } = useLoaderData();

	return (
		<main className="p-3">
			<div className="flex items-center gap-3 mb-4">
				<Link to="/">Home</Link> /
				<Link to={`/pier/models/${model.name}`}>{model.name}</Link>
			</div>
			<h1 className="mb-5 text-3xl font-bold">
				{data[model.display_field]}
			</h1>

			<table
				className="table w-full m-0"
				style={{ tableLayout: "fixed" }}
			>
				<thead className="capitalize">
					<tr>
						<th className="pl-1 text-sm py-0 truncate border-b border-content/30 text-left">
							Column
						</th>
						<th className="text-sm py-0 truncate border-b border-content/30 text-left">
							Value
						</th>
					</tr>
				</thead>
				<tbody>
					{model.fields.map((field, i) => (
						<tr key={field.label + i}>
							<td className="border-b border-content/10 pl-1">
								{field.label}
							</td>

							<TableColumn
								isFirst={i == 0}
								alignLeft
								field={field}
								value={data[field.label]}
							/>
						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
}
