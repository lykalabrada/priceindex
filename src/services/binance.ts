import axios from "axios";
import { WebSocket } from "ws";

let binanceMidPrice = 0;

export const connectBinanceSocket = (url: string): void => {
  const ws = new WebSocket(url);

  ws.on("message", (data: string) => {
    const { a: asks, b: bids } = JSON.parse(data);
    const bestAsk = parseFloat(asks[0][0]);
    const bestBid = parseFloat(bids[0][0]);
    binanceMidPrice = (bestAsk + bestBid) / 2;
  });

  ws.onerror = (error) => {
    console.error("Binance Websocket error:", error.message || error);
  };

  ws.onclose = () => {
    console.warn("Binance Websocket closed. Reconnecting...");
    setTimeout(() => connectBinanceSocket(url), 3000);
  };
};

export const getBinanceMidPrice = (): number => binanceMidPrice;

export const fetchBinanceMidPriceFallback = async (
  url: string
): Promise<number> => {
  try {
    const response = await axios.get(url, {
      params: { symbol: "BTCUSDT", limit: 5 },
    });
    const bestAsk = parseFloat(response.data.asks[0][0]);
    const bestBid = parseFloat(response.data.bids[0][0]);
    return (bestAsk + bestBid) / 2;
  } catch (error) {
    console.error("Error fetching Binance price via REST API:", error);
    return 0;
  }
};
