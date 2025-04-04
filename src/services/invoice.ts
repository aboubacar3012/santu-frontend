import { apiUrl } from '../constants';
import { Invoice } from '../types';
import httpClient from './custom-fetch';

const baseUrl = `${apiUrl}/invoices`;

// Get dashboard data
export const getDashboard = async (
  token: string,
  enterpriseId: string,
  period: string = 'all',
  status: string = 'all'
) => {
  try {
    const response = await httpClient.get(`${baseUrl}/dashboard`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      params: {
        enterpriseId,
        period,
        status
      }
    });
    
    return {
      success: true,
      dashboardData: response.data
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la récupération des données du tableau de bord"
    };
  }
};

// Get all invoices
export const getAllInvoices = async (params: { 
  page?: number, 
  limit?: number, 
  enterpriseId?: string, 
  clientId?: string 
} = {}, token?: string) => {
  try {
    const response = await httpClient.get(baseUrl, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      params
    });
    
    return {
      success: true,
      invoices: response.data.items,
      pagination: response.data.pagination
    };
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la récupération des factures"
    };
  }
};

// Create a new invoice
export const createInvoice = async (invoice: Partial<Invoice>, token?: string) => {
  try {
    const response = await httpClient.post(`${baseUrl}/create`, invoice, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });
    
    return {
      success: true,
      invoice: response.data
    };
  } catch (error) {
    console.error('Error creating invoice:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la création de la facture"
    };
  }
};

// Get invoice by id
export const getInvoiceById = async (id: string, token?: string) => {
  try {
    const response = await httpClient.get(`${baseUrl}/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });
    
    return {
      success: true,
      invoice: response.data
    };
  } catch (error) {
    console.error('Error fetching invoice by id:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la récupération de la facture"
    };
  }
};

// Get all invoices by client id
export const getInvoicesByClientId = async (clientId: string, token?: string) => {
  try {
    const response = await httpClient.get(`${baseUrl}/client/${clientId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });
    
    return {
      success: true,
      invoices: response.data
    };
  } catch (error) {
    console.error('Error fetching invoices by client id:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la récupération des factures du client"
    };
  }
};

// Update invoice
export const updateInvoice = async (invoiceId: string, invoice: Partial<Invoice>, token?: string) => {
  try {
    const response = await httpClient.patch(`${baseUrl}/${invoiceId}`, invoice, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });
    
    return {
      success: true,
      invoice: response.data
    };
  } catch (error) {
    console.error('Error updating invoice:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la mise à jour de la facture"
    };
  }
};

// Delete invoice
export const deleteInvoice = async (invoiceId: string, token?: string) => {
  try {
    await httpClient.delete(`${baseUrl}/${invoiceId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });
    
    return {
      success: true,
      message: "La facture a été supprimée avec succès"
    };
  } catch (error) {
    console.error('Error deleting invoice:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la suppression de la facture"
    };
  }
};
