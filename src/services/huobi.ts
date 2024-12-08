import axios from "axios";

let huobiMidPrice = 0;

export const fetchHuobiMidPrice = async (url: string): Promise<number> => {
  try {
    const response = await axios.get(url);
    const bestAsk = parseFloat(response.data.tick.asks[0][0]);
    const bestBid = parseFloat(response.data.tick.bids[0][0]);
    huobiMidPrice = (bestAsk + bestBid) / 2;

    return huobiMidPrice;
  } catch (error) {
    console.error("Error fetching Huobi data:", error.message || error);
  }
};

export const getHuobiMidPrice = (): number => huobiMidPrice; // can be used when polling
