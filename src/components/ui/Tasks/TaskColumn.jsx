import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from './TaskCard'

export default function TaskColumn({ droppableId, title, tasks, onDelete, onStatusChange, onEdit }) {
  return (
    <div className="bg-zinc-900 rounded-lg p-4 min-h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <div
          className={`rounded-full  px-2 text-white ${title.toLowerCase() === "to do"
              ? "bg-amber-600/75"
              : title.toLowerCase() === "in progress"
                ? "bg-yellow-500/75"
                : title.toLowerCase() === "done"
                  ? "bg-green-500/75"
                  : "bg-gray-400/75"
            }`}
        >
          <p>{tasks.length}</p>
        </div>
      </div>

      
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="flex-1">
            {tasks.map((task, index) => (
              <Draggable key={String(task.id)} draggableId={String(task.id)} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      marginBottom: "12px"
                    }}
                    className={`transition-shadow ${snapshot.isDragging ? "shadow-lg shadow-zinc-500/30" : ""}`}
                  >
                    <TaskCard
                      task={task}
                      onDelete={onDelete}
                      onStatusChange={onStatusChange}
                      onEdit={onEdit}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}