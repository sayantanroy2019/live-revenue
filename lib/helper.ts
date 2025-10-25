export const formatToIndianCurrency = (value: number) => {
  const hasDecimal = value % 1 !== 0;
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: hasDecimal ? 2 : 0,
  });
};
