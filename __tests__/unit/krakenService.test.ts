import * as krakenService from "../../src/services/kraken";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Kraken Service", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
    jest.restoreAllMocks();
  });

  it("should fetch the mid-price successfully", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        result: {
          XXBTZUSD: {
            asks: [["53000.00", "3"]],
            bids: [["52000.00", "3"]],
          },
        },
      },
    });

    const midPrice = await krakenService.fetchKrakenMidPrice(
      "https://api.kraken.com/0/public/Depth?pair=XBTUSD"
    );

    expect(midPrice).toBe(52500);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.kraken.com/0/public/Depth?pair=XBTUSD"
    );
  });

  it("should throw an error if the REST API call fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));
    await expect(
      krakenService.fetchKrakenMidPrice(
        "https://api.kraken.com/0/public/Depth?pair=XBTUSD"
      )
    ).rejects.toThrow("API Error");
  });
});
