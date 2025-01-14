import mongoose from 'mongoose';

const CryptoSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
    enum: ['bitcoin', 'matic-network', 'ethereum']
  },
  price: {
    type: Number,
    required: true
  },
  marketCap: {
    type: Number,
    required: true
  },
  priceChange24h: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Crypto || mongoose.model('Crypto', CryptoSchema);
