const EXCHANGES_URL = {
  BINANCE_WS: "wss://stream.binance.com:9443/ws/btcusdt@depth",
  BINANCE: "https://api.binance.com/api/v3/depth", // fallback REST API
  HUOBI: "https://api.huobi.pro/market/depth?symbol=btcusdt&type=step0",
  KRAKEN: "https://api.kraken.com/0/public/Depth?pair=XBTUSD",
};

export { EXCHANGES_URL };
