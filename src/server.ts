import app from "./app";
import { EXCHANGES_URL } from "./config";
import { connectBinanceSocket } from "./services/binance";

// Connect to Binance WS
connectBinanceSocket(EXCHANGES_URL.BINANCE);

/*
// TODO: Uncomment if we want to poll both Kraken and Huobi APis.
// Note: Avoided this approach to prevent frequent hits on the API rate limits, but could be useful in some cases.
setInterval(() => {
    fetchHuobiMidPrice(EXCHANGES_URL.HUOBI);
    fetchKrakenMidPrice(EXCHANGES_URL.KRAKEN);
}, 3000);
 */

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
