# Todo Backend (NestJS)

## Features
- JWT Authentication (Login, Signup, Logout)
- Role-Based Access Control (USER, ADMIN)
- PostgreSQL with TypeORM
- Soft Delete for User Accounts
- Pagination for Todos

## Setup
1. `npm install`
2. Configure `.env` with your PostgreSQL credentials.
3. `npm run start:dev`

## API Endpoints
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login and get JWT token
- `GET /users/profile` - Get current user profile
- `PATCH /users/profile` - Update profile
- `DELETE /users/profile` - Soft delete account
- `GET /todos` - Get paginated todos
- `POST /todos` - Create a todo
- `PATCH /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo
- `GET /users` - List all users (Admin only)
