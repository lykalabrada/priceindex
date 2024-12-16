import request from "supertest";
import app from "../../src/app";
import * as binanceService from "../../src/services/binance";

jest.spyOn(binanceService, "getBinanceMidPrice").mockReturnValue(49500);

describe("GET /api/average-midprice", () => {
  it("should return the average mid-price from Binance, Huobi, and Kraken", async () => {
    const response = await request(app).get("/api/average-midprice");
    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("averageMidPrice");
    expect(response.body.sources.Binance).toBe(49500);
  });

  it("should return a valid average mid-price", async () => {
    const response = await request(app).get("/api/average-midprice");

    const { Binance, Huobi, Kraken } = response.body.sources;
    const calculatedAverage = (Binance + Huobi + Kraken) / 3;

    expect(response.body.averageMidPrice).toBeCloseTo(calculatedAverage, 2);
  });
});
