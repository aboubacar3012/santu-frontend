import { RootState } from '@/src/redux/store';
import { useSelector } from 'react-redux';
import ClientForm from '../client/ClientForm';
import { useState } from 'react';
import Link from 'next/link';
import ClientsSelect from './ClientsSelect';
import { Article } from '@/src/types';
import { toast } from 'react-toastify';

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

  const addArticle = () => {
    if (!articleName || !articlePrice)
      alert('Veuillez remplir tous les champs');

    if (articleName && articlePrice) {
      const article: Partial<Article> = {
        name: articleName,
        price: parseInt(articlePrice),
        description: articleDescription,
      };
      setArticles([...articles, article]);
      toast.success('Produit ajouté avec succès', {
        position: 'top-center',
      });
      setProductName('');
      setProductQuantity('');
      setProductPrice('');
      setProductDescription('');
    }
  };

  return (
    <>
      <div className="flex flex-col gap-1 px-4 py-2">
        <div className="relative w-full min-w-[200px]">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-black"
          >
            Numéro de la facture
          </label>
          <p className="bg-gray-50 border font-semibold border-gray-100 text-black text-sm rounded-lg  block w-full p-2.5">
            {invoiceId}
          </p>
        </div>
      </div>
      {/* Choisir le client */}
      {true && (
        <ClientsSelect
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
        />
      )}
      <div className="flex flex-col gap-1 px-4 py-2">
        <div className="relative w-full min-w-[200px]">
          <label
            htmlFor="invoiceName"
            className="block mb-2 text-sm font-medium text-black"
          >
            Donner un titre a votre facture
          </label>
          <input
            value={invoiceName}
            onChange={e => setInvoiceName(e.target.value)}
            type="text"
            id="invoiceName"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
            placeholder="Entrez le nom de la facture"
            required
          />
        </div>
      </div>

      <div className="flex gap-2 px-4 justify-center items-center">
        <div className="w-1/2 flex flex-col gap-1 py-2">
          <div className="relative w-full min-w-[200px]">
            <div className="flex justify-between items-center py-1">
              <label
                htmlFor="invoiceDate"
                className="text-sm font-medium text-black"
              >
                Date de la facture
              </label>
              <button
                type="button"
                onClick={() =>
                  setInvoiceDate(new Date().toISOString().split('T')[0])
                }
                className="text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md"
              >
                Aujourdhui
              </button>
            </div>
            <input
              type="date"
              value={invoiceDate}
              onChange={e => setInvoiceDate(e.target.value)}
              id="invoiceDate"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-1 py-2">
          <div className="relative w-full min-w-[200px]">
            <label
              htmlFor="tva"
              className="block mb-2 text-sm font-medium text-black"
            >
              TVA (en %)
            </label>
            <input
              value={invoiceTva}
              onChange={e => setInvoiceTva(Number(e.target.value))}
              type="number"
              id="tva"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
              placeholder="TVA"
              required
            />
          </div>
        </div>
      </div>

      {/* Conditions de règlement (Immédiat) */}
      <div className="flex gap-2 px-4">
        <div className="w-1/2 flex flex-col gap-1 py-2">
          <label
            htmlFor="paymentMode"
            className="block text-sm font-medium text-black "
          >
            Mode de règlement
          </label>
          <select
            value={invoicePaymentMode}
            onChange={e => setInvoicePaymentMode(e.target.value)}
            id="paymentMode"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 "
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
        <div className="w-1/2 flex flex-col gap-1 py-2">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-black "
          >
            Conditions de règlement
          </label>
          <select
            value={invoicePaymentCondition}
            onChange={e => setInvoicePaymentCondition(e.target.value)}
            id="status"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 "
          >
            <option value="NOW">Immédiat</option>
            <option value="15">15 jours</option>
            <option value="30">30 jours</option>
            <option value="45">45 jours</option>
            <option value="60">60 jours</option>
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
          <label
            htmlFor="objective"
            className="block mb-2 text-sm font-medium text-black"
          >
            Rémarque
          </label>
          <textarea
            value={invoiceRemark}
            onChange={e => setInvoiceRemark(e.target.value)}
            id="objective"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
            placeholder="Entrez une remarque"
          />
        </div>
      </div>

      <div className="overflow-auto flex flex-col gap-2 bg-white py-4 px-2 h-32">
        {articles && articles.length > 0 && (
          <div className="shadow-md  mt-2 bg-white ">
            <table className="w-full text-sm text-left text-black sticky">
              <thead className="text-xs text-white uppercase bg-gray-700 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product/Service
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                    Quantité
                  </th> */}
                  <th scope="col" className="px-6 py-3">
                    Montant toal (GNF)
                  </th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article, index) => (
                  <tr
                    onClick={() => {}}
                    key={index}
                    className="text-xs border-b cursor-pointer hover:bg-gray-200"
                  >
                    <td className="px-6 py-2 text-black">{index + 1}</td>
                    <td className="px-6 py-2 font-medium text-black whitespace-wrap">
                      {article.name}
                      <p className="text-xs text-gray-400">
                        {article.description}
                      </p>
                    </td>
                    {/* <td className="px-6 py-2 text-black">
                        {article.quantity}
                      </td> */}
                    <td className="px-6 py-2 text-black">
                      {article.price} GNF
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {articles && articles.length === 0 && (
          <p className="text-black font-semibold text-center mt-12">
            Veillez ajouter un produit ou service
          </p>
        )}
      </div>
      <hr className="w-full border-gray-50 py-2" />
      <div className="flex max-w-full gap-2">
        <div className="flex w-full flex-col gap-1 pl-4 py-2">
          <div className="relative w-full min-w-[200px]">
            <label
              htmlFor="article"
              className="block mb-2 text-sm font-medium text-black"
            >
              Nom du produit/service
            </label>
            <input
              value={articleName}
              onChange={e => setProductName(e.target.value)}
              type="text"
              id="article"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
              placeholder="Entrez le nom du produit ou service"
              required
            />
          </div>
        </div>
        <div className="flex gap-2 pr-4 py-2">
          <div className="relative w-full min-w-[200px]">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-black"
            >
              Montant total (GNF)
            </label>
            <input
              value={articlePrice}
              onChange={e => setProductPrice(e.target.value)}
              type="number"
              id="price"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
              placeholder="Entrez le montant total du produit ou service"
              required
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 px-4 py-2">
        <div className="relative w-full min-w-[200px]">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-black"
          >
            Description (optionnel)
          </label>
          <textarea
            value={articleDescription}
            onChange={e => setProductDescription(e.target.value)}
            id="description"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
            placeholder="Entrez une description du produit ou service"
            required
          />
        </div>
      </div>

      <button
        type="button"
        disabled={!articleName && !articlePrice}
        onClick={addArticle}
        className="mx-4 w-min px-6 font-semibold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
      >
        Ajouter
      </button>

      <div className="px-2">
        {errorMessage && (
          <div className="px-2 relative block w-full p-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
            {errorMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default InvoiceInfoForm;
