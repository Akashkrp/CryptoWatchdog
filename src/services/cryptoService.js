import axios from 'axios';
import Crypto from '../models/crypto.js';

class CryptoService {
  async fetchCryptoData(coinId) {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
      );
      
      const data = response.data[coinId];
      return {
        price: data.usd,
        marketCap: data.usd_market_cap,
        priceChange24h: data.usd_24h_change
      };
    } catch (error) {
      console.error(`Error fetching data for ${coinId}:`, error);
      throw error;
    }
  }

  async getLatestStats(coinId) {
    const latestData = await Crypto.findOne({ coinId })
      .sort({ timestamp: -1 });
    return latestData;
  }

  async calculateDeviation(coinId) {
    const prices = await Crypto.find({ coinId })
      .sort({ timestamp: -1 })
      .limit(100)
      .select('price');

    if (prices.length === 0) {
      throw new Error('No data found');
    }

    const priceValues = prices.map(p => p.price);
    const mean = priceValues.reduce((a, b) => a + b) / priceValues.length;
    const squareDiffs = priceValues.map(price => Math.pow(price - mean, 2));
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b) / squareDiffs.length;
    return Number(Math.sqrt(avgSquareDiff).toFixed(2));
  }
}

export default new CryptoService();
