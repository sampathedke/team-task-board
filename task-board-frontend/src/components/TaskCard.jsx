import React, { useState } from "react";
import axios from "axios";
import { Draggable } from "@hello-pangea/dnd";

import "../styles/TaskCard.css";

export default function TaskCard({ task, index, currentUser }) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [cBody, setCBody] = useState("");

  const badge = () => {
    const d = new Date(task.dueDate),
      n = new Date();
    if (task.status === "done") return { t: "Done", c: "text-green-500" };
    if (n > d) return { t: "Overdue", c: "text-red-500" };
    return (d - n) / 3600000 <= 24
      ? { t: "At Risk ⚠", c: "text-orange-400" }
      : { t: "On Track", c: "text-green-400" };
  };

  const name = (e) =>
    e ? e.split("@")[0].replace(/^\w/, (c) => c.toUpperCase()) : "";

  const loadComments = () => {
    axios
      .get(`http://localhost:8080/api/tasks/${task.id}/comments`)
      .then((r) => setComments(r.data || []));
  };

  const add = () => {
    axios
      .post(
        `http://localhost:8080/api/tasks/${task.id}/comments`,
        null,
        {
          params: { authorId: currentUser.id, body: cBody },
        }
      )
      .then(() => {
        setCBody("");
        loadComments();
      });
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(p) => (
        <div
          ref={p.innerRef}
          {...p.draggableProps}
          {...p.dragHandleProps}
          className="task-card"
          onClick={() => {
            setOpen(true);
            loadComments();
          }}
        >
          <strong>{task.title}</strong>
          <br />
          <small>Assignee: {name(task.assignee?.email)}</small>
          <br />
          <small>
                Priority: <span className={`badge-pill badge-${task.priority}`}>{task.priority}</span>
          </small>
          <br/>
          <small>Due: {task.dueDate?.substring(0, 10)}</small>
          <br />
          <span className={`badge-pill badge-status-${badge().t.replace(" ","").toLowerCase()}`}>
            {badge().t}
          </span>


          {open && (
            <div className="modal-overlay">
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>
                  <strong>Status:</strong> {task.status}
                </p>
                <p>
                  <strong>Assignee:</strong> {name(task.assignee?.email)}
                </p>
                <p>
                  <strong>Priority:</strong> {task.priority}
                </p>
                <p>
                  <strong>Due:</strong> {task.dueDate?.substring(0, 10)}
                </p>

                {task.status === "backlog" && (
                  <>
                    <h4>Edit</h4>
                    <input
                      defaultValue={task.title}
                      onChange={(e) => (task.title = e.target.value)}
                    />
                    <br />
                    <textarea
                      defaultValue={task.description}
                      onChange={(e) => (task.description = e.target.value)}
                    />
                    <br />
                    <select
                      defaultValue={task.priority}
                      onChange={(e) => (task.priority = e.target.value)}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <br />
                    <input
                      type="date"
                      defaultValue={task.dueDate.substring(0, 10)}
                      onChange={(e) => (task.dueDate = e.target.value + "T00:00:00")}
                    />
                    <br />
                    <button
                      onClick={() => {
                        axios
                          .put(`http://localhost:8080/api/tasks/${task.id}`, task)
                          .then(() => window.location.reload());
                      }}
                    >
                      Save
                    </button>
                  </>
                )}

                <h4>Comments</h4>
                {comments.map((c, i) => (
                  <div key={i}>
                    <strong>{name(c.author?.email)}: </strong>
                    {c.body}
                  </div>
                ))}
                <input
                  value={cBody}
                  onChange={(e) => setCBody(e.target.value)}
                  placeholder="Add a comment"
                />
                <button onClick={add}>Add</button>
                <br />
                <br />
                <button onClick={() => setOpen(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}