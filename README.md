# Team Task Board

*A simple Kanban-style task board for small teams — helps track tasks, assignees and progress across Backlog, In Progress, Review and Done.*
---
## 🛠 Tech Stack

Layer      Technology               
-------------------------------------
 Backend    - Java (Spring Boot)       
 Frontend   - React                    
 Database   - MySQL                    

## Features

- User Signup / Login / Logout (basic auth)
- Create task with title, description, priority, assignee and due date
- **Drag & Drop** tasks across Backlog → In Progress → Review → Done
- **Color-coded badges** for:
  - Status (On Track / At Risk / Overdue / Done)
  - Column headers (Backlog = Gray, In Progress = Blue, Review = Amber, Done = Green)
  - Priority (Low = Gray, Medium = Orange, High = Red)
- Add comments to tasks
- Filter by Priority + “My Tasks” view
- Data persisted (survives page refresh)

## Live URLs

| URL type  Link 
|----------------
| Frontend (React)
| Backend (Spring Boot)

## Database Schema

| Table   | Fields |
|---------|-----------------------------------------------------------|
| **users**    | `id (PK)` • `email` • `passwordHash` |
| **tasks**    | `id (PK)` • `title` • `description` • `priority` • `assignee_id (FK)` • `status` • `dueDate` • `createdAt` • `updatedAt` |
| **comments** | `id (PK)` • `task_id (FK)` • `author_id (FK)` • `body` • `createdAt` |
--
## API Endpoints

| Method | Endpoint                        | Description                        |
|--------|---------------------------------|-------------------------------------|
| POST   | `/api/users/signup`             | Register a user                     |
| POST   | `/api/users/login`              | Login a user                        |
| GET    | `/api/tasks`                    | Get all tasks                       |
| POST   | `/api/tasks`                    | Create new task                     |
| PUT    | `/api/tasks/{id}`               | Update existing task                |
| GET    | `/api/tasks/{id}`               | Get single task + details           |
| POST   | `/api/tasks/{id}/comments`      | Add comment to task                 |
| GET    | `/api/tasks/{id}/comments`      | Get comments for a task             |

---

##  Local Setup

### 1. Clone project

```bash
git clone https://github.com/sampathedke/team-task-board.git
cd team-task-board
```

### 2. Backend (Spring Boot)

```bash
cd backend
# update application.properties with your MySQL credentials
./mvnw spring-boot:run
```

👉 `application.properties` (update values)

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskboard
spring.datasource.username=root
spring.datasource.password=yourpassword
```

### 3. Frontend (React)

```bash
cd frontend
npm install
npm start
```

---

## ⚖️ Tradeoffs & Improvements

- Any user can still edit a backlog task (no strict access control)
- Would apply css and styling for more impressive and modern looking.
- Would add role separation (Admin / Member) and WebSocket-based real-time board updates if more time was available

---

_Thank you for reviewing this project 🙂_
