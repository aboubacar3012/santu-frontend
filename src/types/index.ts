// Role enum
export enum Role {
  ADMIN = "ADMIN",
  PARTNER = "PARTNER",
  ACCOUNT = "ACCOUNT",
};

export type Article = {
  _id?: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

export type Invoice = {
  _id?: string;
  invoiceNumber: string;
  name: string;
  link: string;
  date: string;
  amount: number;
  paymentMode: string;
  paymentCondition: string;
  status: "draft" | "sent" | "paid" | "cancelled";
  tva: number;
  remark: string;
  articles: Article[]
  createdAt?: string;
  updatedAt?: string;
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
  logoUrl?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  address: string;
  email: string;
  phone: string;
  role: Role;
  clients: Client[];
  invoices: Invoice[];
  password: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
