import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

import "../styles/TaskColumn.css";

function TaskColumn({ status, tasks, currentUser }) {
  const columnTasks = tasks.filter(t => t.status === status);

  return (
    <div className="task-column">
      <h3 className="column-title">
  {status.toUpperCase().replace("_"," ")}{" "}
  <span className={`badge-col badge-${status}`}></span>
</h3>

      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="task-column-droppable"
          >
            {columnTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                currentUser={currentUser}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TaskColumn;