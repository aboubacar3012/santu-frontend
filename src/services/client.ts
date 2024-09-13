import { apiUrl } from "../constants";
import { Client } from "../types";
const baseUrl = `${apiUrl}/clients`;

// Create a new client
export const createClient = async (client: Partial<Client>, token?:string) => {
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