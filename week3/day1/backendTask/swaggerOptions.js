// swaggerOptions.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task API",
      description: "API for managing tasks (CRUD + stats)",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://day1-fxr51tvdq-muhammad-bilal-aqeels-projects.vercel.app/api",
        description: "Production development server",
      },
      {
        url: "http://localhost:5000/api",
        description: "Local development server",
      },
    ],
    paths: {
      "/tasks": {
        get: {
          summary: "Get all tasks",
          tags: ["Tasks"],
          responses: {
            200: {
              description: "List of tasks",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Task" },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create a new task",
          tags: ["Tasks"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/TaskInput" },
              },
            },
          },
          responses: {
            201: {
              description: "Task created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Task" },
                },
              },
            },
            400: { description: "Invalid task data" },
          },
        },
        delete: {
          summary: "Delete all tasks",
          tags: ["Tasks"],
          responses: {
            200: { description: "All tasks deleted successfully" },
          },
        },
      },
      "/tasks/{id}": {
        get: {
          summary: "Get a task by ID",
          tags: ["Tasks"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Task found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Task" },
                },
              },
            },
            404: { description: "Task not found" },
          },
        },
        put: {
          summary: "Update a task by ID",
          tags: ["Tasks"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/TaskInput" },
              },
            },
          },
          responses: {
            200: {
              description: "Task updated successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Task" },
                },
              },
            },
            404: { description: "Task not found" },
          },
        },
        delete: {
          summary: "Delete a task by ID",
          tags: ["Tasks"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Task deleted successfully" },
            404: { description: "Task not found" },
          },
        },
      },
      "/stats": {
        get: {
          summary: "Get task statistics",
          tags: ["Tasks"],
          responses: {
            200: {
              description: "Task statistics",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      total: { type: "integer" },
                      completed: { type: "integer" },
                      pending: { type: "integer" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Task: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            completed: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        TaskInput: {
          type: "object",
          required: ["title"],
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            completed: { type: "boolean" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js", "./controllers/*.js", "./middlewares/*.js"], // optional, if you use annotations
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
