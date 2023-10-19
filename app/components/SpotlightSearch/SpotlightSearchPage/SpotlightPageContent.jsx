import { useEffect, useRef } from "react";
import {
	ComboboxInput,
	ComboboxPopover,
	useComboboxContext,
} from "~/components/reach-combobox";
import useKeyDetector from "~/hooks/useKeyDetector";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import SettingsPage from "./SettingsPage";
import ActionPage from "./ActionPage";
import FormPage from "./FormPage";
import ListPage from "./ListPage";
import ImagePickerPage from "./ImagePickerPage";
import ColorPickerPage from "./ColorPickerPage";
import SpotlightPageActions from "./SpotlightPageActions";
import { ListPickerPage } from "../SpotlightComponents/ListPicker";

export default function SpotlightPageContent({
	open,
	placeholder,
	searchTerm,
	setSearchTerm,
	setNavigationValue,
	page = { type: "search" },
	onPopAll,
	onPop,
	onClose,
	children,
}) {
	const popoverTitleRef = useRef(null);
	const containerRef = useRef(null);
	const inputRef = useRef(null);
	const lastComboboxUpdate = useRef(Date.now());
	const comboboxData = useComboboxContext();

	const onKeyDown = (event) => {
		if (!event.isDefaultPrevented()) {
			const outerContainer = containerRef.current;
			if (!outerContainer) return;

			window.requestAnimationFrame(() => {
				const element = outerContainer.querySelector(
					"[aria-selected=true]"
				);
				if (!element) return;

				const container = element.closest("#popoverContent");

				if (container && element) {
					const top = element.offsetTop - container.scrollTop;
					const bottom =
						container.scrollTop +
						container.clientHeight -
						(element.offsetTop + element.clientHeight);

					if (bottom < 0) container.scrollTop -= bottom;
					if (top < 0) container.scrollTop += top;
				}
			});
		}
	};

	useEffect(() => {
		if (open) {
			inputRef.current.select();

			setTimeout(() => {
				if (page?.type == "form") {
					const firstInput = document.querySelector(
						"#popoverContent input, #popoverContent textarea"
					);
					if (firstInput) firstInput.focus();
				}
			}, 20);
		} else inputRef.current.blur();
	}, [open]);

	useEffect(() => {
		lastComboboxUpdate.current = Date.now();
	}, [comboboxData]);

	useEffect(() => {
		if (typeof comboboxData?.navigationValue != "function")
			setNavigationValue(comboboxData?.navigationValue);
	}, [comboboxData?.navigationValue]);

	const handleEscape = ({ close, popAll } = {}) => {
		const combobox = popoverTitleRef.current.closest(
			"#spotlightSearchWrapper"
		);
		if (document.querySelector(".pier-message-modal")) return;
		if (combobox.className.indexOf("pier-menu-open") != -1)
			return containerRef.current.focus();

		const delta = (Date.now() - lastComboboxUpdate.current) / 1000;
		if (delta > 0.3) {
			if (close) onClose();
			else if (inputRef.current.value.length) setSearchTerm("");
			else if (!popAll && typeof onPop == "function") onPop();
			else if (typeof onPopAll == "function") onPopAll();
			else onClose();
		}
	};

	useKeyDetector({
		key: "Escape",
		delayBy: 50,
		action: (e) => handleEscape({ popAll: e.shiftKey }),
	});

	useKeyDetector({
		key: "Cmd + /",
		delayBy: 50,
		action: () => handleEscape({ close: true }),
	});

	const handleSearchTermChange = (event) => {
		if (event.target.value === inputRef.current.value)
			setSearchTerm(event.target.value);
	};

	const renderPage = () => {
		const pageHasFields = Object.keys(page.fields ?? {}).length > 0;
		const pageHasAction =
			pageHasFields ||
			["action"].includes(page.type) ||
			page.hasAction ||
			page.secondaryAction;
		let content = children;

		if (page?.value?.length && page.type == "list")
			content = <ListPage page={page} />;

		if (page.type == "image")
			content = <ImagePickerPage value={page.value} />;

		if (page.type == "select") content = <ListPickerPage page={page} />;

		if (page.type == "color") content = <ColorPickerPage page={page} />;
		else if (pageHasFields) {
			if (page.type == "settings") content = <SettingsPage page={page} />;
			if (page.type == "form") content = <FormPage page={page} />;
		}

		if (pageHasAction)
			content = <ActionPage page={page}>{content}</ActionPage>;

		return content;
	};

	return (
		<>
			<div
				ref={popoverTitleRef}
				id="popoverTitle"
				className={`h-14 px-4 flex items-center ${
					comboboxData.isExpanded &&
					"border-b border-content/10 z-10 relative"
				}`}
			>
				{typeof onPop == "function" && (
					<button
						type="button"
						className="flex-shrink-0 -ml-1.5 mr-2.5 bg-content/10 rounded flex items-center justify-center w-7 h-7"
						onClick={() => onPop()}
					>
						<ArrowLeftIcon width={13} strokeWidth={3} />
					</button>
				)}

				{page?.type != "search" && page?.title && (
					<span className="w-full text-base font-bold">
						{page?.title || "Create Quicklink"}
					</span>
				)}

				<ComboboxInput
					ref={inputRef}
					className={`popover-input bg-transparent h-full w-full py-3 text-xl focus:outline-none placeholder-content/30
                        ${
							page?.type != "search" &&
							"position-fixed opacity-0 pointer-events-none"
						}
                    `}
					readOnly={["color"].includes(page.type)}
					placeholder={placeholder}
					value={searchTerm}
					onChange={handleSearchTermChange}
					autocomplete={false}
					selectOnClick
					onKeyDown={onKeyDown}
				/>

				<SpotlightPageActions page={page} />
			</div>

			<ComboboxPopover
				id="popoverContent"
				ref={containerRef}
				portal={false}
				className="-mt-0.5 relative overflow-y-auto max-h-[580px] focus:outline-none"
			>
				<div>
					{renderPage()}
					{/* {page.type == "form" ? (
                        <FormPage page={page}>{children}</FormPage>
                    ) : page.type == "action" ||
                      page.hasAction ||
                      page.secondaryAction ? (
                        <ActionPage page={page}>{children}</ActionPage>
                    ) : (
                        <div>{children}</div>
                    )} */}
				</div>
			</ComboboxPopover>
		</>
	);
}
