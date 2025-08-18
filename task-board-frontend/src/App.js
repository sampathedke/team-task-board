import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import TaskBoard from "./components/TaskBoard";
import AddTaskForm from "./components/AddTaskForm";

import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  const getDisplayName = () => {
    if (!currentUser) return "";
    const raw = currentUser.email.split("@")[0];
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  };

  return (
    <Routes>
      {!currentUser ? (
        <>
          <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          <Route
            path="/"
            element={
              <div className="container">
                <header className="header">
                  <div className="title-container">
                    <h2>Team Task Board</h2>
                    <small>– Manage your team's tasks efficiently</small>
                  </div>
                  <div className="user-section">
                    <span>Welcome, {getDisplayName()}</span>
                    <button className="logout-button" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </header>

                <AddTaskForm currentUser={currentUser} />
                <TaskBoard currentUser={currentUser} />
              </div>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default App;