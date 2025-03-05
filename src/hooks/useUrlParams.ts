import { useRouter, useSearchParams } from "next/navigation";

/**
 * Hook personnalisé pour la gestion des paramètres d'URL
 * @returns Objet contenant des fonctions utilitaires pour manipuler les paramètres d'URL
 */
export function useUrlParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Vérifie si un paramètre existe dans l'URL
   * @param {string} paramName - Nom du paramètre à vérifier
   * @returns {boolean} - True si le paramètre existe, false sinon
   */
  const hasParam = (paramName: string): boolean => {
    return searchParams.has(paramName);
  };

  /**
   * Récupère la valeur d'un paramètre d'URL
   * @param {string} paramName - Nom du paramètre à récupérer
   * @returns {string | null} - Valeur du paramètre ou null si non trouvé
   */
  const getParam = (paramName: string): string | null => {
    return searchParams.get(paramName);
  };

  /**
   * Définit ou met à jour un paramètre d'URL et navigue vers la nouvelle URL
   * @param {string} paramName - Nom du paramètre à définir
   * @param {string} value - Valeur à assigner au paramètre
   */
  const setParam = (paramName: string, value: string): void => {
    const params = new URLSearchParams(searchParams);
    params.set(paramName, value);

    // Navigue vers la nouvelle URL avec les paramètres mis à jour
    router.push(`?${params.toString()}`);
  };

  /**
   * Supprime un paramètre de l'URL et navigue vers la nouvelle URL
   * @param {string} paramName - Nom du paramètre à supprimer
   */
  const deleteParam = (paramName: string): void => {
    const params = new URLSearchParams(searchParams);
    params.delete(paramName);

    // Navigue vers la nouvelle URL avec les paramètres
    router.push(`?${params.toString()}`);
  };

  /**
   * Bascule la présence d'un paramètre dans l'URL (l'ajoute s'il n'existe pas, le supprime sinon)
   * @param {string} paramName - Nom du paramètre à basculer
   * @param {string} value - Valeur à utiliser si le paramètre est ajouté (par défaut 'true')
   */
  const toggleParam = (paramName: string, value: string = 'true'): void => {
    const params = new URLSearchParams(searchParams);
    if (params.has(paramName)) {
      params.delete(paramName);
    } else {
      params.set(paramName, value);
    }
    // Navigue vers la nouvelle URL avec les paramètres mis à jour
    router.push(`?${params.toString()}`);
  };

  return {
    hasParam,
    getParam,
    setParam,
    deleteParam,
    toggleParam
  };
}
