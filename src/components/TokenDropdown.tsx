import { useState, useRef } from "react";
import type { TokenData } from "../types/token";
import { TokenImage } from "./TokenImage";
import { ChevronDown } from "lucide-react";

export interface TokenDropdownProps {
  tokens: TokenData[];
  value?: TokenData;
  onChange: (t: TokenData) => void;
}

export const TokenDropdown = ({
  tokens,
  value,
  onChange,
}: TokenDropdownProps) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = tokens?.filter((token) =>
    token.currency.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onBlur={(e) => {
        // only close if focus leaves the whole container
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
      className="relative w-full"
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-fit bg-transparent text-left cursor-pointer flex items-center gap-4"
      >
        {value ? (
          <div className="flex items-center gap-2">
            <TokenImage currency={value.currency} />
            <span className="text-md font-medium">
              {value.currency || "USDT"}
            </span>
          </div>
        ) : (
          <span className="text-lg font-bold">--</span>
        )}
        <ChevronDown size={20} className="text-gray-500 ml-auto" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 mt-1 left-0 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <input
            type="text"
            placeholder="Search token..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-b border-gray-200 px-3 py-2 text-sm focus:outline-none"
          />
          <ul className="w-full max-h-60 overflow-y-auto">
            {filtered.map((t) => (
              <li
                key={t.currency}
                onClick={() => {
                  onChange(t);
                  setOpen(false);
                  setQuery("");
                }}
                className="w-full cursor-pointer px-3 py-2 text-sm hover:bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <TokenImage currency={t.currency} />
                    <span>{t.currency}</span>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {t.price.toFixed(4)}
                  </span>
                </div>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500">No results</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
