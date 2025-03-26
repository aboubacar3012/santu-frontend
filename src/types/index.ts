// Role enum
export enum RoleEnum {
  ADMIN = 'ADMIN',
  ENTERPRISE = 'ENTERPRISE',
  USER = 'USER',
}

export enum StatusEnum {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export enum TypeEnum {
  PARTICULAR = 'PARTICULAR',
  PROFESSIONAL = 'PROFESSIONAL',
}

export enum PaymentModeEnum {
  CASH = 'CASH',
  OM = 'OM',
  CB = 'CB',
  VIREMENT = 'VIREMENT',
}

export enum PaymentConditionEnum {
  NOW = 'NOW',
  FIFTEEN = '15',
  THIRTY = '30',
  FORTYFIVE = '45',
  SIXTY = '60',
  UPONRECEIPT = 'UPONRECEIPT',
}

export enum AccountStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
}

export enum PermissionsEnum {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export type Article = {
  id?: string;
  name: string;
  description: string;
  quantity: string;
  price: string;
  invoiceId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Invoice = {
  id?: string;
  invoiceNumber: string;
  name: string;
  link?: string;
  date: string;
  amount: string;
  paymentMode: PaymentModeEnum;
  paymentCondition: PaymentConditionEnum;
  status: StatusEnum;
  tva?: string;
  remark?: string;
  clientId: string;
  client?: Client;
  enterpriseId: string;
  enterprise: Enterprise;
  articles: Article[];
  createdAt?: string;
  updatedAt?: string;
};

export type Client = {
  id: string;
  type: TypeEnum;
  firstName?: string;
  lastName?: string;
  company?: string;
  logo?: string;
  address: string;
  website?: string;
  email: string;
  phone: string;
  enterpriseId: string;
  invoices?: Invoice[];
  accounts?: Account[];
  createdAt?: string;
  updatedAt?: string;
};

export type Enterprise = {
  id: string;
  name: string;
  legalForm?: string;
  registrationNum?: string;
  taxId?: string;
  vatNumber?: string;
  industry?: string;
  numberOfEmployees?: number;
  website?: string;
  description?: string;
  currency: string;
  logo?: string;
  address: string;
  email: string;
  phone: string;
  accounts?: Account[];
  clients?: Client[];
  invoices?: Invoice[];
  createdAt?: string;
  updatedAt?: string;
};

export type Account = {
  id: string;
  email: string;
  password?: string;
  role: RoleEnum;
  status: AccountStatusEnum;
  permissions: PermissionsEnum[];
  isFirstLogin: boolean;
  enterpriseId?: string;
  clientId?: string;
  enterprise?: Enterprise;
  client?: Client;
  createdAt?: string;
  updatedAt?: string;
};


