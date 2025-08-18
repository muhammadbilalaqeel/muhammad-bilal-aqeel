import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: string;
}

interface AuthResponse {
  success: boolean;
  data: null;
  message: string;
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response<AuthResponse>,
  next: NextFunction
): void => {
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) {
    res.status(401).json({
      success: false,
      data: null,
      message: 'No token, authorization denied'
    });
    return;
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    req.user = decoded.id;
    next();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid token';
    res.status(401).json({
      success: false,
      data: null,
      message
    });
  }
};

export default authMiddleware;