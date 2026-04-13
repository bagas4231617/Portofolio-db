import type { Request, Response, NextFunction } from 'express';

// VERY simple admin token for portfolio showcase purpose
// In a real production app, use JWT, proper auth, etc.
const ADMIN_TOKEN = 'mbma_admin_secure_123';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ success: false, error: 'Unauthorized. Akses ditolak.' });
  }
  next();
};
