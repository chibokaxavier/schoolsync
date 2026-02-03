import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Basic Test Route
app.get('/', (req, res) => {
    res.send('SchoolSync API is alive and kicking! 🚀');
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});