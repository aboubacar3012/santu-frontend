import { apiUrl } from "../constants";
import { Invoice } from "../types";
const baseUrl = `${apiUrl}/invoices`;

// Get all invoices
export const getDashboard = async (accountId:string, token?:string) => {
  const response = await fetch(`${baseUrl}/dashboard/${accountId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  
  return data;
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