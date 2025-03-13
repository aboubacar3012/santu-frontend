import { v4 as uuidv4 } from 'uuid';

export function generateInvoiceId() {
  // Obtenir la date actuelle
  const now = new Date();

  // Récupérer l'année et le mois (format à deux chiffres pour le mois)
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Ajoute un '0' si nécessaire

  // Construire l'identifiant dans le format souhaité
  const invoiceId = `INV-${year}-${month}-${uuidv4()}`;

  return invoiceId;
}
