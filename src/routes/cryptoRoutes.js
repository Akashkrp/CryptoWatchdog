import express from 'express';
import cryptoService from '../services/cryptoService.js';

const router = express.Router();

const validateCoinId = (req, res, next) => {
  const validCoins = ['bitcoin', 'matic-network', 'ethereum'];
  const { coin } = req.query;
  
  if (!coin || !validCoins.includes(coin)) {
    return res.status(400).json({
      error: 'Invalid coin ID. Must be one of: bitcoin, matic-network, ethereum'
    });
  }
  
  next();
};

router.get('/stats', validateCoinId, async (req, res) => {
  try {
    const { coin } = req.query;
    const latestData = await cryptoService.getLatestStats(coin);
    
    if (!latestData) {
      return res.status(404).json({ error: 'No data found for this coin' });
    }
    
    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.priceChange24h
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/deviation', validateCoinId, async (req, res) => {
  try {
    const { coin } = req.query;
    const deviation = await cryptoService.calculateDeviation(coin);
    res.json({ deviation });
  } catch (error) {
    console.error('Error calculating deviation:', error);
    if (error.message === 'No data found') {
      return res.status(404).json({ error: 'No data found for this coin' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
