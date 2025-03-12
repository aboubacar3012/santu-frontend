import { StatusEnum } from '@/src/types';

export const getStatusText = (status: string) => {
  switch (status) {
    case StatusEnum.DRAFT:
      return 'Brouillon';
    case StatusEnum.SENT:
      return 'Envoyée';
    case StatusEnum.PAID:
      return 'Payée';
    case StatusEnum.CANCELLED:
      return 'Annulée';
    case StatusEnum.UNPAID:
      return 'Non payée';
    default:
      return status;
  }
};
