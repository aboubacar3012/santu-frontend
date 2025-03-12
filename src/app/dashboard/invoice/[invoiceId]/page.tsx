'use client';
import PrevHeader from '@/src/components/shared/PrevHeader';
import { RootState } from '@/src/redux/store';
import { getInvoiceById } from '@/src/services/invoice';
import { Invoice } from '@/src/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import InvoiceActionPanelRight from '@/src/components/invoice/InvoiceActionPanelRight';
import InvoiceActionPanelLeft from '@/src/components/invoice/InvoiceActionPanelLeft';
import { printStyles } from '@/src/constants/InvoiceStyle';

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
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      <PrevHeader />

      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-6"
        >
          {/* Main invoice section - Now using the InvoiceActionPanelLeft component */}
          <InvoiceActionPanelLeft
            invoice={invoiceData}
            handlePrintSection={handlePrintSection}
          />

          {/* Actions panel - Using the separated component */}
          <InvoiceActionPanelRight
            invoice={invoiceData}
            handlePrint={handlePrintSection}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SingleInvoicePage;
