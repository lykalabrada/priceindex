import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import router from "./routes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const limiter = rateLimit({
  windowMs: 10000, // 10 sec
  max: 5,
});

app.use(limiter);

app.get("/", (_req: Request, res: Response) => {
  res.send(
    "Welcome to the Order Book Average Price REST API! This API is deployed on Render. Use `/api/average-midprice` to get the latest average mid-price from Binance, Huobi, and Kraken."
  );
});

app.use("/api", router);

export default app;
