import { Request, Response } from "express";
import { EXCHANGES_URL } from "../consts";
import {
  getBinanceMidPrice,
  fetchHuobiMidPrice,
  fetchKrakenMidPrice,
  fetchBinanceMidPriceFallback,
} from "../services";

export const getAverageMidPrice = async (
  _req: Request,
  res: Response
): Promise<void> => {
  let binanceMidPrice = getBinanceMidPrice();
  if (binanceMidPrice === 0) {
    // Use REST API for Binance price if WebSocket data is unavailable (e.g., deployed for free on Render that restricts WS connections)
    console.warn("Binance WebSocket price is zero. Using REST API fallback.");
    binanceMidPrice = await fetchBinanceMidPriceFallback(EXCHANGES_URL.BINANCE);
  }

  const huobiMidPrice = await fetchHuobiMidPrice(EXCHANGES_URL.HUOBI);
  const krakenMidPrice = await fetchKrakenMidPrice(EXCHANGES_URL.KRAKEN);

  const avgMidPrice = (binanceMidPrice + huobiMidPrice + krakenMidPrice) / 3;

  res.json({
    averageMidPrice: avgMidPrice,
    sources: {
      binance: binanceMidPrice,
      huobi: huobiMidPrice,
      kraken: krakenMidPrice,
    },
  });
};
