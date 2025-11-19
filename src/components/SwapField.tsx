import type { TokenData } from "../types/token";
import { TokenDropdown } from "./TokenDropdown";

export interface SwapFieldProps {
  label: string;
  tokens: TokenData[];
  token: TokenData | null;
  amount: number;
  onChangeToken: (token: TokenData) => void;
  onUpdateAmount: (amount: number) => void;
}

export const SwapField = ({
  label,
  tokens,
  token,
  amount,
  onChangeToken,
  onUpdateAmount,
}: SwapFieldProps) => {
  return (
    <div className="w-full bg-gray-100 p-4 rounded-2xl flex flex-col gap-2">
      <span className="text-xs text-gray-500">{label}</span>
      <div className="w-full flex justify-center">
        <TokenDropdown
          tokens={tokens}
          value={token!}
          onChange={onChangeToken}
        />
        <input
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={amount ? String(amount) : ""}
          onChange={(e) => onUpdateAmount(parseInt(e.target.value))}
          className="w-full bg-transparent outline-none text-xl font-medium text-right"
        />
      </div>
    </div>
  );
};
