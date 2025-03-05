// Role enum
export enum RoleEnum {
  ADMIN = "ADMIN",
  PARTNER = "PARTNER",
};

export enum StatusEnum {
  DRAFT = "DRAFT",
  SENT = "SENT",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
};

export type Article = {
  _id?: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
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
  status: StatusEnum;
  tva: number;
  remark: string;
  client: Client;
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
  logo?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  address: string;
  email: string;
  phone: string;
  role: RoleEnum;
  clients: Client[];
  invoices: Invoice[];
  password: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
