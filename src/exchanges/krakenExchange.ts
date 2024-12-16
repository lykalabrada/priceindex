import { EXCHANGES_URL } from "../config";
import { fetchKrakenMidPrice } from "../services";
import { Exchange } from "./types";

export const KrakenExchange: Exchange = {
  name: "Kraken",
  getMidPrice: async () => fetchKrakenMidPrice(EXCHANGES_URL.KRAKEN),
};
