import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.errors[0].msg,
      info :"Error comes from the express validator validations"
    });
  }

  next();
};