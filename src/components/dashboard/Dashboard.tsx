'use client';
import StatCard from '@/src/components/StatCard';
import { IoMdAdd } from 'react-icons/io';
import Badge from '@/src/components/Badge';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { Invoice, StatusEnum } from '@/src/types';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { GiMoneyStack } from 'react-icons/gi';
import { FaTrash, FaUserFriends } from 'react-icons/fa';
import { formatCurrency } from '@/src/libs/formatCurrency';
import { useUrlParams } from '@/src/hooks/useUrlParams';
import { toast } from 'react-toastify';
import Button from '@/src/components/shared/Button';
import Table, { Column } from '@/src/components/shared/Table';
import { useUpdateInvoice } from '@/src/hooks/invoice/useUpdateInvoice';
import useGetDashboardData from '@/src/hooks/useGetDashboardData';
import { queryClient } from '@/src/app/Providers';

const Dashboard = () => {
  const router = useRouter();
  const { setParams, deleteParams, getParams } = useUrlParams();
  const auth = useSelector((state: RootState) => state.auth);
  const updateInvoiceMutation = useUpdateInvoice('token');

  const { data, isLoading, error } = useGetDashboardData(
    auth.loggedAccountInfos?._id!,
    auth.token!,
    (getParams('period') as string) || undefined,
    (getParams('status') as string) || undefined
  );

  const openInvoiceForm = () => {
    setParams('invoiceForm', 'true');
  };

  const closeInvoiceForm = () => {
    deleteParams(['invoiceForm', 'invoiceId']);
  };

  const handleOpenInvoice = (invoice: Partial<Invoice>) => {
    router.push(`/dashboard/invoice/${invoice._id}`);
  };

  const handleCancelInvoice = (e: React.MouseEvent, invoiceId: string) => {
    e.stopPropagation(); // Empêche la navigation vers la page de la facture
    if (confirm('Êtes-vous sûr de vouloir abandonner cette facture?')) {
      const invoice = {
        _id: invoiceId,
        status: StatusEnum.CANCELLED,
      };

      updateInvoiceMutation.mutate(invoice, {
        onSuccess: () => {
          toast.success('La facture a été annulée avec succès');
          queryClient.invalidateQueries({ queryKey: ['clients', auth.loggedAccountInfos?._id] });
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
        if (invoice.status === StatusEnum.DRAFT) return <Badge type="warning" text="Brouillon" />;
        if (invoice.status === StatusEnum.PENDING) return <Badge type="info" text="Envoyée" />;
        if (invoice.status === StatusEnum.PAID) return <Badge type="success" text="Déjà payée" />;
        if (invoice.status === StatusEnum.CANCELLED) return <Badge type="error" text="Annulée" />;
        return null;
      },
    },
    // {
    //   header: 'Action',
    //   className: 'w-28 text-center',
    //   accessor: invoice => (
    //     <div className="flex justify-center gap-3">
    //       {/* <button
    //         onClick={e => handleEditInvoice(e, invoice._id!)}
    //         className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-100"
    //         title="Modifier"
    //       >
    //         <FaEdit size={18} />
    //       </button> */}
    //       {/* <button
    //         onClick={e => handleCancelInvoice(e, invoice._id!)}
    //         className="text-primary hover:text-primary p-2 rounded-full bg-finance-error/60 hover:bg-finance-error/80"
    //         title="Supprimer"
    //       >
    //         <FaTrash size={18} />
    //         Abandonner
    //       </button> */}
    //     </div>
    //   ),
    // },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Erreur lors du chargement des données du tableau de bord</div>;
  }

  if (!data.dashboardData) {
    return <div>Dashboard data not found</div>;
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 py-2">
        <StatCard
          title="Aujourd'hui"
          value={`${formatCurrency(data.dashboardData.totalToday)}`}
          unit="Total vendu"
          icon={<GiMoneyStack className="w-8 h-8 text-green-500" />}
        />
        <StatCard
          title="Ce mois-ci"
          value={`${formatCurrency(data.dashboardData.totalthisMonth)}`}
          unit="Toute les factures"
          icon={<GiMoneyStack className="w-8 h-8 text-blue-500" />}
          isVisible={false}
        />
        <StatCard
          title="Nombre de clients"
          value={data.dashboardData.clientsCount}
          unit="clients"
          icon={<FaUserFriends className="w-8 h-8 text-purple-500" />}
        />
        <StatCard
          title="Nombre de factures"
          value={data.dashboardData.invoicesCount}
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
        data={data.dashboardData.invoices}
        onRowClick={handleOpenInvoice}
      />
    </>
  );
};

export default Dashboard;
