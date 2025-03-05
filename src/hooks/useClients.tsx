import { useQuery } from "@tanstack/react-query";
import { getClientsByAccountId } from "../services/client";

const useGetClientsAccountById = (accountId: string, token?: string) => {
  return useQuery({
    queryKey: ['clients', accountId],
    queryFn: () => getClientsByAccountId(accountId, token),
    enabled: !!accountId, // Seulement si accountId est défini
  });
};

export { useGetClientsAccountById };
