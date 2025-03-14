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
import { FileText, Calendar, Percent, CreditCard, Clock, MessageSquare, Hash } from 'lucide-react';
import GeneralInvoiceInfo from './GeneralInvoiceInfo';
import InvoiceBillingParameters from './InvoiceBillingParameters';

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
  return (
    <section className="space-y-6">
      {/* Informations générales de la facture */}
      <GeneralInvoiceInfo
        invoiceId={invoiceId}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        invoiceName={invoiceName}
        setInvoiceName={setInvoiceName}
      />

      {/* Paramètres de facturation */}
      <InvoiceBillingParameters
        invoiceDate={invoiceDate}
        setInvoiceDate={setInvoiceDate}
        invoiceTva={invoiceTva}
        setInvoiceTva={setInvoiceTva}
        invoicePaymentMode={invoicePaymentMode}
        setInvoicePaymentMode={setInvoicePaymentMode}
        invoicePaymentCondition={invoicePaymentCondition}
        setInvoicePaymentCondition={setInvoicePaymentCondition}
        invoiceRemark={invoiceRemark}
        setInvoiceRemark={setInvoiceRemark}
      />

      {/* Articles  à facturer*/}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Articles à facturer</h3>

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
