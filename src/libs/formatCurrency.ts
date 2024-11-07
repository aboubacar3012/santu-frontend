export function formatCurrency(amount: number | string): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " GNF";
}