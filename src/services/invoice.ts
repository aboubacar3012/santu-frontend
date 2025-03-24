import { apiUrl } from '../constants';
import { Invoice } from '../types';
const baseUrl = `${apiUrl}/invoices`;
console.log('baseUrl:', baseUrl);

// Get all invoices
export const getDashboard = async (
  token: string,
  enterpriseId: string,
  period: string = 'today',
  status: string = 'all'
) => {
  try {
    const response = await fetch(
      `${baseUrl}/dashboard?period=${period}&status=${status}&enterpriseId=${enterpriseId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la récupération des factures",
    };
  }
};

// Create a new invoice
export const createInvoice = async (invoice: Partial<Invoice>, token?: string) => {
  const response = await fetch(`${baseUrl}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(invoice),
  });

  const data = await response.json();

  return data;
};

// Get invoice by id
export const getInvoiceById = async (id: string, token?: string) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
};

// Get all invoices by client id
export const getInvoicesByClientId = async (clientId: string, token?: string) => {
  try {
    const response = await fetch(`${baseUrl}/client/${clientId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la récupération des factures du client",
    };
  }
};

// Update invoice
export const updateInvoice = async (invoice: Partial<Invoice>, token?: string) => {
  try {
    const response = await fetch(`${baseUrl}/update/${invoice.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(invoice),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la mise à jour de la facture",
    };
  }
};
