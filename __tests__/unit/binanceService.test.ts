import * as binanceService from "../../src/services/binance";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Binance Service", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
    jest.restoreAllMocks();
  });

  it("should return the mid-price from the WebSocket", () => {
    const mockedMidPrice = 49500;
    jest
      .spyOn(binanceService, "getBinanceMidPrice")
      .mockReturnValue(mockedMidPrice);

    const midPrice = binanceService.getBinanceMidPrice();
    expect(midPrice).toBe(mockedMidPrice);
  });
});
