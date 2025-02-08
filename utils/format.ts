export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function parseCurrency(value: string) {
  const numericValue = value.replace(/[^\d]/g, "");
  return numericValue
    ? `${new Intl.NumberFormat("id-ID").format(Number(numericValue))}`
    : "";
}
