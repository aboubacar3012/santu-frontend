
import { apiUrl } from "../constants";
import { User } from "../types";
const baseUrl = `${apiUrl}/users`;

export type UserToAdd = Omit<User, 'partnerId'> & { partnerId: string };

// Create a new user
export const createUser = async (user: Partial<UserToAdd>, token?:string) => {
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

// Get all users
export const getUsers = async (): Promise<{ success: boolean, users: User[] }> => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

// Login a user
export const loginUser = async (email: string, password: string) => {
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
export const deleteUser = async (userId: string, token?:string) => {
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
export const updateUser = async (userId?: string, user?: Partial<User>, token?:string) => {
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