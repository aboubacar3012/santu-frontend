import { StatusEnum } from '@/src/types';

export const getStatusText = (status: string) => {
  switch (status) {
    case StatusEnum.DRAFT:
      return 'Brouillon';
    case StatusEnum.PENDING:
      return 'En attente';
    case StatusEnum.PAID:
      return 'Payée';
    case StatusEnum.CANCELLED:
      return 'Annulée';
    default:
      return status;
  }
};
