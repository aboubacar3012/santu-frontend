import { apiUrl } from '../constants';
import { Account } from '../types';
const baseUrl = `${apiUrl}/accounts`;

export type AccountToAdd = Omit<Account, 'partnerId'> & { partnerId: string };

// Create a new user
export const createAccount = async (user: Partial<AccountToAdd>, token?: string) => {
  const response = await fetch(`${baseUrl}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  return data;
};

// Get all accounts
export const getAccounts = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch accounts');
  }

  return response.json();
};

// Get a single account
export const getAccountById = async (userId: string, token?: string) => {
  const response = await fetch(`${baseUrl}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch account');
  }

  return response.json();
};

// authenticates a user
export const authenticate = async (email: string, password: string) => {
  const response = await fetch(`${baseUrl}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  return data;
};

// Change a user's password
export const changePassword = async (userId?: string, password?: string) => {
  const response = await fetch(`${baseUrl}/updatepassword/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });

  const data = await response.json();

  return data;
};

// Delete a user
export const deleteAccount = async (userId: string, token?: string) => {
  const response = await fetch(`${baseUrl}/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
};

// Update a user
export const updateAccount = async (
  accountId: string,
  accountData: Partial<Account>,
  token: string
) => {
  try {
    const response = await fetch(`${baseUrl}/update/${accountId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(accountData),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating account:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la mise à jour du compte",
    };
  }
};
