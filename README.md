# CryptoWatchdog

A server-side application developed using Node.js and MongoDB to track cryptocurrency data, including price, market cap, and 24-hour change, and compute statistical information like standard deviation.

---

## **Features**

1. **Background Job:**
   - Fetches current price, market cap, and 24-hour change for Bitcoin, Matic, and Ethereum.
   - Runs automatically every 2 hours using a cron job.

2. **REST APIs:**
   - `/stats`: Fetches the latest data for a specific cryptocurrency.
   - `/deviation`: Calculates the standard deviation of the cryptocurrency's price from the last 100 records.

---


## **APIs**

### **1. `/stats`**
- **Description:** Fetches the latest data for a specified cryptocurrency.
- **Method:** GET
- **Query Parameters:**
  - `coin`: Can be one of `bitcoin`, `matic-network`, or `ethereum`.
- **Sample Request:**
  ```
  GET /stats?coin=bitcoin
  ```
- **Sample Response:**
  ```json
  {
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
  }
  ```

### **2. `/deviation`**
- **Description:** Calculates the standard deviation of the cryptocurrency's price for the last 100 records.
- **Method:** GET
- **Query Parameters:**
  - `coin`: Can be one of `bitcoin`, `matic-network`, or `ethereum`.
- **Sample Request:**
  ```
  GET /deviation?coin=bitcoin
  ```
- **Sample Response:**
  ```json
  {
    "deviation": 4082.48
  }
  ```

---

## **Future Enhancements**

1. Add user authentication to restrict access to APIs.
2. Implement a caching layer for frequent API requests.
3. Extend support to additional cryptocurrencies.
4. Add real-time notifications for significant price changes.

---


## **Acknowledgments**

- [CoinGecko API](https://www.coingecko.com/en/api) for cryptocurrency data.
- [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) for backend development.

---

## **Contact**

For any queries or suggestions, feel free to contact:
- Name: Akash Kumar Prasad
- Email: kumarak2061@gmail.com

