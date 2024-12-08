import { Request, Response } from "express";
import { EXCHANGES_URL } from "../config";
import {
  getBinanceMidPrice,
  fetchHuobiMidPrice,
  fetchKrakenMidPrice,
} from "../services";

export const getAverageMidPrice = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const binanceMidPrice = getBinanceMidPrice();
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
  } catch (error) {
    console.error("Error fetching prices:", error.message || error);
    res.status(500).json({ error: "Failed to fetch prices." });
  }
};
