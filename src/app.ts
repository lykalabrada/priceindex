import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import router from "./routes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send(
    "Welcome to the Order Book Average Price REST API! This API is deployed on Render. Use `/api/average-midprice` to get the latest average mid-price from Binance, Huobi, and Kraken."
  );
});

app.use("/api", router);

export default app;
