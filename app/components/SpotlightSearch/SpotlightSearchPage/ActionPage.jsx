import { Button } from "@chakra-ui/react";
import { Children, cloneElement, useRef } from "react";
import CommandKey from "~/components/CommandKey";
import useKeyDetector from "~/hooks/useKeyDetector";
import useAlerts from "~/components/Alerts/useAlerts";
import { useSpotlightContext } from "../SpotlightContext";

const getFallbackSecondaryActionHandler = ({
	page,
	confirm,
	popCurrentSpotlightPage,
}) => {
	let handler = () => popCurrentSpotlightPage(page.secondaryAction?.label);

	if (typeof page.secondaryAction?.onClick == "function") {
		const pageSecondaryActionHandler = page.secondaryAction.onClick;

		handler = async () => {
			let newData;

			if (page.secondaryAction?.destructive) {
				const res = await confirm({
					title: page.secondaryAction.label + "?",
					actionType: "danger",
					okayText:
						page.secondaryAction.confirmText || "Yes, Continue",
				});

				if (!res) return;
			}

			newData = await pageSecondaryActionHandler(page);

			popCurrentSpotlightPage({
				fromSecondaryAction: true,
				data: newData,
			});
		};
	}

	return handler;
};

const getFallbackActionHandler = ({ page, popCurrentSpotlightPage }) => {
	if (typeof page.action?.onClick == "function") {
		return async () => {
			const newData = await page.action?.onClick(page);
			popCurrentSpotlightPage(newData);
		};
	}

	return null;
};

export default function ActionPage({ page, children }) {
	const { popCurrentSpotlightPage } = useSpotlightContext();
	const { confirm } = useAlerts();
	const secondaryActionShortCut = page.secondaryAction?.shortCut || "Cmd + k";
	const secondaryActionButtonRef = useRef();
	const submitHandler = useRef(
		getFallbackActionHandler({
			page,
			popCurrentSpotlightPage,
		})
	);
	const secondaryActionHandler = useRef(
		getFallbackSecondaryActionHandler({
			page,
			confirm,
			popCurrentSpotlightPage,
		})
	);
	const onSubmit = (callback) => {
		submitHandler.current = callback;
	};
	const handleSubmit = () => {
		if (typeof submitHandler.current == "function") submitHandler.current();
	};
	const onSecondaryAction = (callback) => {
		secondaryActionHandler.current = callback;
	};
	const handleSecondaryAction = () => {
		if (typeof secondaryActionHandler.current == "function")
			secondaryActionHandler.current();
	};

	useKeyDetector({
		key: "Cmd + Enter",
		action: handleSubmit,
	});

	useKeyDetector({
		key: secondaryActionShortCut,
		action: () => {
			if (secondaryActionButtonRef.current)
				secondaryActionButtonRef.current.click();
		},
	});

	return (
		<>
			{Children.map(children, (child) =>
				cloneElement(child, {
					page,
					onSubmit,
					onSecondaryAction,
				})
			)}

			{(typeof submitHandler.current == "function" ||
				page?.secondaryAction?.label?.length) && (
				<div className="bg-card sticky bottom-0 h-11 px-3 flex gap-1 items-center justify-between border-t z-10">
					<div
						className={
							typeof submitHandler.current != "function"
								? "ml-auto -mr-2"
								: "-ml-2"
						}
					>
						{page?.secondaryAction && (
							<Button
								ref={secondaryActionButtonRef}
								className="gap-1"
								rounded="md"
								size="sm"
								variant="ghost"
								colorScheme={
									page.secondaryAction?.destructive && "red"
								}
								onClick={handleSecondaryAction}
							>
								<span className="mr-0.5 capitalize">
									{page.secondaryAction.label}
								</span>
								{secondaryActionShortCut
									.split(" + ")
									.map((key) => (
										<CommandKey key={key} label={key} />
									))}
							</Button>
						)}
					</div>

					{typeof submitHandler.current == "function" && (
						<Button
							className="gap-1 -mr-2"
							onClick={handleSubmit}
							rounded="md"
							size="sm"
							variant="ghost"
						>
							<span className="mr-0.5 capitalize">
								{page?.action?.label ||
									page?.action ||
									"Submit"}
							</span>

							<CommandKey label="Cmd" />

							<CommandKey label="Enter" />
						</Button>
					)}
				</div>
			)}
		</>
	);
}
