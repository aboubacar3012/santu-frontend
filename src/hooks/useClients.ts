import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllClients,
  createClient,
  getClientById,
  updateClient,
  deleteClientById,
} from '../services/client';
import { Client } from '../types';

const useGetAllClients = (enterpriseId: string, token?: string) => {
  return useQuery({
    queryKey: ['clients', enterpriseId],
    queryFn: () => getAllClients(enterpriseId, token),
    enabled: !!enterpriseId, // Seulement si enterpriseId est défini
  });
};

const useCreateClient = (token?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newClient: Partial<Client>) => createClient(newClient, token),
    onSuccess: (data, variables) => {
      if (variables.enterpriseId) {
        console.log('Invalidate query');
        queryClient.invalidateQueries({ queryKey: ['clients', variables.enterpriseId] });
      }
      return data;
    },
  });
};

const useGetClientById = (id: string | null, token?: string) => {
  return useQuery({
    queryKey: ['client', id],
    queryFn: () => getClientById(id ? id : '', token),
    enabled: !!id, // Seulement si id est défini
  });
};

const useUpdateClient = (token?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { clientId: string; clientData: Partial<Client> }) => {
      return updateClient(data.clientId, data.clientData, token);
    },
    onSuccess: (data, variables) => {
      // Invalider le client spécifique
      queryClient.invalidateQueries({ queryKey: ['client', variables.clientId] });

      // Si le client a un compte associé, invalider également la liste des clients
      if (variables.clientData.enterpriseId) {
        queryClient.invalidateQueries({ queryKey: ['clients', variables.clientData.enterpriseId] });
      }

      return data;
    },
  });
};

const useDeleteClientById = (token?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clientId: string) => {
      return deleteClientById(clientId, token);
    },
    onSuccess: data => {
      // Nous devons également invalider la liste des clients, mais nous n'avons pas directement l'accountId
      // Une solution est d'invalider toutes les requêtes de clients
      queryClient.invalidateQueries({ queryKey: ['clients'] });

      return data;
    },
  });
};

export {
  useGetAllClients,
  useCreateClient,
  useGetClientById,
  useUpdateClient,
  useDeleteClientById,
};
