/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";
import { randomId } from "~/utils";

export const AlertsContext = createContext({
	alerts: [],
	confirm: () => {},
	showAlert: () => {},
	hideAlert: () => {},
});

export function useAlertsContext() {
	return useContext(AlertsContext);
}

export default function AlertsProvider({ children }) {
	const [alerts, setAlerts] = useState([]);

	const hideAlert = (alertId) => {
		setAlerts(
			alerts.map((alert) => {
				if (alert.id === alertId) return { ...alert, open: false };
				return alert;
			})
		);

		setTimeout(() => {
			setAlerts(alerts.filter(({ id }) => id !== alertId));
		}, 300);
	};

	const showAlert = (alert) => {
		setAlerts([
			...(alerts || []),
			{
				...alert,
				id: randomId(),
				open: true,
			},
		]);
	};

	function confirm(userProps = {}) {
		return new Promise((resolve) => {
			const alert = {
				type: "confirm",
				size: "xs",
				title: "Are you sure?",
				message: "This action can not be undone",
				cancelText: "Cancel",
				okayText: "Yes, Continue",
				...(userProps || {}),
			};

			alert.actions = [alert.cancelText, alert.okayText];
			alert.callback = (action) => resolve(action == alert.actions[1]);

			showAlert(alert);
		});
	}

	const value = {
		alerts,
		confirm,
		showAlert,
		hideAlert,
	};

	return (
		<AlertsContext.Provider value={value}>
			{children}
		</AlertsContext.Provider>
	);
}
