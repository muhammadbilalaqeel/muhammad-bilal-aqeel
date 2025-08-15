const express = require("express");
const { body } = require("express-validator");
const { register, login } = require("../controllers/userController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Route Working");
});

router.post(
  "/register",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least of 3 characters")
      .isLength({ max: 20 })
      .withMessage("Name must be less than 20 characters"),

    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email address"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least of 6 characters")
      .isLength({ max: 40 })
      .withMessage("Password must be less than 40 characters"),

    body("role")
      .optional()
      .isIn(["user", "admin"])
      .withMessage("Role must be either user or admin"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);
module.exports = router;
