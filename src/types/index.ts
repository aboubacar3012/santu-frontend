// Role enum
export enum Role {
  ADMIN = "ADMIN",
  PARTNER = "PARTNER",
};

export enum CampaignStatus {
  PREPARATION = "PREPARATION",
  INPROGRESS = "INPROGRESS",
  FINISHED = "FINISHED",
  ARCHIVED = "ARCHIVED",
};

export type Partner = {
  _id: string;
  name: string;
  description: string;
  logo: string;
  siret: string;
  capital: string;
  address: string;
  postalCode: string;
  city: string;
  website?: string;
  email: string;
  phone: string;
  users: User[];
  invoices:InvoiceAndContract[],
  contracts: InvoiceAndContract[]
  campaigns: Campaign[];
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  isActive: boolean;
  hashedPassword?:string;
  isFirstLogin?:boolean;
  role: Role | string;
  partnerId: Partner;
  createdAt: string;
  updatedAt: string;
};

export type CampaignData = {
  startDate: string;
  endDate: string;
  address: string;
  duration: string;
  distance: string;
};

export type Campaign = {
  _id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  partnerId: Partner;
  objective: string;
  tool: string;
  startDate: string;
  endDate: string;
  zones: string[];
  city:string;
  numberOfTrucks: number;
  numberOfFaces: number;
  budget: number;
  data: CampaignData[];
  report: Report;
  createdAt: string;
  updatedAt: string;
};

export type AddressesData = {
  address: string;
  distance: string;
  duration: string;
  startDate: string;
  endDate: string;
  latitude?: string;
  longitude?: string;
  date?:string;
};

export type Report = {
  name: string;
  description: string;
  link: string;
  createdAt:string;
  updatedAt:string;
};

export type InvoiceAndContract = {
  _id?: string;
  name: string;
  link: string;
  date: string;
  amount: string;
  type: "invoice" | "contract";
  createdAt?: string;
  updatedAt?: string;
}