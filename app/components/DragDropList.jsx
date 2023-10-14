import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

const DragDropList = ({
	items,
	idKey = "_id",
	onChange,
	children,
	className,
}) => {
	const onDragEnd = (result) => {
		if (!result.destination) return;

		onChange(reorder(items, result.source.index, result.destination.index));
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable">
				{(provided) => (
					<div
						className={className}
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{items.map((item, index) => {
							console.log("Id: ", item[idKey]);

							return (
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
												provided.draggableProps.style
											)}
										>
											{children({ item })}
										</div>
									)}
								</Draggable>
							);
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default DragDropList;
