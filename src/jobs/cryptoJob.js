import cron from 'node-cron';
import Crypto from '../models/crypto.js';
import cryptoService from '../services/cryptoService.js';

const cryptoJob = cron.schedule('0 */2 * * *', async () => { 
  const coins = ['bitcoin', 'matic-network', 'ethereum'];
  
  for (const coin of coins) {
    try {
      const data = await cryptoService.fetchCryptoData(coin);
      
      const cryptoData = new Crypto({
        coinId: coin,
        price: data.price,
        marketCap: data.marketCap,
        priceChange24h: data.priceChange24h
      });
      
      await cryptoData.save();
      console.log(`Data saved for ${coin}`);
    } catch (error) {
      console.error(`Failed to fetch and save data for ${coin}:`, error);
    }
  }
});

export default cryptoJob;
