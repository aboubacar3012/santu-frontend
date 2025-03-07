import { useQuery } from "@tanstack/react-query";
import { getInvoicesByClientId } from "@/src/services/invoice";

const useGetInvoicesByClientId = (clientId: string | null, token?: string) => {
  return useQuery({
    queryKey: ['invoices', 'client', clientId],
    queryFn: () => getInvoicesByClientId(clientId ? clientId : '', token),
    enabled: !!clientId, // Seulement activé si clientId est défini
  });
};

export { useGetInvoicesByClientId };
