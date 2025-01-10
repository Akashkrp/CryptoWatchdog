const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const cryptoRoutes = require('./src/routes/cryptoRoutes');
const cryptoJob = require('./src/jobs/cryptoJob');

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

module.exports = app;