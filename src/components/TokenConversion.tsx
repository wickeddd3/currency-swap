import { useMemo } from "react";
import type { TokenData } from "../types/token";
import { formatCurrency } from "../utils/currency";

export interface TokenConversionProps {
  fromToken: TokenData | null;
  toToken: TokenData | null;
}

export const TokenConversion = ({
  fromToken,
  toToken,
}: TokenConversionProps) => {
  const hasSwappableTokens = useMemo(
    () => fromToken && toToken,
    [fromToken, toToken]
  );

  return (
    <div className="w-full flex items-center text-sm font-medium">
      <hr className="flex-1 border-t border-gray-200" />
      {hasSwappableTokens && (
        <>
          <span className="mx-3 whitespace-nowrap font-medium">{`1 ${toToken?.currency}`}</span>
          <span className="text-gray-500 mx-1">≈</span>
          <span className="mx-3 whitespace-nowrap">
            {`${formatCurrency(toToken?.price || 0, 7)} ${fromToken?.currency}`}
          </span>
        </>
      )}
      {!hasSwappableTokens && <span className="px-2 text-xs">---</span>}
      <hr className="flex-1 border-t border-gray-200" />
    </div>
  );
};
