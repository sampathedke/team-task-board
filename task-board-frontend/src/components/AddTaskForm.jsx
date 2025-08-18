import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/AddTaskForm.css';

function AddTaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      description,
      priority,
      status: 'backlog',
      dueDate: dueDate + 'T00:00:00Z',
      assignee: { id: Number(assigneeId) }
    };

    axios.post('http://localhost:8080/api/tasks', requestBody)
      .then(() => {
        alert('Task created!');
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
        alert('Error creating task');
      });
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <h3>Create Task</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />

      <select
        value={assigneeId}
        onChange={e => setAssigneeId(e.target.value)}
        required
      >
        <option value="">Select Assignee</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.email}</option>
        ))}
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;