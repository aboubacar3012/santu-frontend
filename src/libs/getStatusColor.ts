import { StatusEnum } from '@/src/types';

export const getStatusColor = (status: string) => {
  switch (status) {
    case StatusEnum.DRAFT:
      return 'bg-finance-bg-medium text-finance-text-secondary';
    case StatusEnum.PENDING:
      return 'bg-finance-info/20 text-finance-info';
    case StatusEnum.PAID:
      return 'bg-finance-success/20 text-finance-success';
    case StatusEnum.CANCELLED:
      return 'bg-finance-error/20 text-finance-error';
    default:
      return 'bg-finance-bg-medium text-finance-text-primary';
  }
};
