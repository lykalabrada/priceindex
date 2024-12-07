import express from "express";
import { getAverageMidPrice } from "../controllers/pricesController";

const router = express.Router();

router.get("/average-midprice", getAverageMidPrice);

export default router;
