interface Exchange {
  name: string;
  getMidPrice: () => Promise<number>;
}

export { Exchange };
