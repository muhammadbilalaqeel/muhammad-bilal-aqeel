import express from "express";
import { validateLogin, validateRegister } from "../middlewares/validateAuth.js";
import { 
  deleteAccount, 
  getProfile, 
  loginUser, 
  registerUser,
  blockUser, 
  getUsers,
  changeUserRole,
  getAllAdmins
} from "../controllers/authController.js";
import { protect} from "../middlewares/authMiddleware.js"; 
// import { blockUser } from "../controllers/adminController.js";

const authRoutes = express.Router();

// Public routes
authRoutes.post("/register", validateRegister, registerUser);
authRoutes.post("/login", validateLogin, loginUser);

// Protected user routes
authRoutes.get("/profile", protect(), getProfile);
authRoutes.delete("/profile", protect(), deleteAccount);

authRoutes.patch("/block/:id", protect(["admin", "superAdmin"]), blockUser);

authRoutes.get("/users",protect(["admin", "superAdmin"]),getUsers);

authRoutes.patch("/role/:id", protect(["admin","superAdmin"]) ,changeUserRole);

authRoutes.get('/admins',protect(['superAdmin']),getAllAdmins)

export default authRoutes;
