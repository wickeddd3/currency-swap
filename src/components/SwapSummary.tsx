import { formatCurrency } from "../utils/currency";

export interface SwapSummaryProps {
  toAmount: number;
  toTokenCurrency?: string;
}

export const SwapSummary = ({
  toAmount,
  toTokenCurrency,
}: SwapSummaryProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-center items-center">
        <span className="w-full text-xs text-gray-500">Transaction Fees</span>
        <span className="w-fit text-sm text-right font-medium rounded-lg whitespace-nowrap py-0.5 px-2 bg-emerald-100 text-emerald-600">
          0 Fee
        </span>
      </div>
      <div className="w-full flex justify-center items-center">
        <span className="w-full text-xs text-gray-500">Receivables</span>
        <span className="w-full text-sm text-right font-medium">
          {toAmount
            ? `${formatCurrency(toAmount, 7)} ${toTokenCurrency}`
            : "--"}
        </span>
      </div>
    </div>
  );
};
