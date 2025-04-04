import { apiUrl } from '../constants';
import { Account } from '../types';
import httpClient, { FetchError } from './custom-fetch';

const baseUrl = `${apiUrl}/accounts`;

// Create a new user
export const createAccount = async (user: Partial<Account>, token?: string) => {
  try {
    const response = await httpClient.post(baseUrl, user, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating account:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la création du compte",
    };
  }
};

// Get all accounts
export const getAccounts = async (token?: string) => {
  try {
    const response = await httpClient.get(baseUrl, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return {
      success: true,
      accounts: response.data.items,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.error('Failed to fetch accounts:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la récupération des comptes",
    };
  }
};

// Get a single account
export const getAccountById = async (accountId: string, token?: string) => {
  try {
    const response = await httpClient.get(`${baseUrl}/${accountId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return {
      success: true,
      account: response.data,
    };
  } catch (error) {
    console.error('Failed to fetch account:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la récupération du compte",
    };
  }
};

// Update a user
export const updateAccount = async (
  accountId: string,
  accountData: Partial<Account>,
  token: string
) => {
  try {
    const response = await httpClient.patch(`${baseUrl}/${accountId}`, accountData, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return {
      success: true,
      account: response.data,
      message: "Compte mis à jour avec succès"
    };
  } catch (error) {
    console.error('Error updating account:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la mise à jour du compte",
    };
  }
};

// Delete a user
export const deleteAccount = async (userId: string, token?: string) => {
  try {
    const response = await httpClient.delete(`${baseUrl}/${userId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return {
      success: true,
      message: "Compte supprimé avec succès"
    };
  } catch (error) {
    console.error('Error deleting account:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la suppression du compte",
    };
  }
};
