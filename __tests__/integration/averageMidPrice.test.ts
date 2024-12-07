import request from "supertest";
import app from "../../src";

describe("GET /api/average-midprice", () => {
  it("should return the average mid-price from Binance, Huobi, and Kraken", async () => {
    const response = await request(app).get("/api/average-midprice");
    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("averageMidPrice");
    expect(response.body).toHaveProperty("sources");
    expect(response.body.sources).toHaveProperty("binance");
    expect(response.body.sources).toHaveProperty("huobi");
    expect(response.body.sources).toHaveProperty("kraken");

    expect(typeof response.body.sources.binance).toBe("number");
    expect(typeof response.body.sources.huobi).toBe("number");
    expect(typeof response.body.sources.kraken).toBe("number");
  });

  it("should return a valid average mid-price", async () => {
    const response = await request(app).get("/api/average-midprice");

    // Validate the average price calculation
    const { binance, huobi, kraken } = response.body.sources;
    const calculatedAverage = (binance + huobi + kraken) / 3;

    expect(response.body.averageMidPrice).toBeCloseTo(calculatedAverage, 2);
  });
});
