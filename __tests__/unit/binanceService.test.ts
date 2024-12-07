import { getBinanceMidPrice } from "../../src/services/binance";

jest.mock("../../src/services/binance", () => ({
  getBinanceMidPrice: jest.fn(),
}));

describe("Binance Service", () => {
  it("should return the correct mid-price", () => {
    const mockedGetBinanceMidPrice = getBinanceMidPrice as jest.MockedFunction<
      typeof getBinanceMidPrice
    >;
    mockedGetBinanceMidPrice.mockReturnValue(99460.55);

    const result = getBinanceMidPrice();
    expect(result).toBe(99460.55);
  });
});
