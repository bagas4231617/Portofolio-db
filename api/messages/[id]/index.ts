import { dbQuery } from '../../../server/db/database.js'; // MUST use .js
import { authMiddleware } from '../../../server/middleware/auth.js'; // MUST use .js

export default async function handler(req: any, res: any) {
  // CORS Headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  return new Promise((resolve) => {
    authMiddleware(req, res, async () => {
      try {
        const id = req.query.id;
        const changes = await dbQuery.run('DELETE FROM messages WHERE id = $1', [id]);
        
        if (changes === 0) {
          res.status(404).json({ success: false, error: 'Pesan tidak ditemukan' });
          return resolve(null);
        }
        
        res.status(200).json({ success: true, message: 'Pesan berhasil dihapus' });
        resolve(null);
      } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ success: false, error: 'Gagal menghapus pesan' });
        resolve(null);
      }
    });
  });
}
