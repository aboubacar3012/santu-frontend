// Role enum
export enum Role {
  ADMIN = "ADMIN",
  PARTNER = "PARTNER",
  ACCOUNT = "ACCOUNT",
};


export type Client = {
  _id: string;
  type: "particular" | "company";
  firstName?: string;
  lastName?: string;
  company?: string;
  logo?: string;
  address: string;
  website?: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Account = {
  _id: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  address: string;
  email: string;
  phone: string;
  role: Role;
  password: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
