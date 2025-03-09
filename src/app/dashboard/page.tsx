'use client';
import { useEffect, useState } from 'react';
import StatCard from '@/src/components/StatCard';
import { IoMdAdd } from 'react-icons/io';
import Badge from '@/src/components/Badge';
import { useRouter } from 'next/navigation';
import InvoiceForm from '../../components/invoice/InvoiceForm';
import { getDashboard } from '@/src/services/invoice';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { Invoice } from '@/src/types';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { GiMoneyStack } from 'react-icons/gi';
import { FaEdit, FaTrash, FaUserFriends } from 'react-icons/fa';
import { formatCurrency } from '@/src/libs/formatCurrency';
import { useUrlParams } from '@/src/hooks/useUrlParams';
import { toast } from 'react-toastify';
import FilterSection from '@/src/components/FilterSection';
import { motion } from 'framer-motion';
import DashboardHead from '@/src/components/DashboardHead';
import Button from '@/src/components/shared/Button';

const DashboardPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<any | null>(null);

  const router = useRouter();
  const { hasParams, setParams, deleteParams } = useUrlParams();
  const auth = useSelector((state: RootState) => state.auth);

  // Utilisation du hook personnalisé
  const showInvoiceForm = hasParams('addInvoice');
  const isEditMode = hasParams('invoiceId');

  const fetchData = async () => {
    getDashboard(auth.loggedAccountInfos?._id!, auth.token!)
      .then(data => {
        if (data.success) {
          setDashboardData(data.dashboardData);
          setLoading(false);
        } else if (!data.success) {
          setError(
            "Une erreur s'est produite lors de la récupération de l'utilisateur"
          );
          setLoading(false);
        }
      })
      .catch(error => {
        setError(
          "Une erreur s'est produite lors de la récupération de l'utilisateur"
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [showInvoiceForm]);

  // Utilisation du hook personnalisé pour les fonctions d'ouverture/fermeture
  const openInvoiceForm = () => {
    setParams('addInvoice', 'true');
  };

  const closeInvoiceForm = () => {
    deleteParams(['addInvoice', 'invoiceId']);
  };

  const handleOpenInvoice = (invoiceId: string) => {
    router.push(`/dashboard/invoice/${invoiceId}`);
  };

  const handleEditInvoice = (e: React.MouseEvent, invoiceId: string) => {
    e.stopPropagation(); // Empêche la navigation vers la page de la facture
    setParams({ addInvoice: 'true', invoiceId: invoiceId });
  };

  const handleDeleteInvoice = (e: React.MouseEvent, invoiceId: string) => {
    e.stopPropagation(); // Empêche la navigation vers la page de la facture
    if (confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
      // Ajouter ici la logique pour supprimer la facture
      toast.success('Fonctionnalité de suppression à implémenter');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!dashboardData) {
    return <div>Dashboard data not found</div>;
  }

  return (
    <div>
      <InvoiceForm
        isOpen={showInvoiceForm}
        isEdit={false}
        onClose={closeInvoiceForm}
      />
      <DashboardHead />
      {/* Filtre */}
      <FilterSection />
      <div className="grid grid-cols-4 gap-4 py-2">
        <StatCard
          title="Aujourd'hui"
          value={`${formatCurrency(dashboardData.totalToday)}`}
          unit="Total vendu"
          icon={<GiMoneyStack className="w-8 h-8 text-green-500" />}
        />
        <StatCard
          title="Chiffres d'affaire"
          value={`${formatCurrency(dashboardData.total)}`}
          unit="Toute les factures"
          icon={<GiMoneyStack className="w-8 h-8 text-blue-500" />}
        />
        <StatCard
          title="Nombre de clients"
          value={dashboardData.clientsCount}
          unit="clients"
          icon={<FaUserFriends className="w-8 h-8 text-purple-500" />}
        />
        <StatCard
          title="Nombre de factures"
          value={dashboardData.invoicesCount}
          unit="factures"
          icon={
            <LiaFileInvoiceDollarSolid className="w-8 h-8 text-yellow-500" />
          }
        />
      </div>
      <div className="flex justify-end items-center">
        <Button
          onClick={openInvoiceForm}
          icon={<IoMdAdd className="w-5 h-5" />}
        >
          Créer une facture
        </Button>
      </div>

      {/* Invoices list */}
      <div className="relative overflow-x-auto shadow-md rounded-lg mt-4 bg-white">
        <table className="w-full text-sm text-left text-black">
          <thead className="text-xs uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3 text-white">
                Nom de la facture
              </th>
              <th scope="col" className="px-4 py-3 text-white">
                ID
              </th>
              <th scope="col" className="px-4 py-3 text-white">
                Montant
              </th>
              <th scope="col" className="px-4 py-3 text-white">
                Date de création
              </th>
              <th scope="col" className="px-4 py-3 text-white">
                Status
              </th>
              <th scope="col" className="px-4 py-3 w-28 text-white text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.invoices.map(
              (invoice: Partial<Invoice>, index: number) => (
                <tr
                  onClick={() => handleOpenInvoice(invoice._id!)}
                  key={index}
                  className="border-b cursor-pointer hover:bg-gray-200"
                >
                  <td className="px-4 py-4">{invoice.name}</td>
                  <td className="px-4 py-4">{invoice.invoiceNumber}</td>
                  <td className="px-4 py-4">{invoice.amount} GNF</td>
                  <td className="px-4 py-4">{invoice.date}</td>
                  <td className="px-4 py-4 flex">
                    {invoice.status === 'DRAFT' && (
                      <Badge type="gray" text="Brouillon" />
                    )}
                    {invoice.status === 'SENT' && (
                      <Badge type="blue" text="Envoyée" />
                    )}
                    {invoice.status === 'PAID' && (
                      <Badge type="green" text="Déjà payée" />
                    )}
                    {invoice.status === 'CANCELLED' && (
                      <Badge type="red" text="Annulée" />
                    )}
                  </td>
                  <td className="text-xs py-4 w-28">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={e => handleEditInvoice(e, invoice._id!)}
                        className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-100"
                        title="Modifier"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={e => handleDeleteInvoice(e, invoice._id!)}
                        className="text-red-600 hover:text-red-800 p-1.5 rounded-full hover:bg-red-100"
                        title="Supprimer"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
