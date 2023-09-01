import { Button, Text } from "@chakra-ui/react";
import Loader from "../Loader";
import TableColumn from "./TableColumn";
import TableHead from "./TableHead";

// const { API, toast, navigate } = useAppContext();

// const { isLoading, data } = useQuery(`${model?.name} table data`, () =>
// 	props.data ? props.data : API.get("/api/" + model?.name)
// );

// const dataPopulator = useMutation(
// 	(itemCount) =>
// 		API.post(`/model/${model?.name}/populate?item_count=${itemCount}`),
// 	{
// 		onSuccess: async () => {
// 			await navigate("/pier-admin/models/" + model?.name);
// 			toast.success("Data populated");
// 		},
// 		onError: (err) => {
// 			console.log("Error populating Data: ", err);
// 			toast.error(err?.message ? err.message : err);
// 		},
// 	}
// );

export default function DataTable({ model, fields, data }) {
	let visibleFields = model?.fields;
	if (fields?.length) {
		visibleFields = fields.map((field) =>
			visibleFields.find(({ label }) => label == field)
		);
	}

	const populateData = (count) => {};

	return (
		<table className="table w-full m-0" style={{ tableLayout: "fixed" }}>
			<thead className="capitalize">
				<tr>
					{visibleFields.map((field, i) => (
						<TableHead
							key={field.label + i}
							isFirst={i == 0}
							field={field}
						/>
					))}
				</tr>
			</thead>

			<tbody>
				{/* {isLoading || !data && (
					<tr>
						<td colSpan={model?.fields.length}>
							<span className="flex justify-center">
								<Loader />
							</span>
						</td>
					</tr>
				)} */}

				{!data?.length ? (
					<tr>
						<td colSpan={visibleFields.length}>
							<div className="p-3 flex flex-col items-center justify-center">
								<Text mb={4}>{model?.name} has no data</Text>

								<div className="flex items-center gap-4">
									{[5, 10, 25].map((count) => (
										<Button
											key={count}
											size="sm"
											isLoading={dataPopulator.isLoading}
											leftIcon={
												<svg
													className="w-3"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.49l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z" />
												</svg>
											}
											onClick={() => populateData(count)}
										>
											Populate {count} records
										</Button>
									))}
								</div>
							</div>
						</td>
					</tr>
				) : (
					<>
						{data.map((row) => {
							return (
								<tr id={`row${row._id}`} key={row._id}>
									{visibleFields.map((field, i) => (
										<TableColumn
											key={field.label + i}
											isFirst={i == 0}
											field={field}
											value={row[field.label]}
										/>
									))}
								</tr>
							);
						})}
					</>
				)}
			</tbody>
		</table>
	);
}
