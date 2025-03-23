import { apiUrl } from '../constants';
import httpClient, { FetchError } from './custom-fetch';

const baseUrl = `${apiUrl}/auth`;

/**
 * Authentifie un utilisateur avec email et mot de passe
 * @param email - Adresse email de l'utilisateur
 * @param password - Mot de passe de l'utilisateur
 * @returns Résultat d'authentification contenant les données utilisateur et le token
 */
export const authenticate = async (email: string, password: string) => {
  try {
    const response = await httpClient.post(`${baseUrl}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Échec de connexion:', error);
    const fetchError = error as FetchError;
    throw new Error(fetchError.message || 'Authentification échouée. Veuillez vérifier vos identifiants et réessayer.');
  }
};

/**
 * Vérifie si un utilisateur avec l'email donné existe dans le système
 * @param email - Adresse email à vérifier
 * @returns Objet indiquant si l'utilisateur existe
 */
export const checkUserExist = async (email: string) => {
  try {
    const response = await httpClient.post(`${baseUrl}/check-user-exist`, { email });
    return response.data;
  } catch (error) {
    console.error('Vérification utilisateur échouée:', error);
    const fetchError = error as FetchError;
    throw new Error(fetchError.message || "Impossible de vérifier si l'utilisateur existe. Veuillez réessayer plus tard.");
  }
};
