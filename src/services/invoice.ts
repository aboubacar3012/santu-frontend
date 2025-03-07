import { apiUrl } from "../constants";
import { Invoice } from "../types";
const baseUrl = `${apiUrl}/invoices`;

// Get all invoices
export const getDashboard = async (
  accountId: string, 
  token: string, 
  period: string = 'today', 
  status: string = 'all'
) => {
  try {
    const response = await fetch(`${baseUrl}/dashboard/${accountId}?period=${period}&status=${status}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la récupération des factures"
    }
  }
}

// Create a new invoice
export const createInvoice = async (invoice: Partial<Invoice>, token?:string) => {
  const response = await fetch(`${baseUrl}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(invoice),
  });

  const data = await response.json();
  
  return data;
}

// Get invoice by id
export const getInvoiceById = async (id: string, token?:string) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  
  return data;
}

// Get all invoices by client id
export const getInvoicesByClientId = async (clientId: string, token?: string) => {
  try {
    const response = await fetch(`${baseUrl}/client/${clientId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la récupération des factures du client"
    }
  }
}