import { MessageModal } from "~/components/Modal";
import { Button } from "@chakra-ui/react";
import AlertsProvider, { useAlertsContext } from "./AlertsProvider";
import { useEffect } from "react";
import { useHydrated } from "remix-utils";
import { Toaster } from "react-hot-toast";

function AlertsContent() {
	const { alerts, hideAlert, showAlert, confirm } = useAlertsContext();
	const hydrated = useHydrated();

	useEffect(() => {
		if (!hydrated) return;

		window.__alertsProvider = {
			showAlert,
			confirm,
		};
	}, [hydrated]);

	function handleClose(alert, action) {
		const alertId = alert.id;

		alert.callback(action);

		setTimeout(() => hideAlert(alertId), 100);
	}

	function renderActions(alert) {
		return (
			<div className="w-full flex gap-2">
				<Button
					className="flex-1"
					rounded="md"
					size="sm"
					onClick={() => handleClose(alert, alert.actions[0])}
				>
					<span className="opacity-60">{alert.actions[0]}</span>
				</Button>

				<Button
					className="flex-1"
					rounded="md"
					size="sm"
					onClick={() => handleClose(alert, alert.actions[1])}
				>
					<span
						className={
							alert.actionType == "danger" ? "text-red-500" : ""
						}
					>
						{alert.actions[1]}
					</span>
				</Button>
			</div>
		);
	}

	return (
		<>
			{alerts.map((alert) => (
				<MessageModal
					key={alert.id}
					isOpen={alert.open}
					size={alert.size}
					title={alert.title}
					message={alert.message}
					hideCloseButton
					actions={renderActions(alert)}
					onClose={() => handleClose(alert, alert.actions[0])}
				/>
			))}
		</>
	);
}

export default function AlertsWrapper() {
	return (
		<>
			<AlertsProvider>
				<AlertsContent />
			</AlertsProvider>

			<Toaster
				toastOptions={{
					className:
						"bg-card text-content rounded-full text-sm border",
				}}
			/>
		</>
	);
}
