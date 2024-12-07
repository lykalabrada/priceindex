import dotenv from "dotenv";
import express, { Request, Response } from "express";
import router from "./routes";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Express on Vercel");
});

app.use("/api", router);

export default app;
