export default function Standalone({ app, pages, sections }) {
	return (
		<main className="p-3 text-yellow-500">
			<div className="flex items-center gap-3 mb-4">App</div>
			<h1 className="mb-5 text-3xl font-bold text-blue-100">
				{app.name}
			</h1>
		</main>
	);
}
