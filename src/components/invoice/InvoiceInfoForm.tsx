import { RootState } from '@/src/redux/store';
import { useSelector } from 'react-redux';
import ClientForm from '../client/ClientForm';
import { useState } from 'react';
import Link from 'next/link';
import ClientsSelect from './ClientsSelect';
import { Article } from '@/src/types';
import { toast } from 'react-toastify';
import ArticleAddForm from './ArticleAddForm';
import FormInput from '../ui/FormInput';
import {
  FileText,
  Calendar,
  Percent,
  CreditCard,
  Clock,
  MessageSquare,
  Hash,
} from 'lucide-react';

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
  articles: Partial<Article>[];
  setArticles: (articles: Partial<Article>[]) => void;
  articleName: string;
  setProductName: (articleName: string) => void;
  articleQuantity: string;
  setProductQuantity: (articleQuantity: string) => void;
  articlePrice: string;
  setProductPrice: (articlePrice: string) => void;
  articleDescription: string;
  setProductDescription: (articleDescription: string) => void;
};

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
  setErrorMessage,
  articles,
  setArticles,
  articleName,
  setProductName,
  articleQuantity,
  setProductQuantity,
  articlePrice,
  setProductPrice,
  articleDescription,
  setProductDescription,
}: InvoiceInfoFormProps) => {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <section className="space-y-6">
      {/* Informations générales de la facture */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Informations générales
        </h3>

        <div className="space-y-4">
          {/* Numéro de facture */}
          <div className="relative w-full">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Numéro de la facture
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Hash size={18} className="text-gray-600" />
              </span>
              <p className="pl-10 bg-gray-50 border font-semibold border-gray-100 text-black text-sm rounded-lg block w-full p-2.5">
                {invoiceId}
              </p>
            </div>
          </div>

          {/* Sélection du client */}

          <ClientsSelect
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
          />

          {/* Titre de la facture */}
          <FormInput
            label="Titre de la facture"
            value={invoiceName}
            onChange={e => setInvoiceName(e.target.value)}
            placeholder="Entrez le nom de la facture"
            icon={<FileText size={18} className="text-gray-600" />}
            required
          />
        </div>
      </div>

      {/* Paramètres de facturation */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Paramètres de facturation
        </h3>

        <div className="space-y-4">
          {/* Date et TVA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date de la facture */}
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="invoiceDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Date de la facture
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setInvoiceDate(new Date().toISOString().split('T')[0])
                  }
                  className="text-xs bg-gray-700 text-white py-1 px-2 rounded-md hover:opacity-90 transition-opacity"
                >
                  Aujourd'hui
                </button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Calendar size={18} className="text-gray-600" />
                </span>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={e => setInvoiceDate(e.target.value)}
                  id="invoiceDate"
                  className="pl-10 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* TVA */}
            <FormInput
              label="TVA (en %)"
              value={invoiceTva.toString()}
              onChange={e => setInvoiceTva(Number(e.target.value))}
              type="number"
              placeholder="TVA"
              icon={<Percent size={18} className="text-gray-600" />}
              required
            />
          </div>

          {/* Mode et conditions de paiement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mode de règlement */}
            <div className="relative">
              <label
                htmlFor="paymentMode"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Mode de règlement
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <CreditCard size={18} className="text-gray-600" />
                </span>
                <select
                  value={invoicePaymentMode}
                  onChange={e => setInvoicePaymentMode(e.target.value)}
                  id="paymentMode"
                  className="pl-10 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all"
                >
                  <option value="CASH">Espèces</option>
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
            </div>

            {/* Conditions de règlement */}
            <div className="relative">
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Conditions de règlement
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Clock size={18} className="text-gray-600" />
                </span>
                <select
                  value={invoicePaymentCondition}
                  onChange={e => setInvoicePaymentCondition(e.target.value)}
                  id="status"
                  className="pl-10 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all"
                >
                  <option value="NOW">Immédiat</option>
                  <option value="15">15 jours</option>
                  <option value="30">30 jours</option>
                  <option value="45">45 jours</option>
                  <option value="60">60 jours</option>
                  <option value="UPONRECEIPT">Jusqu'à réception</option>
                </select>
              </div>
            </div>
          </div>

          {/* Remarque */}
          <FormInput
            label="Remarque"
            value={invoiceRemark}
            onChange={e => setInvoiceRemark(e.target.value)}
            type="textarea"
            placeholder="Entrez une remarque"
            icon={<MessageSquare size={18} className="text-gray-600" />}
            rows={3}
          />
        </div>
      </div>

      {/* Articles */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Articles à facturer
        </h3>

        <ArticleAddForm
          articles={articles}
          setArticles={setArticles}
          articleName={articleName}
          setArticleName={setProductName}
          articleQuantity={articleQuantity}
          setArticleQuantity={setProductQuantity}
          articlePrice={articlePrice}
          setArticlePrice={setProductPrice}
          articleDescription={articleDescription}
          setArticleDescription={setProductDescription}
        />
      </div>

      {/* Message d'erreur */}
      {errorMessage && (
        <div className="rounded-md bg-red-50 p-4 border border-red-100 shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InvoiceInfoForm;
