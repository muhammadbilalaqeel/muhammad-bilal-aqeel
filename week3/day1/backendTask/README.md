# Task Management Backend API

A simple RESTful API backend for managing tasks with Node.js and Express.  
Supports creating, reading, updating, deleting tasks, filtering by title, and fetching task statistics.  
Includes request validation middleware and comprehensive Swagger documentation.

---

## Features

- Get all tasks or filter tasks by partial title search (`GET /tasks?title=searchTerm`)
- Get task by ID (`GET /tasks/:id`)
- Create a new task (`POST /tasks`)
- Update task by ID (`PUT /tasks/:id`)
- Delete task by ID (`DELETE /tasks/:id`)
- Delete all tasks (`DELETE /tasks`)
- Get statistics about tasks (`GET /stats`)
- Request validation middleware for task data
- Swagger UI integration for API documentation

---

## Technologies Used

- Node.js
- Express
- **dotenv** — For managing environment variables
- **uuid** — For generating unique task IDs
- Swagger (OpenAPI) for API documentation
- Middleware for validation and error handling

---

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/muhammadbilalaqeel/muhammad-bilal-aqeel/tree/main/week3/day1/backendTask
