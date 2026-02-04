import express from 'express';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js'; // Import your new routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

import cors from 'cors';
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Link the routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('SchoolSync API is alive and kicking! 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});