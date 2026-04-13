import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import messageRoutes from './routes/messages';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API health and info
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    service: 'portfolio-message-api',
  });
});

// Mount Routes
app.use('/api/messages', messageRoutes);

// Serve Static Frontend (Production Build)
app.use(express.static(path.join(__dirname, '../dist')));

// Fallback all other GET requests to the React SPA index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Run server normally if not in Vercel (Vercel uses serverless functions and exports the app)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

// Export the Express API for Vercel
export default app;
