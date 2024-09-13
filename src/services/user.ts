
import { apiUrl } from "../constants";
import { Account } from "../types";
const baseUrl = `${apiUrl}/accounts`;

export type AccountToAdd = Omit<Account, 'partnerId'> & { partnerId: string };

// Create a new user
export const createAccount = async (user: Partial<AccountToAdd>, token?:string) => {
  const response = await fetch(`${baseUrl}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  
  return data;
}

// Get all accounts
export const getAccounts = async (): Promise<{ success: boolean, accounts: Account[] }> => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }

  return response.json();
}

// Login a user
export const loginAccount = async (email: string, password: string) => {
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  return data;
}

// Change a user's password
export const changePassword = async (userId?: string, password?: string) => {
  const response = await fetch(`${baseUrl}/updatepassword/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  const data = await response.json();

  return data;
}

// Delete a user
export const deleteAccount = async (userId: string, token?:string) => {
  const response = await fetch(`${baseUrl}/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
}

// Update a user
export const updateAccount = async (userId?: string, user?: Partial<Account>, token?:string) => {
  const response = await fetch(`${baseUrl}/update/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  return data;
}