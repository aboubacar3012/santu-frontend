'use client';
import Badge from '@/src/components/Badge';
import Button from '@/src/components/shared/Button';
import PrevHeader from '@/src/components/shared/PrevHeader';
import Stamp from '@/src/components/Stamp';
import { RootState } from '@/src/redux/store';
import { getInvoiceById } from '@/src/services/invoice';
import { Invoice } from '@/src/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import {
  FaAngleLeft,
  FaPrint,
  FaEnvelope,
  FaDownload,
  FaShare,
} from 'react-icons/fa6';
import { MdPayment, MdContentCopy } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { formatDate, formatCurrency } from '@/src/utils/formatters';

// Styles pour l'impression et le design général
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  .invoice-container {
    font-family: 'Inter', sans-serif;
    --primary-color: #4F46E5;
    --secondary-color: #818CF8;
    --text-color: #1F2937;
    --light-bg: #F9FAFB;
    --accent-color: #10B981;
  }
  
  .invoice-card {
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  .invoice-header {
    position: relative;
    overflow: hidden;
    border-radius: 0.75rem;
  }
  
  .status-badge {
    transition: all 0.3s ease;
  }
  
  .invoice-table {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
  }
  
  .invoice-table th {
    background-color: var(--light-bg);
    color: var(--text-color);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }
  
  .invoice-table th, .invoice-table td {
    padding: 1rem;
    border-bottom: 1px solid #E5E7EB;
  }
  
  .invoice-table tbody tr:hover {
    background-color: rgba(79, 70, 229, 0.05);
  }
  
  @media print {
    body * {
      visibility: visible;
    }

    .no-print, .no-print * {
      display: none !important;
    }

    .print-section {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      background-color: white;
    }

    @page {
      margin: 1cm;
      size: auto;
    }

    header, footer, nav {
      display: none !important;
    }

    .invoice-card {
      box-shadow: none !important;
      border: 1px solid #E5E7EB;
    }
    
    .invoice-header:after {
      display: none;
    }
  }
`;

// Cette fonction indique à Next.js que cette page doit être générée côté client
// et non dans le cadre de l'export statique
export const dynamic = 'force-dynamic';

const SingleInvoicePage = ({ params }: { params: { invoiceId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);

  const auth = useSelector((state: RootState) => state.auth);
  const loggedAccount = auth.loggedAccountInfos;

  const handlePushLeft = () => {
    router.back();
  };

  const fetchData = async () => {
    getInvoiceById(params.invoiceId, auth.token!)
      .then(data => {
        if (data.success) {
          setInvoiceData(data.invoice);
          setLoading(false);
        } else if (!data.success) {
          setError(
            "Une erreur s'est produite lors de la récupération de la facture"
          );
          setLoading(false);
        }
      })
      .catch(error => {
        setError(
          "Une erreur s'est produite lors de la récupération de la facture"
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    // Définir la couleur de base du document lors du chargement
    document.documentElement.style.setProperty('--primary-color', '#4F46E5');
  }, []);

  const handlePrintSection = () => {
    window.print();
  };

  const handleCopyInvoiceLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      case 'SENT':
        return 'bg-blue-100 text-blue-800';
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'Brouillon';
      case 'SENT':
        return 'Envoyée';
      case 'PAID':
        return 'Payée';
      case 'CANCELLED':
        return 'Annulée';
      default:
        return status;
    }
  };

  const calculateTotal = () => {
    if (!invoiceData?.articles) return 0;
    return invoiceData.articles.reduce(
      (sum, article) => sum + article.price * article.quantity,
      0
    );
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return <div className="text-center p-10 text-red-500">{error}</div>;

  if (!invoiceData)
    return <div className="text-center p-10">Aucune facture trouvée</div>;

  return (
    <div className="invoice-container bg-gray-50 min-h-screen">
      {/* Ajouter les styles d'impression et design */}
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <PrevHeader />

      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-6"
        >
          {/* Main invoice section - Now on the left */}
          <section
            ref={sectionRef}
            className="print-section md:w-3/4 w-full order-2 md:order-1"
          >
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
                      <span className="font-semibold">
                        {invoiceData.invoiceNumber}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${getStatusColor(
                      invoiceData.status
                    )} status-badge px-4 py-2 rounded-full font-medium text-sm`}
                  >
                    {getStatusText(invoiceData.status)}
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
                        <img
                          src={loggedAccount.logo}
                          alt="Logo"
                          className="w-16 h-16 object-contain"
                        />
                      )}
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">
                          {loggedAccount &&
                          loggedAccount.company &&
                          loggedAccount.company?.length > 0
                            ? loggedAccount.company
                            : `${loggedAccount?.firstName} ${loggedAccount?.lastName}`}
                        </h4>
                        <p className="text-gray-700 mt-1">
                          {loggedAccount?.address}
                        </p>
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
                        {invoiceData.client &&
                        invoiceData.client.company &&
                        invoiceData.client.company?.length > 0
                          ? invoiceData.client.company
                          : `${invoiceData.client.firstName} ${invoiceData.client.lastName}`}
                      </h4>
                      <p className="text-gray-700 mt-1">
                        {invoiceData.client.address}
                      </p>
                      <p className="text-gray-700">
                        {invoiceData.client.phone}
                      </p>
                      <p className="text-gray-700">
                        {invoiceData.client.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Détails de la facture */}
                <div className="mb-10 flex flex-col md:flex-row gap-4 bg-gray-50 p-4 rounded-lg">
                  <div className="md:w-1/3 p-3">
                    <p className="text-sm text-gray-600">Date d'émission</p>
                    <p className="font-medium">{invoiceData.date}</p>
                  </div>
                  <div className="md:w-1/3 p-3">
                    <p className="text-sm text-gray-600">
                      Conditions de paiement
                    </p>
                    <p className="font-medium">
                      {invoiceData.paymentCondition === 'NOW'
                        ? 'Immédiat'
                        : `${invoiceData.paymentCondition} jours`}
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
                      {invoiceData?.articles.map((article, index) => (
                        <tr key={index}>
                          <td className="text-left">{index + 1}</td>
                          <td className="text-left">
                            <div className="font-medium">{article.name}</div>
                            {article.description && (
                              <div className="text-gray-500 text-xs mt-1">
                                {article.description}
                              </div>
                            )}
                          </td>
                          <td className="text-center">{article.quantity}</td>
                          <td className="text-right">
                            {article.price.toLocaleString()} GNF
                          </td>
                          <td className="text-right font-medium">
                            {(
                              article.price * article.quantity
                            ).toLocaleString()}{' '}
                            GNF
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totaux */}
                <div className="flex justify-end">
                  <div className="w-full md:w-72">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Sous-total</span>
                        <span className="font-medium">
                          {invoiceData.amount.toLocaleString()} GNF
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">TVA (0%)</span>
                        <span className="font-medium">0 GNF</span>
                      </div>
                      <div className="h-px bg-gray-200 my-2"></div>
                      <div className="flex justify-between py-2 text-lg">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-indigo-600">
                          {invoiceData.amount.toLocaleString()} GNF
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stamp et conditions */}
                <div className="mt-10 relative">
                  {invoiceData.status === 'PAID' ? (
                    <div className="absolute transform -rotate-12 top-0 left-4">
                      <Stamp type="paid" />
                    </div>
                  ) : (
                    <div className="absolute transform -rotate-12 top-0 left-4">
                      <Stamp type="unpaid" />
                    </div>
                  )}

                  <div className="border-t pt-6 mt-6">
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-gray-600 text-sm">
                      Merci pour votre confiance. Pour toute question concernant
                      cette facture, veuillez nous contacter.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 p-4 text-center text-sm text-gray-500 border-t">
                <p>
                  Cette facture a été générée électroniquement via SantouPro
                </p>
              </div>
            </motion.div>
          </section>

          {/* Actions panel - Now on the right */}
          <div className="md:w-1/4 w-full no-print order-1 md:order-2">
            <div className="bg-white rounded-xl overflow-hidden shadow-md sticky top-20">
              <div className="bg-gradient-to-r from-my-raspberry to-my-eggplant p-4 text-white">
                <h3 className="font-medium">Actions</h3>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <Button
                  onClick={handlePrintSection}
                  variant="secondary"
                  className="flex items-center justify-start gap-2 hover:bg-gray-100 transition-colors"
                  icon={<FaPrint />}
                  iconPosition="left"
                >
                  Imprimer
                </Button>

                <Button
                  onClick={() =>
                    alert('Fonctionnalité en cours de développement')
                  }
                  variant="secondary"
                  className="flex items-center justify-start gap-2 hover:bg-gray-100 transition-colors"
                  icon={<FaEnvelope />}
                  iconPosition="left"
                >
                  Envoyer par email
                </Button>

                {invoiceData.status === 'DRAFT' && (
                  <Button
                    variant="secondary"
                    className="flex items-center justify-start gap-2 hover:bg-green-100 text-green-700 transition-colors"
                    icon={<MdPayment />}
                    iconPosition="left"
                  >
                    Marquer comme payée
                  </Button>
                )}

                <Button
                  onClick={() =>
                    alert('Fonctionnalité en cours de développement')
                  }
                  variant="secondary"
                  className="flex items-center justify-start gap-2 hover:bg-gray-100 transition-colors"
                  icon={<FaDownload />}
                  iconPosition="left"
                >
                  Télécharger PDF
                </Button>

                <Button
                  onClick={handleCopyInvoiceLink}
                  variant="secondary"
                  className="flex items-center justify-start gap-2 hover:bg-gray-100 transition-colors"
                  icon={<MdContentCopy />}
                  iconPosition="left"
                >
                  {showCopiedMessage ? 'Lien copié!' : 'Copier le lien'}
                </Button>

                <Button
                  onClick={() =>
                    alert('Fonctionnalité en cours de développement')
                  }
                  variant="secondary"
                  className="flex items-center justify-start gap-2 hover:bg-gray-100 transition-colors"
                  icon={<FaShare />}
                  iconPosition="left"
                >
                  Partager
                </Button>
              </div>

              <div className="p-4 border-t">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      invoiceData.status === 'PAID'
                        ? 'bg-green-500'
                        : 'bg-yellow-500'
                    }`}
                  ></div>
                  <span className="text-sm font-medium">
                    {invoiceData.status === 'PAID' ? 'Payée' : 'En attente'}
                  </span>
                </div>

                <div className="flex flex-col text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Date d'émission:</span>
                    <span className="font-medium">{invoiceData.date}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Paiement dû:</span>
                    <span className="font-medium">
                      {invoiceData.paymentCondition === 'NOW'
                        ? 'Immédiat'
                        : `${invoiceData.date} + ${invoiceData.paymentCondition}j`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50">
                <h4 className="font-medium text-sm mb-2">Scanner pour payer</h4>
                <div className="bg-white p-3 rounded flex justify-center">
                  <QRCode
                    size={150}
                    value={`https://santu-pro.com/pay/${123456}`}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SingleInvoicePage;
