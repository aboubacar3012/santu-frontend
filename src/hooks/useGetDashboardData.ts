import { useQuery } from '@tanstack/react-query';
import { getDashboard } from '../services/invoice';

/**
 * Hook pour récupérer les données du tableau de bord
 * @param accountId - Identifiant du compte
 * @param token - Token d'authentification
 * @param period - Période de filtrage (today, week, month, year, all)
 * @param status - Statut des factures (paid, unpaid, all)
 * @returns Données du tableau de bord avec état de chargement
 */
const useGetDashboardData = (
  accountId: string,
  token?: string,
  period: string = 'today',
  status: string = 'all'
) => {
  return useQuery({
    queryKey: ['dashboard', accountId, period, status],
    queryFn: () => getDashboard(accountId, token || '', period, status),
    enabled: !!accountId && !!token, // Seulement si accountId et token sont définis
    staleTime: 5 * 60 * 1000, // 5 minutes de mise en cache
    refetchOnWindowFocus: true,
  });
};

export default useGetDashboardData;
