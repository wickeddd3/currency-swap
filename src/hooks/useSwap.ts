import { useEffect, useMemo, useState } from "react";
import type { TokenData } from "../types/token";
import { useTokens } from "./useTokens";
import { convert } from "../utils/swap";
import { useDebounce } from "./useDebounce";

export function useSwap(url: string) {
  const { tokens } = useTokens(url);

  const [fromToken, setFromToken] = useState<TokenData | null>(null);
  const [toToken, setToToken] = useState<TokenData | null>(null);

  const [fromAmount, setFromAmount] = useState<number>(0);
  const [toAmount, setToAmount] = useState<number>(0);

  const [activeField, setActiveField] = useState<"from" | "to">("from");

  const debouncedFromAmount = useDebounce(fromAmount);
  const debouncedToAmount = useDebounce(toAmount);

  // set default tokens
  useEffect(() => {
    const setDefaultTokenPair = () => {
      if (tokens.length >= 2) {
        setFromToken(tokens[0]);
        setToToken(tokens[1]);
      }
    };
    setDefaultTokenPair();
  }, [tokens]);

  // derived amounts
  const computedToAmount = useMemo(() => {
    if (
      activeField === "from" &&
      debouncedFromAmount !== 0 &&
      fromToken &&
      toToken
    ) {
      return convert(debouncedFromAmount, fromToken, toToken);
    }
    return toAmount;
  }, [activeField, debouncedFromAmount, fromToken, toToken, toAmount]);

  const computedFromAmount = useMemo(() => {
    if (
      activeField === "to" &&
      debouncedToAmount !== 0 &&
      fromToken &&
      toToken
    ) {
      return convert(debouncedToAmount, toToken, fromToken);
    }
    return fromAmount;
  }, [activeField, debouncedToAmount, fromToken, toToken, fromAmount]);

  const reverse = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(0);
    setToAmount(0);
    setActiveField("from");
  };

  const updateAmount = (field: "from" | "to", value: number) => {
    setActiveField(field);
    if (field === "from") {
      setFromAmount(value);
    } else {
      setToAmount(value);
    }
  };

  return {
    tokens,
    fromToken,
    setFromToken,
    toToken,
    setToToken,
    fromAmount: computedFromAmount,
    toAmount: computedToAmount,
    updateAmount,
    reverse,
  };
}
