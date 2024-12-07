import { getKrakenMidPrice } from "../../api/services/kraken";

jest.mock("../../api/services/kraken", () => ({
  getKrakenMidPrice: jest.fn(),
}));

describe("Kraken Service", () => {
  it("should return the correct mid-price", () => {
    const mockedGetKrakenMidPrice = getKrakenMidPrice as jest.MockedFunction<
      typeof getKrakenMidPrice
    >;
    mockedGetKrakenMidPrice.mockReturnValue(99571.85);

    const result = getKrakenMidPrice();
    expect(result).toBe(99571.85);
  });
});
