'use client';
import { motion } from 'framer-motion';
import { Client, Invoice } from '@/src/types';
import Stamp from '@/src/components/Stamp';
import { getStatusColor } from '@/src/libs/getStatusColor';
import { getStatusText } from '@/src/libs/getStatusText';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';

interface InvoiceActionPanelLeftProps {
  invoice: Invoice;
  handlePrintSection: () => void;
}

const InvoiceActionPanelLeft = ({ invoice, handlePrintSection }: InvoiceActionPanelLeftProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const loggedAccount = auth.loggedAccountInfos;
  const client = invoice.client as Client;

  return (
    <section ref={undefined} className="print-section md:w-3/4 w-full order-2 md:order-1">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="invoice-card bg-white rounded-xl overflow-hidden mb-8"
      >
        {/* Entête colorée */}
        <div className="invoice-header bg-gradient-to-r from-my-raspberry to-my-eggplant p-8 text-white relative">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">Facture</h1>
              <div className="flex items-center gap-2">
                <span className="text-indigo-100">N°: </span>
                <span className="font-semibold">{invoice.invoiceNumber}</span>
              </div>
            </div>
            <div
              className={`${getStatusColor(
                invoice.status
              )} status-badge px-4 py-2 rounded-full font-medium text-sm`}
            >
              {getStatusText(invoice.status)}
            </div>
          </div>
        </div>

        {/* Informations principales */}
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
            {/* Émetteur de la facture */}
            <div className="md:w-1/2">
              <h3 className="text-xs uppercase text-gray-500 font-medium tracking-wider mb-3">
                De
              </h3>
              <div className="flex items-start gap-4">
                {loggedAccount && loggedAccount.logo && (
                  <img src={loggedAccount.logo} alt="Logo" className="w-16 h-16 object-contain" />
                )}
                <div>
                  <h4 className="font-bold text-lg text-gray-900">
                    {loggedAccount && loggedAccount.company && loggedAccount.company?.length > 0
                      ? loggedAccount.company
                      : `${loggedAccount?.firstName} ${loggedAccount?.lastName}`}
                  </h4>
                  <p className="text-gray-700 mt-1">{loggedAccount?.address}</p>
                  <p className="text-gray-700">{loggedAccount?.phone}</p>
                  <p className="text-gray-700">{loggedAccount?.email}</p>
                </div>
              </div>
            </div>

            {/* Destinataire de la facture */}
            <div className="md:w-1/2">
              <h3 className="text-xs uppercase text-gray-500 font-medium tracking-wider mb-3">
                Facturer à
              </h3>
              <div>
                <h4 className="font-bold text-lg text-gray-900">
                  {client && client.company && client.company?.length > 0
                    ? client.company
                    : `${client.firstName} ${client.lastName}`}
                </h4>
                <p className="text-gray-700 mt-1">{client.address}</p>
                <p className="text-gray-700">{client.phone}</p>
                <p className="text-gray-700">{client.email}</p>
              </div>
            </div>
          </div>

          {/* Détails de la facture */}
          <div className="mb-10 flex flex-col md:flex-row gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="md:w-1/3 p-3">
              <p className="text-sm text-gray-600">Date d'émission</p>
              <p className="font-medium">{invoice.date}</p>
            </div>
            <div className="md:w-1/3 p-3">
              <p className="text-sm text-gray-600">Conditions de paiement</p>
              <p className="font-medium">
                {invoice.paymentCondition === 'NOW'
                  ? 'Immédiat'
                  : `${invoice.paymentCondition} jours`}
              </p>
            </div>
            <div className="md:w-1/3 p-3">
              <p className="text-sm text-gray-600">Mode de paiement</p>
              <p className="font-medium">Espèces</p>
            </div>
          </div>

          {/* Tableau des articles */}
          <div className="mb-8 overflow-x-auto">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th className="text-left rounded-tl-lg">#</th>
                  <th className="text-left">Description</th>
                  <th className="text-center">Quantité</th>
                  <th className="text-right">Prix</th>
                  <th className="text-right rounded-tr-lg">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice?.articles.map((article, index) => (
                  <tr key={index}>
                    <td className="text-left">{index + 1}</td>
                    <td className="text-left">
                      <div className="font-medium">{article.name}</div>
                      {article.description && (
                        <div className="text-gray-500 text-xs mt-1">{article.description}</div>
                      )}
                    </td>
                    <td className="text-center">{article.quantity}</td>
                    <td className="text-right">{article?.price?.toLocaleString()} GNF</td>
                    <td className="text-right font-medium">
                      {((article?.price || 0) * (article?.quantity || 0)).toLocaleString()} GNF
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totaux et Stamp */}
          <div className="mt-10 relative">
            {invoice.status === 'PAID' && (
              <div className="absolute transform -rotate-12 top-12 left-16">
                <Stamp type="PAID" />
              </div>
            )}
            {invoice.status === 'DRAFT' && (
              <div className="absolute transform -rotate-12 top-12 left-16">
                <Stamp type="DRAFT" />
              </div>
            )}
            {invoice.status !== 'DRAFT' && invoice.status !== 'PAID' && (
              <div className="absolute transform -rotate-12 top-12 left-16">
                <Stamp type="UNPAID" />
              </div>
            )}

            <div className="flex justify-end">
              <div className="w-full md:w-72">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">{invoice.amount.toLocaleString()} GNF</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">TVA (0%)</span>
                    <span className="font-medium">0 GNF</span>
                  </div>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <div className="flex justify-between py-2 text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-indigo-600">
                      {invoice.amount.toLocaleString()} GNF
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 mt-6">
            <h4 className="font-medium mb-2">Notes</h4>
            <p className="text-gray-600 text-sm">
              Merci pour votre confiance. Pour toute question concernant cette facture, veuillez
              nous contacter.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center text-sm text-gray-500 border-t">
          <p>Cette facture a été générée électroniquement via SantouPro</p>
        </div>
      </motion.div>
    </section>
  );
};

export default InvoiceActionPanelLeft;
