import { BinanceExchange } from "./binanceExchange";
import { HuobiExchange } from "./huobiExchange";
import { KrakenExchange } from "./krakenExchange";
import { Exchange } from "./types";

export const exchangeRegistry: Exchange[] = [
  BinanceExchange,
  HuobiExchange,
  KrakenExchange,
];
