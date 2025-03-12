import { StatusEnum } from '@/src/types';

export const getStatusColor = (status: string) => {
  switch (status) {
    case StatusEnum.DRAFT:
      return 'bg-gray-100 text-gray-800';
    case StatusEnum.PENDING:
      return 'bg-blue-100 text-blue-800';
    case StatusEnum.PAID:
      return 'bg-green-100 text-green-800';
    case StatusEnum.CANCELLED:
      return 'bg-red-100 text-red-800';
    case StatusEnum.PENDING:
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
