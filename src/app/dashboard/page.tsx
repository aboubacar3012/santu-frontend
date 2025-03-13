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
import { Invoice, StatusEnum } from '@/src/types';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { GiMoneyStack } from 'react-icons/gi';
import { FaUserFriends } from 'react-icons/fa';
import { formatCurrency } from '@/src/libs/formatCurrency';
import { useUrlParams } from '@/src/hooks/useUrlParams';
import { toast } from 'react-toastify';
import FilterSection from '@/src/components/FilterSection';
import DashboardHead from '@/src/components/DashboardHead';
import Button from '@/src/components/shared/Button';
import Table, { Column } from '@/src/components/shared/Table';
import { useUpdateInvoice } from '@/src/hooks/invoice/useUpdateInvoice';

const DashboardPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<any | null>(null);

  const router = useRouter();
  const { hasParams, setParams, deleteParams } = useUrlParams();
  const auth = useSelector((state: RootState) => state.auth);
  const updateInvoiceMutation = useUpdateInvoice('token');

  // Utilisation du hook personnalisé
  const showInvoiceForm = hasParams('invoiceForm');
  const isEditMode = hasParams('invoiceId');

  const fetchData = async () => {
    getDashboard(auth.loggedAccountInfos?._id!, auth.token!)
      .then(data => {
        if (data.success) {
          setDashboardData(data.dashboardData);
          setLoading(false);
        } else if (!data.success) {
          setError("Une erreur s'est produite lors de la récupération de l'utilisateur");
          setLoading(false);
        }
      })
      .catch(error => {
        setError("Une erreur s'est produite lors de la récupération de l'utilisateur");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [showInvoiceForm]);

  // Utilisation du hook personnalisé pour les fonctions d'ouverture/fermeture
  const openInvoiceForm = () => {
    setParams('invoiceForm', 'true');
  };

  const closeInvoiceForm = () => {
    deleteParams(['invoiceForm', 'invoiceId']);
  };

  const handleOpenInvoice = (invoice: Partial<Invoice>) => {
    router.push(`/dashboard/invoice/${invoice._id}`);
  };

  const handleEditInvoice = (e: React.MouseEvent, invoiceId: string) => {
    e.stopPropagation(); // Empêche la navigation vers la page de la facture
    setParams({ invoiceForm: 'true', invoiceId: invoiceId });
  };

  const handleCancelInvoice = (e: React.MouseEvent, invoiceId: string) => {
    e.stopPropagation(); // Empêche la navigation vers la page de la facture
    if (confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
      const invoice = {
        _id: invoiceId,
        status: StatusEnum.CANCELLED,
      };

      updateInvoiceMutation.mutate(invoice, {
        onSuccess: () => {
          toast.success('La facture a été annulée avec succès');
          fetchData(); // Recharger les données du dashboard
        },
        onError: error => {
          toast.error("Une erreur est survenue lors de l'annulation de la facture");
          console.error("Erreur lors de l'annulation de la facture:", error);
        },
      });
    }
  };

  // Définition des colonnes pour la table des factures
  const invoiceColumns: Column<Partial<Invoice>>[] = [
    { header: 'Nom de la facture', accessor: 'name' },
    { header: 'ID', accessor: 'invoiceNumber' },
    { header: 'Montant', accessor: invoice => `${invoice.amount} GNF` },
    { header: 'Date de création', accessor: 'date' },
    {
      header: 'Status',
      accessor: invoice => {
        if (invoice.status === StatusEnum.DRAFT) return <Badge type="yellow" text="Brouillon" />;
        if (invoice.status === StatusEnum.PENDING) return <Badge type="blue" text="Envoyée" />;
        if (invoice.status === StatusEnum.PAID) return <Badge type="green" text="Déjà payée" />;
        if (invoice.status === StatusEnum.CANCELLED) return <Badge type="red" text="Annulée" />;
        return null;
      },
    },
    {
      header: 'Action',
      className: 'w-28 text-center',
      accessor: invoice => (
        <div className="flex justify-center gap-3">
          {/* <button
            onClick={e => handleEditInvoice(e, invoice._id!)}
            className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-100"
            title="Modifier"
          >
            <FaEdit size={18} />
          </button> */}
          <button
            onClick={e => handleCancelInvoice(e, invoice._id!)}
            className="text-red-600 hover:text-red-800 p-2 rounded-full bg-red-100 hover:bg-red-200"
            // title="Supprimer"s
          >
            {/* <FaTrash size={18} /> */}
            Abandonner
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!dashboardData) {
    return <div>Dashboard data not found</div>;
  }

  return (
    <div>
      <InvoiceForm isOpen={showInvoiceForm} isEdit={false} onClose={closeInvoiceForm} />
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
          title="Ce mois-ci"
          value={`${formatCurrency(dashboardData.total)}`}
          unit="Toute les factures"
          icon={<GiMoneyStack className="w-8 h-8 text-blue-500" />}
          isVisible={false}
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
          icon={<LiaFileInvoiceDollarSolid className="w-8 h-8 text-yellow-500" />}
        />
      </div>
      <div className="flex justify-end items-center mt-3">
        <Button onClick={openInvoiceForm} icon={<IoMdAdd className="w-5 h-5" />}>
          Créer une facture
        </Button>
      </div>

      {/* Utilisation du composant Table réutilisable */}
      <Table
        columns={invoiceColumns}
        data={dashboardData.invoices}
        onRowClick={handleOpenInvoice}
      />
    </div>
  );
};

export default DashboardPage;
