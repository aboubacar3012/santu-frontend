import { useState, useEffect } from 'react';

// Types de base
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData';

export interface FetchOptions extends RequestInit {
  baseUrl?: string;
  timeout?: number;
  responseType?: ResponseType;
  params?: Record<string, string | number | boolean | undefined | null>;
  withCredentials?: boolean;
}

export interface FetchResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export interface FetchError {
  message: string;
  status?: number;
  statusText?: string;
  data?: any;
}

// Fonction pour créer un timeout
const createTimeout = (ms: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject({ message: `Requête expirée après ${ms}ms` });
    }, ms);
  });
};

// Fonction pour ajouter des paramètres à l'URL
const addQueryParams = (url: string, params?: Record<string, any>): string => {
  if (!params || Object.keys(params).length === 0) return url;

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  if (!queryString) return url;

  return `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
};

// Fonction fetch principale simplifiée
export const fetchApi = async <T = any>(
  url: string,
  method: HttpMethod = 'GET',
  options: FetchOptions = {}
): Promise<FetchResponse<T>> => {
  // Options de base
  const config: FetchOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: options.withCredentials ? 'include' : 'same-origin',
    ...options,
  };

  // Construction de l'URL
  const baseUrl = config.baseUrl || '';
  const fullUrl = addQueryParams(`${baseUrl}${url}`, config.params);

  // Gestion du timeout
  const controller = new AbortController();
  config.signal = controller.signal;

  try {
    // Exécution de la requête avec timeout si spécifié
    const fetchPromise = fetch(fullUrl, config);

    const response = (await (config.timeout
      ? Promise.race([fetchPromise, createTimeout(config.timeout)])
      : fetchPromise)) as Response;

    // Traitement des erreurs HTTP
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = null;
      }

      throw {
        message: `Erreur ${response.status}: ${response.statusText}`,
        status: response.status,
        statusText: response.statusText,
        data: errorData,
      };
    }

    // Traitement de la réponse selon le type demandé
    let data;
    const responseType = options.responseType || 'json';

    try {
      switch (responseType) {
        case 'json':
          data = await response.json();
          break;
        case 'text':
          data = await response.text();
          break;
        case 'blob':
          data = await response.blob();
          break;
        case 'arrayBuffer':
          data = await response.arrayBuffer();
          break;
        case 'formData':
          data = await response.formData();
          break;
        default:
          data = await response.json();
      }
    } catch (error) {
      data = null;
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  } catch (error: any) {
    const enhancedError: FetchError = {
      message: error.message || 'Erreur réseau',
      status: error.status,
      statusText: error.statusText,
      data: error.data,
    };

    throw enhancedError;
  }
};

// Méthodes HTTP essentielles
export const get = <T = any>(url: string, options?: FetchOptions) =>
  fetchApi<T>(url, 'GET', options);

export const post = <T = any>(url: string, data?: any, options?: FetchOptions) =>
  fetchApi<T>(url, 'POST', {
    ...options,
    body: data ? JSON.stringify(data) : undefined,
  });

export const put = <T = any>(url: string, data?: any, options?: FetchOptions) =>
  fetchApi<T>(url, 'PUT', {
    ...options,
    body: data ? JSON.stringify(data) : undefined,
  });

export const del = <T = any>(url: string, options?: FetchOptions) =>
  fetchApi<T>(url, 'DELETE', options);

export const patch = <T = any>(url: string, data?: any, options?: FetchOptions) =>
  fetchApi<T>(url, 'PATCH', {
    ...options,
    body: data ? JSON.stringify(data) : undefined,
  });

// Exporter un objet par défaut avec les méthodes HTTP essentielles uniquement
const httpClient = {
  get,
  post,
  put,
  delete: del,
  patch,
};

export default httpClient;
