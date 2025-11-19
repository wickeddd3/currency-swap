import type { TokenData } from "../types/token";

export const convert = (
  amount: number,
  fromToken: TokenData | null,
  toToken: TokenData | null
) => {
  const fromPrice = fromToken?.price;
  const toPrice = toToken?.price;
  if (!fromPrice || !toPrice) return 0;
  return amount * (fromPrice / toPrice);
};
