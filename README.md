
# **Order Book Average Price REST API**

Simple project that provides a REST API that calculates the average of the mid-prices from the order books of three cryptocurrency exchanges: Binance, Huobi, and Kraken. The API integrates real-time data from Binance via WebSocket and fetches data from the Huobi and Kraken REST APIs on demand.

---

## **Local Setup**

### **1. Install Dependencies**
```
npm install
```

### **2. Start Local Server**
```
npm start
```

### **3. Run tests
```
# Run all tests (unit + integration)
npm test

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration
```


## **API Endpoint**

### **GET /api/average-midprice**
Retrieves the average mid-price from Binance, Huobi, and Kraken.

#### **Sample Response**
- **200 OK**

```json
{
  "averageMidPrice": 99507.51,
  "sources": {
    "binance": 99499.995,
    "huobi": 99500.385,
    "kraken": 99522.15
  }
}
```

---

## **Resources**

### **Binance**
- **Order Book**: [Binance Order Book](https://www.binance.com/en/trade/BTC_USDT)
- **API Documentation**: [Binance WebSocket Streams](https://binance-docs.github.io/apidocs/futures/en/#websocket-market-streams)

### **Huobi**
- **Order Book**: [Huobi Order Book](https://www.htx.com/trade/btc_usdt/)
- **API Documentation**: [Huobi Market Depth API](https://huobiapi.github.io/docs/spot/v1/en/#market-depth)

### **Kraken**
- **Order Book**: [Kraken Order Book](https://pro.kraken.com/app/trade/btc-usd)
- **API Documentation**: [Kraken Public Market Data](https://docs.kraken.com/rest/#operation/getOrderBook)

---

## **Future Improvements**

- Introduce caching (like Redis) for scalability.

