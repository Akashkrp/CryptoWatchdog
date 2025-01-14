import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import cryptoRoutes from './src/routes/cryptoRoutes.js';
import cryptoJob from './src/jobs/cryptoJob.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/', cryptoRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  cryptoJob.start();
});

export default app;
