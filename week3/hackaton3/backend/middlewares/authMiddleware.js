import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errors } from "../utils/responses.js";
import User from "../models/User.js";

dotenv.config();

export const protect = (roles = []) => async (req, res, next) => {
  try {
 
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token)
    if (!token) return res.status(401).json({ success: false, message: errors.NO_TOKEN });


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ success: false, message: errors.INVALID_TOKEN });


    if (user.isBlocked) {
      return res.status(403).json({ success: false, message: errors.USER_BLOCKED });
    }

  
    req.user = user;

    
    if (roles.length && !roles.includes(user.role)) {
      return res.status(403).json({ success: false, message: errors.FORBIDDEN_ACTION });
    }

    next();
  } catch (err) {
   
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: errors.TOKEN_EXPIRED });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: errors.TOKEN_INVALID });
    }

    return res.status(500).json({ success: false, message: errors.SERVER_ERROR });
  }
};
