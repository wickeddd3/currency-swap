import { ArrowDownUp } from "lucide-react";
import { SwapField } from "./SwapField";
import { TokenConversion } from "./TokenConversion";
import { SwapSummary } from "./SwapSummary";
import { SwapButton } from "./SwapButton";
import { useSwap } from "../hooks/useSwap";

const TOKEN_DATA_URL = "https://interview.switcheo.com/prices.json";

export const SwapForm = () => {
  const {
    tokens,
    fromToken,
    setFromToken,
    toToken,
    setToToken,
    fromAmount,
    toAmount,
    updateAmount,
    reverse,
  } = useSwap(TOKEN_DATA_URL);

  return (
    <div className="w-full md:w-1/2 lg:w-2/5 h-fit bg-white rounded-xl shadow-md m-4 p-4 md:p-8 flex flex-col gap-6">
      <h1 className="text-2xl font-medium">Currency Swap</h1>
      <div className="w-full flex flex-col justify-center items-center">
        <SwapField
          label="From"
          tokens={tokens}
          token={fromToken}
          amount={fromAmount}
          onChangeToken={setFromToken}
          onUpdateAmount={(value) => updateAmount("from", value)}
        />
        <button
          onClick={reverse}
          className="w-fit h-fit bg-amber-400 rounded-full border-6 border-white p-2 -my-2 z-10 cursor-pointer hover:bg-amber-300"
        >
          <ArrowDownUp className="self-center text-gray-900" size={20} />
        </button>
        <SwapField
          label="To"
          tokens={tokens}
          token={toToken}
          amount={toAmount}
          onChangeToken={setToToken}
          onUpdateAmount={(value) => updateAmount("to", value)}
        />
      </div>
      <TokenConversion fromToken={fromToken} toToken={toToken} />
      <SwapSummary toAmount={toAmount} toTokenCurrency={toToken?.currency} />
      <SwapButton />
    </div>
  );
};
