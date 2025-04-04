import { apiUrl } from "../constants";
import { Client } from "../types";
import httpClient from "./custom-fetch";

const baseUrl = `${apiUrl}/clients`;

// Create a new client
export const createClient = async (client: Partial<Client>, token?: string) => {
  try {
    const response = await httpClient.post(baseUrl, client, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return {
      success: true,
      client: response.data,
    };
  } catch (error) {
    console.error("Error creating client:", error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la création du client",
    };
  }
};

// Get client by id
export const getClientById = async (id: string, token?: string) => {
  try {
    const response = await httpClient.get(`${baseUrl}/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return {
      success: true,
      client: response.data,
    };
  } catch (error) {
    console.error("Error fetching client by id:", error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la récupération du client",
    };
  }
};

// Get all clients by enterprise id
export const getAllClients = async (enterpriseId?: string, token?: string) => {
  try {
    // Construire les paramètres de requête
    const params: Record<string, any> = {};
    if (enterpriseId) params.enterpriseId = enterpriseId;

    const response = await httpClient.get(baseUrl, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      params,
    });

    return {
      success: true,
      clients: response.data.items,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.error("Error fetching clients:", error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la récupération des clients",
    };
  }
};

// Update client
export const updateClient = async (clientId: string, clientData: Partial<Client>, token?: string) => {
  try {
    const response = await httpClient.patch(`${baseUrl}/${clientId}`, clientData, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return {
      success: true,
      client: response.data,
    };
  } catch (error) {
    console.error("Error updating client:", error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la mise à jour du client",
    };
  }
};

// Delete client by id
export const deleteClientById = async (id: string, token?: string) => {
  try {
    await httpClient.delete(`${baseUrl}/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return {
      success: true,
      message: "Client supprimé avec succès",
    };
  } catch (error) {
    console.error("Error deleting client:", error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la suppression du client",
    };
  }
};