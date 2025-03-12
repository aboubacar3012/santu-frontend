export const getStatusText = (status: string) => {
  switch (status) {
    case 'DRAFT':
      return 'Brouillon';
    case 'SENT':
      return 'Envoyée';
    case 'PAID':
      return 'Payée';
    case 'CANCELLED':
      return 'Annulée';
    default:
      return status;
  }
};
