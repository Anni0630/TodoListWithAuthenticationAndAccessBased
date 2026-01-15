# 📝 TodoList Management System

A modern, secure, and visually premium Todo Management application built with **React + Vite** on the frontend and **NestJS** on the backend.

---

## 🚀 Tech Stack

### Frontend

* React
* Vite
* TanStack Query
* Tailwind CSS (Glassmorphism UI)

### Backend

* NestJS
* TypeORM
* Passport.js + JWT
* Bcrypt for password hashing

### Database

* SQLite (default)

---

## 📁 Project Structure

```
root/
 ├── frontend/   # React + Vite client
 ├── backend/    # NestJS API server
```

---

## ⚙️ Prerequisites

* Node.js (v18+ recommended)
* npm or yarn

---

## ▶️ How to Run the Project

### 1️⃣ Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

Backend will start at:

```
http://localhost:3000
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
```


Start frontend:

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 🔧 Important Configuration Note

❗ **Frontend and Backend run on different ports.**

| Service  | URL                                            |
| -------- | ---------------------------------------------- |
| Frontend | [http://localhost:5173](http://localhost:5173) |
| Backend  | [http://localhost:3000](http://localhost:3000) |

All API requests must point to the **backend URL**.

If the API base URL is not configured properly, requests may incorrectly hit the client URL (localhost:5173), causing the project to fail during execution.

---

## 🔐 Authentication

* JWT-based authentication
* Token stored securely on client
* Protected routes enforced via guards

---

## 📡 API Overview

### Auth

* POST `/auth/signup`
* POST `/auth/login`

### Todos

* GET `/todos`
* POST `/todos`
* PATCH `/todos/:id`
* DELETE `/todos/:id`

### Users

* GET `/users/profile`
* PATCH `/users/profile`
* DELETE `/users/profile`

---

## 🎨 UI Highlights

* Glassmorphism design
* Smooth animations
* Responsive layout
* Avatar-based personalization

---

## 📦 Deployment

* Easily containerizable
* Ready for cloud deployment

---

## ✅ Conclusion

This project demonstrates a clean full-stack architecture, secure authentication, and modern UI/UX practices suitable for real-world production systems.
