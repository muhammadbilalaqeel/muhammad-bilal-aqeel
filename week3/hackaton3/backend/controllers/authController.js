import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { success, errors } from "../utils/responses.js";

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: errors.USER_EXISTS });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",       // default role
      isBlocked: false,   // default not blocked
    });

    if (user) {
      res.status(201).json({
        success: true,
        message: success.USER_REGISTERED,
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isBlocked: user.isBlocked,
          cart: user.cart,      // cart reference
          token: generateToken(user.id),
        },
      });
    } else {
      res.status(400).json({ success: false, message: errors.SERVER_ERROR });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: errors.SERVER_ERROR });
  }
};

// POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: errors.INVALID_CREDENTIALS });
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return res
        .status(403)
        .json({ success: false, message: errors.USER_BLOCKED });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: errors.INVALID_CREDENTIALS });
    }

    res.json({
      success: true,
      message: success.USER_LOGGED_IN,
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isBlocked: user.isBlocked,
        cart: user.cart,          
        token: generateToken(user.id),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: errors.SERVER_ERROR });
  }
};


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("cart"); 

    if (!user) {
      return res.status(404).json({ success: false, message: errors.USER_NOT_FOUND });
    }

    res.json({
      success: true,
      message: success.PROFILE_RETRIEVED,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: errors.SERVER_ERROR });
  }
};

// DELETE /api/auth/profile
export const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: errors.USER_NOT_FOUND });
    }

  
    await user.remove();

    res.json({ success: true, message: success.ACCOUNT_DELETED });
  } catch (error) {
    res.status(500).json({ success: false, message: errors.SERVER_ERROR });
  }
};




export const blockUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const currentUser = req.user;

    if (!id) {
      return res.status(400).json({ success: false, message: errors.USER_NOT_FOUND });
    }

    const userToBlock = await User.findById(id);
    if (!userToBlock) {
      return res.status(404).json({ success: false, message: errors.USER_NOT_FOUND });
    }


   if(currentUser.role === 'admin'){
     if (userToBlock.role !== "user") {
      return res.status(403).json({
        success: false,
        message: errors.FORBIDDEN_ACTION,
      });
    }
   }
   

    if (currentUser.role === "superAdmin" && userToBlock.role === "superAdmin") {
      return res.status(403).json({
        success: false,
        message: "SuperAdmin cannot block another SuperAdmin",
      });
    }

    // Toggle blocked status
    userToBlock.isBlocked = !userToBlock.isBlocked;
    await userToBlock.save();

    res.json({
      success: true,
      message: userToBlock.isBlocked ? "User blocked successfully" : "User unblocked successfully",
      data: { _id: userToBlock._id, isBlocked: userToBlock.isBlocked, role: userToBlock.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: errors.SERVER_ERROR });
  }
};



export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password").sort({ createdAt: -1 });
    // console.log(users)
    res.status(200).json({ success: true, data: users,message:"Users fethced" });
  } catch (error) {
    res.status(500).json({ success: false, message: errors.SERVER_ERROR });
  }
};



export const changeUserRole = async (req, res) => {
  try {
    const { id } = req.params; 
    const { role } = req.body; 

    if (!role) {
      return res.status(400).json({ success: false, message: "Role is required" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.role = role; 
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: { id: user._id, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const toggleUserBlock = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    return res.status(200).json({
      success: true,
      data: user,
      message: `User is now ${user.isBlocked ? "blocked" : "active"}`,
    });
  } catch (error) {
      res.status(500).json({ success: false, message: errors.SERVER_ERROR });
  }
};



export const getAllAdmins = async(req,res)=>{
  try {
    const admins = await User.find({role:'admin'}).select('-password').sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: admins,message:"Admins fethced" });
  } catch (error) {
      res.status(500).json({ success: false, message: errors.SERVER_ERROR });
  }
}