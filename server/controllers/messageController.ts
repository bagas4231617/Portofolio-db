import type { Request, Response } from 'express';
import { z } from 'zod';
import { dbQuery } from '../db/database';
import crypto from 'crypto';

// Validation schema
const messageSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
  company: z.string().optional(),
});

export const submitMessage = async (req: Request, res: Response) => {
  try {
    const validatedData = messageSchema.parse(req.body);
    
    // Honeypot check
    if (validatedData.company && validatedData.company.trim() !== '') {
      return res.status(201).json({ success: true, message: 'Pesan berhasil disimpan', id: crypto.randomUUID() });
    }

    const id = crypto.randomUUID();
    
    // Use Postgres parameterized query syntax ($1, $2)
    // The dbQuery wrapper adapter will translate it to (?, ?) if running SQLite locally
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
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const rows = await dbQuery.all('SELECT * FROM messages ORDER BY createdAt DESC');
    // Convert Postgres BOOLEAN (true/false) or SQLite INTEGER (1/0) to uniform boolean
    const messages = rows.map((r: any) => ({
      ...r,
      isRead: r.isRead === 1 || r.isread === true || r.isRead === true
    }));
    res.json({ success: true, data: messages });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ success: false, error: 'Gagal mengambil pesan' });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const changes = await dbQuery.run('UPDATE messages SET isRead = TRUE WHERE id = $1', [id]);
    
    if (changes === 0) {
      return res.status(404).json({ success: false, error: 'Pesan tidak ditemukan' });
    }
    
    res.json({ success: true, message: 'Pesan ditandai sudah dibaca' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ success: false, error: 'Gagal update pesan' });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const changes = await dbQuery.run('DELETE FROM messages WHERE id = $1', [id]);
    
    if (changes === 0) {
      return res.status(404).json({ success: false, error: 'Pesan tidak ditemukan' });
    }
    
    res.json({ success: true, message: 'Pesan berhasil dihapus' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, error: 'Gagal menghapus pesan' });
  }
};
