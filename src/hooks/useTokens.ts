import { useEffect, useState } from "react";
import type { TokenData } from "../types/token";

export function useTokens(url: string) {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTokens() {
      setLoading(true);
      const res = await fetch(url);
      const data: TokenData[] = await res.json();

      // Deduplicate by currency
      const map = new Map<string, TokenData>();
      data.forEach((token) => {
        map.set(token.currency, token);
      });

      setTokens(Array.from(map.values()));
      setLoading(false);
    }
    fetchTokens();
  }, [url]);

  return { tokens, loading };
}
