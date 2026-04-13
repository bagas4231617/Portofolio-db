import { z } from 'zod';
import { dbQuery } from '../../server/db/database.js'; // MUST use .js for Vercel ESM
import crypto from 'crypto';
import { authMiddleware } from '../../server/middleware/auth.js'; // MUST use .js

// Validation schema
const messageSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
  company: z.string().optional(),
});

// rate limiter simple map inside lambda (resets on cold start, but better than nothing)
const requestCounts = new Map<string, { count: number; timestamp: number }>();

export default async function handler(req: any, res: any) {
  // CORS Headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return await getMessages(req, res);
  } else if (req.method === 'POST') {
    return await submitMessage(req, res);
  } else {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}

async function submitMessage(req: any, res: any) {
  // Rate Limiting Logic per IP
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 menjt
  
  const record = requestCounts.get(ip);
  if (record && now - record.timestamp < windowMs) {
    if (record.count >= 5) {
      return res.status(429).json({ success: false, error: 'Terlalu banyak permintaan. Silakan coba lagi nanti.' });
    }
    record.count += 1;
  } else {
    requestCounts.set(ip, { count: 1, timestamp: now });
  }

  try {
    const validatedData = messageSchema.parse(req.body);
    
    // Honeypot check
    if (validatedData.company && validatedData.company.trim() !== '') {
      return res.status(201).json({ success: true, message: 'Pesan berhasil disimpan', id: crypto.randomUUID() });
    }

    const id = crypto.randomUUID();
    
    await dbQuery.run(
      'INSERT INTO messages (id, name, email, message, isRead) VALUES ($1, $2, $3, $4, FALSE)',
      [id, validatedData.name, validatedData.email, validatedData.message]
    );
    
    res.status(201).json({ success: true, message: 'Pesan berhasil disimpan', id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const err = error as any;
      const errorMsg = (err.errors && err.errors[0]?.message) || (err.issues && err.issues[0]?.message) || 'Validasi form gagal';
      return res.status(400).json({ success: false, error: errorMsg });
    } else {
      console.error('Save error:', error);
      return res.status(500).json({ success: false, error: 'Terjadi kesalahan pada server' });
    }
  }
}

async function getMessages(req: any, res: any) {
  // Check auth
  return new Promise((resolve) => {
    authMiddleware(req, res, async () => {
      try {
        const rows = await dbQuery.all('SELECT * FROM messages ORDER BY createdAt DESC');
        const messages = rows.map((r: any) => ({
          ...r,
          isRead: r.isRead === 1 || r.isread === true || r.isRead === true
        }));
        res.status(200).json({ success: true, data: messages });
        resolve(null);
      } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ success: false, error: 'Gagal mengambil pesan' });
        resolve(null);
      }
    });
  });
}
