import { RootState } from "@/src/redux/store";
import { useSelector } from "react-redux";
import ClientForm from "../client/ClientForm";
import { useState } from "react";
import Link from "next/link";
import ClientsSelect from "./ClientsSelect";

type InvoiceInfoFormProps = {
  invoiceName: string;
  setInvoiceName: (name: string) => void;
  invoiceDate: string;
  setInvoiceDate: (date: string) => void;
  invoiceTva: number;
  setInvoiceTva: (tva: number) => void;
  invoicePaymentMode: string;
  setInvoicePaymentMode: (method: string) => void;
  invoicePaymentCondition: string;
  setInvoicePaymentCondition: (condition: string) => void;
  invoiceRemark: string;
  setInvoiceRemark: (remark: string) => void;
  selectedClient: string;
  setSelectedClient: (client: string) => void;
  invoiceId: string;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}

const InvoiceInfoForm = ({
  invoiceName,
  setInvoiceName,
  invoiceDate,
  setInvoiceDate,
  invoiceTva,
  setInvoiceTva,
  invoicePaymentMode,
  setInvoicePaymentMode,
  invoicePaymentCondition,
  setInvoicePaymentCondition,
  invoiceRemark,
  setInvoiceRemark,
  selectedClient,
  setSelectedClient,
  invoiceId,
  errorMessage,
  setErrorMessage
}: InvoiceInfoFormProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const clients = auth.loggedAccountInfos?.clients;

  return (
    <>
      <div className="flex flex-col gap-1 px-4 py-2">
        <div className="relative w-full min-w-[200px]">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-black">Numéro de la facture</label>
          <p className="bg-gray-50 border font-semibold border-gray-100 text-black text-sm rounded-lg  block w-full p-2.5" >
            {invoiceId}
          </p>
        </div>
      </div>
      {/* Choisir le client */}
      {
        true && (
          <ClientsSelect selectedClient={selectedClient} setSelectedClient={setSelectedClient} />
        )
      }
      <div className="flex flex-col gap-1 px-4 py-2">
        <div className="relative w-full min-w-[200px]">
          <label htmlFor="invoiceName" className="block mb-2 text-sm font-medium text-black">Donner un titre a votre facture</label>
          <input value={invoiceName} onChange={(e) => setInvoiceName(e.target.value)} type="text" id="invoiceName" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez le nom de la facture" required />
        </div>
      </div>

      <div className="flex gap-2 px-4 justify-center items-center">
        <div className="w-1/2 flex flex-col gap-1 py-2">
          <div className="relative w-full min-w-[200px]">
            <div className="flex justify-between items-center py-1">
              <label htmlFor="invoiceDate" className="text-sm font-medium text-black">Date de la facture</label>
              <button 
                type="button" 
                onClick={() => setInvoiceDate(new Date().toISOString().split('T')[0])}
                className="text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md"
              >
                Aujourdhui
              </button>
            </div>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              id="invoiceDate"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-1 py-2">
          <div className="relative w-full min-w-[200px]">
            <label htmlFor="tva" className="block mb-2 text-sm font-medium text-black">TVA (en %)</label>
            <input value={invoiceTva} onChange={(e) => setInvoiceTva(Number(e.target.value))} type="number" id="tva" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5" placeholder="TVA" required />
          </div>
        </div>
      </div>


      {/* Conditions de règlement (Immédiat) */}
      <div className="flex gap-2 px-4">
        <div className="w-1/2 flex flex-col gap-1 py-2">
          <label htmlFor="paymentMode" className="block text-sm font-medium text-black ">
            Mode de règlement
          </label>
          <select value={invoicePaymentMode} onChange={(e) => setInvoicePaymentMode(e.target.value)} id="paymentMode" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 ">
            <option value="CASH">
              Espèces
            </option>
            <option disabled value="OM">
              Orange Money
            </option>
            <option disabled value="CB">
              Carte Bancaire
            </option>
            <option disabled value="VIREMENT">
              Virement
            </option>
          </select>
        </div>
        <div className="w-1/2 flex flex-col gap-1 py-2">
          <label htmlFor="status" className="block text-sm font-medium text-black ">
            Conditions de règlement
          </label>
          <select value={invoicePaymentCondition} onChange={(e) => setInvoicePaymentCondition(e.target.value)} id="status" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 ">
            <option value="NOW">
              Immédiat
            </option>
            <option value="15">
              15 jours
            </option>
            <option value="30">
              30 jours
            </option>
            <option value="45">
              45 jours
            </option>
            <option value="60">
              60 jours
            </option>
            <option value="UPONRECEIPT">
              {/* updonreceipt veut dire  "Jusqu'à réception" */}
              Jusquà réception
            </option>
          </select>
        </div>
      </div>

      {/* Rémarque */}
      <div className="flex flex-col gap-1 px-4 py-2">
        <div className="relative w-full min-w-[200px]">
          <label htmlFor="objective" className="block mb-2 text-sm font-medium text-black">Rémarque</label>
          <textarea value={invoiceRemark} onChange={(e) => setInvoiceRemark(e.target.value)} id="objective" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez une remarque" />
        </div>
      </div>

      <div className="px-2">
        {errorMessage && <div
          className="px-2 relative block w-full p-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
          {errorMessage}
        </div>}
      </div>
    </>
  );
}

export default InvoiceInfoForm;