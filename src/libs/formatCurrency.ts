export function formatCurrency(amount: number | string, currency?: string): string {
  // Si aucune devise n'est fournie, on essaie d'utiliser celle stockée dans le localStorage
  if (!currency) {
    try {
      const authData = localStorage.getItem('auth');
      if (authData) {
        const parsedData = JSON.parse(authData);
        currency = parsedData.loggedAccountInfos?.currency || 'GNF';
      } else {
        currency = 'GNF';
      }
    } catch (error) {
      currency = 'GNF';
    }
  }

  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ' + currency;
}
