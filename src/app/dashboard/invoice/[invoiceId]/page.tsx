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
      .then(response => {
        if (response && response.success && response.invoice) {
          setInvoiceData(response.invoice);
          setLoading(false);
        } else {
          const errorMessage = response?.message || "Une erreur s'est produite lors de la récupération de la facture";
          setError(errorMessage);
          setLoading(false);
        }
      })
      .catch(error => {
        setError("Une erreur s'est produite lors de la récupération de la facture");
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

  const handleCopyLink = () => {
    if (sectionRef.current) {
      navigator.clipboard.writeText(window.location.href);
      setShowCopiedMessage(true);
      setTimeout(() => {
        setShowCopiedMessage(false);
      }, 2000);
    }
  };
  const handleDownloadPDF = () => {
    if (sectionRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Facture</title>');
        printWindow.document.write('<style>' + printStyles + '</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(sectionRef.current.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  if (!invoiceData) return <div className="text-center p-10">Aucune facture trouvée</div>;

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
          <InvoiceActionPanelLeft invoice={invoiceData} handlePrintSection={handlePrintSection} />

          {/* Actions panel - Using the separated component */}
          <InvoiceActionPanelRight invoice={invoiceData} handlePrint={handlePrintSection} handleDownloadPDF={handleDownloadPDF} handleCopyLink={handleCopyLink} showCopiedMessage={showCopiedMessage} />
        </motion.div>
      </div>
    </div>
  );
};

export default SingleInvoicePage;
