/**
 * Formate une date au format français
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';

  const date = new Date(dateString);

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

/**
 * Formate un montant avec séparateur de milliers
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'GNF'
): string => {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' ' + currency;
};

/**
 * Calcule la date d'échéance en fonction de la date d'émission et du délai de paiement
 */
export const calculateDueDate = (
  issueDate: string,
  paymentTerms: string | number
): string => {
  if (paymentTerms === 'NOW') return issueDate;

  const date = new Date(issueDate);
  date.setDate(date.getDate() + Number(paymentTerms));

  return formatDate(date.toISOString());
};
