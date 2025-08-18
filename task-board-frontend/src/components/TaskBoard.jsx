import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskColumn from "./TaskColumn";
import { DragDropContext } from "@hello-pangea/dnd";

import "../styles/TaskBoard.css";

function TaskBoard({ currentUser, showOnlyMine }) {
  const [tasks, setTasks] = useState([]);
  const [filterPriority, setFilterPriority] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId &&
        destination.index === source.index) return;

    const id = parseInt(draggableId);
    const task = tasks.find(t => t.id === id);
    if (task.status !== destination.droppableId) {
      const updatedTask = { ...task, status: destination.droppableId };
      axios.put(`http://localhost:8080/api/tasks/${id}`, updatedTask)
           .then(() => window.location.reload());
    }
  };

  const filtered = tasks.filter(t => {
    if (filterPriority && t.priority !== filterPriority) return false;
    if (showOnlyMine && t.assignee?.id !== currentUser.id) return false;
    return true;
  });

  return (
    <>
      <div className="taskboard-filter">
        <label htmlFor="priority-filter">Filter by priority:</label>
        <select
          id="priority-filter"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="taskboard-columns">
          <TaskColumn status="backlog" tasks={filtered} currentUser={currentUser} />
          <TaskColumn status="in_progress" tasks={filtered} currentUser={currentUser} />
          <TaskColumn status="review" tasks={filtered} currentUser={currentUser} />
          <TaskColumn status="done" tasks={filtered} currentUser={currentUser} />
        </div>
      </DragDropContext>
    </>
  );
}

export default TaskBoard;