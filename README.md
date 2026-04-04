# Assignment Kushal

A full-stack task management application built with a React frontend and a Node.js/Express backend. The project allows users to register, log in, create projects, and manage tasks inside each project.

## Features

- User registration and login with JWT authentication
- Protected routes for authenticated users
- Create, view, update, and delete projects
- Create, view, update, and delete tasks inside a project
- Task status support:
  - `pending`
  - `in-progress`
  - `completed`
- Due date support for tasks
- Health check endpoint for backend status
- Toast notifications in the frontend

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- React Toastify
- Lucide React

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv

## Project Structure

```bash
assignment_kushal/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── server.js
│   └── package.json
└── frontend/
    └── task-manager-frontend/
        ├── src/
        │   ├── components/
        │   ├── context/
        │   ├── pages/
        │   ├── services/
        │   └── assets/
        └── package.json
```

## Environment Variables

### Backend `.env`
Create a `.env` file inside the `Backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend `.env`
Create a `.env` file inside `frontend/task-manager-frontend` if needed:

```env
VITE_API_URL=http://localhost:5000
```

If `VITE_API_URL` is not set, the frontend defaults to:

```env
http://localhost:5000/api
```

## Installation

### 1. Install backend dependencies
```bash
cd Backend
npm install
```

### 2. Install frontend dependencies
```bash
cd frontend/task-manager-frontend
npm install
```

## Run the Project

### Start backend
```bash
cd Backend
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

### Start frontend
```bash
cd frontend/task-manager-frontend
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Projects
- `POST /api/projects`
- `GET /api/projects`
- `GET /api/projects/:id`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

### Tasks
- `POST /api/tasks/:projectId`
- `GET /api/tasks/:projectId`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Health Check
- `GET /health`

## Authentication

Protected backend routes require a bearer token in the request header:

```http
Authorization: Bearer <token>
```

The token is generated during login/register and stored in local storage on the frontend.

## Available Scripts

### Backend
```bash
npm run dev
npm start
```

### Frontend
```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Notes

- Backend requires a working MongoDB connection.
- The backend starts even if MongoDB is unreachable, but database routes will fail until the connection is available.
- No automated test setup is currently included in the project.

## Author

Kushal
