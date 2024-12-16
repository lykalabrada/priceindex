import { EXCHANGES_URL } from "../config";
import { fetchHuobiMidPrice } from "../services";
import { Exchange } from "./types";

export const HuobiExchange: Exchange = {
  name: "Huobi",
  getMidPrice: async () => fetchHuobiMidPrice(EXCHANGES_URL.HUOBI),
};
