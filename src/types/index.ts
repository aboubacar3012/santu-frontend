// Role enum
export enum RoleEnum {
  ADMIN = 'ADMIN',
  PARTNER = 'PARTNER',
}

export enum StatusEnum {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export enum TypeEnum {
  PARTICULAR = 'PARTICULAR',
  PROFESSIONAL = 'PROFESSIONAL',
}

export type Article = {
  _id?: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Invoice = {
  _id?: string;
  invoiceNumber: string;
  account: string;
  name: string;
  link: string;
  date: string;
  amount: number;
  paymentMode: string;
  paymentCondition: string;
  status: StatusEnum;
  tva: number;
  remark: string;
  client: string | Client;
  articles: Partial<Article>[];
  createdAt?: string;
  updatedAt?: string;
};

export type Client = {
  _id: string;
  type: 'PARTICULAR' | 'PROFESSIONAL';
  firstName?: string;
  lastName?: string;
  company?: string;
  logo?: string;
  address: string;
  website?: string;
  email: string;
  phone: string;
  account: string;
  invoices: string[];
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
