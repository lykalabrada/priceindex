import { getHuobiMidPrice } from "../../api/services/huobi";

jest.mock("../../api/services/huobi", () => ({
  getHuobiMidPrice: jest.fn(),
}));

describe("Huobi Service", () => {
  it("should return the correct mid-price", () => {
    const mockedGetHuobiMidPrice = getHuobiMidPrice as jest.MockedFunction<
      typeof getHuobiMidPrice
    >;
    mockedGetHuobiMidPrice.mockReturnValue(99469.69);

    const result = getHuobiMidPrice();
    expect(result).toBe(99469.69);
  });
});
