import { useReducer, useRef } from "react";
import { useHydrated } from "remix-utils";

export default function useFocusCapture() {
	const hydrated = useHydrated();
	const [, reRender] = useReducer((x) => x + 1, 0);
	const restoreFocus = useRef(() => {});
	const captureFocus = () => {
		if (hydrated) {
			const el = document.activeElement;
			restoreFocus.current = () => el.focus();
			reRender();
		}
	};

	return {
		captureFocus,
		restoreFocus: restoreFocus.current,
	};
}
