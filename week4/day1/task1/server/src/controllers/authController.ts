import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';

interface AuthResponse {
  success: boolean;
  data: any;
  message: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface LoginResponseData {
  token: string;
  user: UserData;
}

export const register = async (req: Request, res: Response<AuthResponse>): Promise<void> => {
  try {
    const { name, email, password }: { name: string; email: string; password: string } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        success: false,
        data: null,
        message: 'User already exists'
      });
      return;
    }

    user = new User({ name, email, password });
    await user.save();

    const responseData: UserData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email
    };

    res.status(201).json({
      success: true,
      data: responseData,
      message: 'User registered successfully'
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      data: null,
      message: err.message
    });
  }
};

export const login = async (req: Request, res: Response<AuthResponse>): Promise<void> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        data: null,
        message: 'Invalid credentials'
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        success: false,
        data: null,
        message: 'Invalid credentials'
      });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    const responseData: LoginResponseData = {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      }
    };

    res.json({
      success: true,
      data: responseData,
      message: 'Login successful'
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      data: null,
      message: err.message
    });
  }
};