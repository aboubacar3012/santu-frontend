'use client';
import Badge from '@/src/components/Badge';
import { useGetClientById } from '@/src/hooks/useClients';
import { useGetInvoicesByClientId } from '@/src/hooks/useInvoices';
import { formatCurrency } from '@/src/libs/formatCurrency';
import { RootState } from '@/src/redux/store';
import { Client, Invoice, StatusEnum } from '@/src/types';
import Table, { Column } from '@/src/components/shared/Table';

import { useRouter } from 'next/navigation';
import { FaAngleLeft } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import PrevHeader from '@/src/components/shared/PrevHeader';

// Cette fonction indique à Next.js que cette page doit être générée côté client
// et non dans le cadre de l'export statique
export const dynamic = 'force-dynamic';

const SingleClient = ({ params }: { params: { clientId: string } }) => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);

  const { data, isLoading } = useGetClientById(params.clientId, auth.token!);
  const client = data?.client as Client;

  // Utilisation du hook pour récupérer les factures du client
  const { data: invoicesData, isLoading: isLoadingInvoices } = useGetInvoicesByClientId(
    params.clientId,
    auth.token!
  );
  const invoices = invoicesData?.invoices || [];

  // Calcul du montant total de toutes les factures
  const totalAmount = invoices.reduce(
    (sum: number, invoice: any) => sum + (invoice.amount || 0),
    0
  );

  // Définition des colonnes pour la table des factures
  const invoiceColumns: Column<any>[] = [
    {
      header: 'Nom de la facture',
      accessor: (invoice, index) => invoice.name || `Facture #${1}`,
      className: 'font-medium',
    },
    {
      header: 'ID',
      accessor: invoice => invoice.invoiceNumber || '-',
    },
    {
      header: 'Montant',
      accessor: invoice => formatCurrency(invoice.amount || 0),
    },
    {
      header: 'Date de création',
      accessor: invoice =>
        invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString() : '-',
    },
    {
      header: 'Status',
      accessor: invoice => (
        <Badge
          type={invoice.status}
          text={(() => {
            switch (invoice.status) {
              case StatusEnum.DRAFT:
                return 'Brouillon';
              case StatusEnum.PAID:
                return 'Payée';
              case StatusEnum.PENDING:
                return 'En attente';
              default:
                return invoice.status;
            }
          })()}
        />
      ),
    },
  ];

  const handlePushLeft = () => {
    router.back();
  };

  // Fonction pour naviguer vers la page de facture
  const navigateToInvoice = (invoice: any) => {
    router.push(`/dashboard/invoice/${invoice._id}`);
  };

  if (!client) return <div>Not found</div>;

  return (
    <div>
      <PrevHeader />
      <div className="w-full flex gap-4 mt-4">
        <div className="w-full flex flex-col gap-2 bg-white p-4 rounded-xl">
          <div className="w-full flex justify-between">
            <div className="flex gap-2">
              {client?.logo && (
                <img
                  src="https://santupro.fr/wp-content/uploads/2024/01/cropped-ADVERCO-1-png.png"
                  className="w-32 h-20 mx-auto"
                />
              )}
              <div className="flex flex-col gap-1">
                <h3 className="text-md font-semibold">
                  {client.company && client.company?.length > 0
                    ? client.company
                    : `${client.firstName} ${client.lastName}`}
                </h3>
                <p className="text-sm text-black">{client.address}</p>
                <p className="text-sm text-black">{client.phone}</p>
                <p className="text-sm text-black">{client.email}</p>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end gap-6">
              <div className="flex gap-4">
                <Badge type="yellow" text={`${invoices.length} Factures`} />
              </div>
              <div className="text-right">
                <p className="font-light text-xs">Montant total</p>
                <p className="font-bold text-lg">{formatCurrency(totalAmount)}</p>
              </div>
            </div>
          </div>
          <div className="h-0.5 w-full bg-gray-100"></div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col py-4 px-1">
              <h2 className="text-lg font-semibold">Listes des factures</h2>
              <p className="font-light text-xs text-black">
                {invoices.length} factures enregistrées
              </p>
            </div>
          </div>

          <div className="shadow-md mt-2 bg-white h-[38rem] overflow-auto">
            {isLoadingInvoices ? (
              <div className="flex justify-center items-center h-32">
                Chargement des factures...
              </div>
            ) : (
              <Table
                columns={invoiceColumns}
                data={invoices}
                onRowClick={navigateToInvoice}
                headerClassName="text-xs uppercase bg-gradient-to-r from-my-raspberry to-my-eggplant"
                emptyMessage="Aucune facture trouvée"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleClient;
