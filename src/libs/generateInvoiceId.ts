export function generateInvoiceId(type: 'invoice' | 'quote' = 'invoice'): string {
  // Obtenir la date actuelle
  const now = new Date();

  // Récupérer l'année et le mois (format à deux chiffres pour le mois)
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Ajoute un '0' si nécessaire
  const timestamp = now.getTime();

  // Construire l'identifiant dans le format souhaité
  const invoiceId = `${type === 'invoice' ? 'FACTURE' : 'DEVIS'}-${year}-${month}-${timestamp}`;

  return invoiceId;
}
