import express from 'express';
import cors from 'cors';
import messageRoutes from './routes/messages';

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

// Run server normally if not in Vercel (Vercel uses serverless functions and exports the app)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

// Export the Express API for Vercel
export default app;
