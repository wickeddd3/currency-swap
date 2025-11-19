export const formatCurrency = (
  value: number,
  decimals = 2,
  locale = "en-US"
) => {
  if (value === null || value === undefined || isNaN(value)) return "";

  const absValue = Math.abs(value);

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true, // adds commas for thousands
  }).format(absValue);

  // Wrap negatives in parentheses
  return value < 0 ? `(${formatted})` : formatted;
};
