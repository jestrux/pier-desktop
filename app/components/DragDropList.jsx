import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ClientOnly } from "remix-utils";
import { objectFieldChoices } from "~/utils";

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
	userSelect: "none",
	...draggableStyle,
});

const StrictModeDroppable = ({ children, ...props }) => {
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		const animation = requestAnimationFrame(() => setEnabled(true));

		return () => {
			cancelAnimationFrame(animation);
			setEnabled(false);
		};
	}, []);

	if (!enabled) return null;

	return <Droppable {...props}>{children}</Droppable>;
};

const DragDropList = ({
	items,
	idKey = "value",
	onChange,
	children,
	className,
}) => {
	const onDragEnd = (result) => {
		if (!result.destination) return;

		onChange(reorder(items, result.source.index, result.destination.index));
	};

	return (
		<ClientOnly>
			{() => (
				<DragDropContext onDragEnd={onDragEnd}>
					<StrictModeDroppable droppableId="droppable">
						{(provided) => (
							<div
								className={className}
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{objectFieldChoices(items).map(
									(item, index) => (
										<Draggable
											key={item[idKey]}
											draggableId={item[idKey]}
											index={index}
										>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={getItemStyle(
														snapshot.isDragging,
														provided.draggableProps
															.style
													)}
												>
													{children({ item })}
												</div>
											)}
										</Draggable>
									)
								)}

								{provided.placeholder}
							</div>
						)}
					</StrictModeDroppable>
				</DragDropContext>
			)}
		</ClientOnly>
	);
};

export default DragDropList;
