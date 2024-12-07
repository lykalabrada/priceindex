import axios from "axios";

let krakenMidPrice = 0;

export const fetchKrakenMidPrice = async (url: string): Promise<number> => {
  try {
    const response = await axios.get(url);
    const bestAsk = parseFloat(response.data.result.XXBTZUSD.asks[0][0]);
    const bestBid = parseFloat(response.data.result.XXBTZUSD.bids[0][0]);
    krakenMidPrice = (bestAsk + bestBid) / 2;

    return krakenMidPrice;
  } catch (error) {
    console.error("Error fetching Huobi data:", error);
  }
};

export const getKrakenMidPrice = (): number => krakenMidPrice; // can be used when polling
