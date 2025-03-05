import { apiUrl } from "../constants";
import { Client } from "../types";
const baseUrl = `${apiUrl}/clients`;

// Create a new client
export const createClient = async (client: Partial<Client>, token?: string) => {
  const response = await fetch(`${baseUrl}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(client),
  });

  const data = await response.json();

  return data;
}

// Get client by id
export const getClientById = async (id: string, token?: string) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
}

// Get all clients by account id
export const getClientsByAccountId = async (accountId: string, token?: string) => {
  try {
    const response = await fetch(`${baseUrl}?accountId=${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching clients: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching clients by account id:", error);
    throw error;
  }
}