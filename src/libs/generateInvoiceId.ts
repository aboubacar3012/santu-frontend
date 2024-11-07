export function generateInvoiceId() {
  // Obtenir la date actuelle
  const now = new Date();
  
  // Récupérer l'année et le mois (format à deux chiffres pour le mois)
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Ajoute un '0' si nécessaire
  
  // Obtenir 8 caractères aléatoires
  const randomChars = Math.random().toString(36).substring(2, 10); 

  // Construire l'identifiant dans le format souhaité
  const invoiceId = `#INV-${year}-${month}-${randomChars.toUpperCase()}`;
  
  return invoiceId;
}