import { getBinanceMidPrice } from "../services";
import { Exchange } from "./types";

export const BinanceExchange: Exchange = {
  name: "Binance",
  getMidPrice: async () => getBinanceMidPrice(),
};
