import { useStandaloneAppContext } from "~/StandaloneApp/StandaloneAppContext";

export default function Sidebar() {
	const { app } = useStandaloneAppContext();

	return (
		<aside className="flex-shrink-0">
			<div
				className="long-header"
				style={{
					fontSize: "20px",
					fontWeight: "bold",
					padding: "24px",
					paddingTop: "80px",
					backgroundColor: "var(--primary-color, #2c5282)",
					color: "white",
					display: "flex",
					flexDirection: "column",
					gap: "0.7rem",
				}}
			>
				<div className="w-16 h-16 p-3.5 bg-white rounded-full overflow-hidden flex items-center justify-center">
					<img src={app?.icon} alt="" className="w-full max-h-full" />
				</div>
				{app?.name ?? "Admin Panel"}
			</div>

			<ul>
				<li>
					<a href="#" className="active">
						Dashboard
					</a>
				</li>
				<li>
					<a href="#">Customers</a>
				</li>
			</ul>
		</aside>
	);
}
