export interface TokenImageProps {
  currency: string;
}

export const TokenImage = ({ currency }: TokenImageProps) => {
  return (
    <img src={`/tokens/${currency}.svg`} alt={currency} className="w-8 h-8" />
  );
};
