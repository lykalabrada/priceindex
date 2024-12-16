import * as huobiService from "../../src/services/huobi";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Huobi Service", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
    jest.restoreAllMocks();
  });

  it("should fetch the mid-price successfully", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        tick: {
          asks: [["52000.00", "5"]],
          bids: [["51000.00", "5"]],
        },
      },
    });

    const midPrice = await huobiService.fetchHuobiMidPrice(
      "https://api.huobi.pro/market/depth?symbol=btcusdt&type=step0"
    );

    expect(midPrice).toBe(51500);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.huobi.pro/market/depth?symbol=btcusdt&type=step0"
    );
  });

  it("should throw an error if the REST API call fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Request failed"));
    await expect(
      huobiService.fetchHuobiMidPrice(
        "https://api.huobi.pro/market/depth?symbol=btcusdt&type=step0"
      )
    ).rejects.toThrow("Request failed");
  });
});
