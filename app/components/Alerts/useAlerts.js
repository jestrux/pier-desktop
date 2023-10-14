import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useHydrated } from "remix-utils";

export default function useAlerts() {
	const hydrated = useHydrated();
	const showAlert = useRef(() => {});
	const confirm = useRef(() => {});

	useEffect(() => {
		if (!hydrated || !window.__alertsProvider) return;

		showAlert.current = window.__alertsProvider.showAlert;
		confirm.current = window.__alertsProvider.confirm;
	}, [hydrated]);

	const withToast = (promise, successMessage = "Success") => {
		toast.promise(promise, {
			loading: "Please wait...",
			success: successMessage,
			error: "Unknown error",
		});

		return promise;
	};

	return {
		toast,
		withToast,
		showAlert: (...args) => showAlert.current(...args),
		confirm: (...args) => confirm.current(...args),
	};
}
