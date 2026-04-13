import type { Request, Response, NextFunction } from 'express';

// Rate limiting state (in-memory, very simple)
const rateLimits = new Map<string, { count: number, resetAt: number }>();

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;

  let limit = rateLimits.get(ip);
  if (!limit || limit.resetAt < now) {
    limit = { count: 0, resetAt: now + windowMs };
  }

  limit.count++;
  rateLimits.set(ip, limit);

  if (limit.count > maxRequests) {
    return res.status(429).json({ success: false, error: 'Terlalu banyak permintaan. Coba lagi nanti.' });
  }

  next();
};
