import { NextFunction, Request, Response } from "express";
import { exchangeRegistry } from "../exchanges/exchangeRegistry";

export const getAverageMidPrice = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Fetch mid-prices from all exchanges in parallel
    const results = await Promise.all(
      exchangeRegistry.map(async (exchange) => {
        const midPrice = await exchange.getMidPrice();
        return { name: exchange.name, midPrice };
      })
    );

    // Calculate average mid-price
    const validPrices = results
      .map((result) => result.midPrice)
      .filter((price) => price > 0);
    if (validPrices.length === 0) {
      throw new Error("All exchanges failed to provide valid mid-price data.");
    }

    const avgMidPrice =
      validPrices.reduce((sum, price) => sum + price, 0) / validPrices.length;

    res.json({
      averageMidPrice: avgMidPrice,
      sources: results.reduce((acc, result) => {
        acc[result.name] = result.midPrice;
        return acc;
      }, {} as Record<string, number>),
    });
  } catch (error) {
    next(error);
  }
};
