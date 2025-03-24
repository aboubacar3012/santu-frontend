import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInvoice } from '../../services/invoice';
import { Invoice } from '../../types';

/**
 * Hook pour mettre à jour une facture avec React Query
 * @param token - Token d'authentification
 * @returns Mutation pour mettre à jour une facture
 */
export const useUpdateInvoice = (token?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invoice: Partial<Invoice>) => updateInvoice(invoice, token),
    onSuccess: (data, variables) => {
      // Invalider les requêtes pertinentes après une mise à jour réussie
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoice', variables.id] });
      if (variables.id) {
        queryClient.invalidateQueries({ queryKey: ['clientInvoices', variables.id] });
      }
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: error => {
      console.error('Update invoice failed: ', error);
    },
  });
};
