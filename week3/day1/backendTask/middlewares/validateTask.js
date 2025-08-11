
/**
 * @swagger
 * components:
 *   schemas:
 *     TaskCreate:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the task
 *       example:
 *         title: "Buy groceries"
 * 
 *     TaskUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The updated title of the task (optional)
 *         completed:
 *           type: boolean
 *           description: Completion status of the task (optional)
 *       example:
 *         title: "Buy groceries and fruits"
 *         completed: true
 */

/**
 * Middleware to validate task input for POST and PUT requests
 * 
 * @swagger
 * /tasks:
 *   post:
 *     requestBody:
 *       description: Task creation payload
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskCreate'
 *   put:
 *     requestBody:
 *       description: Task update payload
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpdate'
 */

const validateTask = (req, res, next) => {
  const { title, completed } = req.body;

  if (req.method === "POST") {
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Title is required and must be a non-empty string",
      });
    }
  }

  if (req.method === "PUT" && title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({
        success: false,
        data: null,
        message: "If provided, title must be a non-empty string",
      });
    }
  }


  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Completed must be a boolean value",
      });
    }
  }

  next();
};

module.exports = validateTask;
