'use client';
import InvoiceForm from '../../components/invoice/InvoiceForm';
import { useUrlParams } from '@/src/hooks/useUrlParams';
import DashboardHead from '@/src/components/DashboardHead';
import WelcomeModalInfo from '@/src/components/WelcomeModalInfo';
import Dashboard from '@/src/components/dashboard/Dashboard';
import FilterSection from '@/src/components/FilterSection';

const DashboardPage = () => {
  const { hasParams, deleteParams } = useUrlParams();

  // Utilisation du hook personnalisé
  const showInvoiceForm = hasParams('invoiceForm');

  const closeInvoiceForm = () => {
    deleteParams(['invoiceForm', 'invoiceId']);
  };

  return (
    <div>
      <InvoiceForm isOpen={showInvoiceForm} isEdit={false} onClose={closeInvoiceForm} />
      <DashboardHead />
      <FilterSection />
      <Dashboard />
      <WelcomeModalInfo />
    </div>
  );
};

export default DashboardPage;
