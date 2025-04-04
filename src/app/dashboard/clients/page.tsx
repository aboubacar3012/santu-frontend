'use client';
import Badge from '@/src/components/Badge';
import ClientForm from '@/src/components/client/ClientForm';
import { useGetAllClients, useDeleteClientById } from '@/src/hooks/useClients';
import { useUrlParams } from '@/src/hooks/useUrlParams';
import { RootState } from '@/src/redux/store';
import { useRouter } from 'next/navigation';
import { FaAngleLeft, FaEdit, FaTrash } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { useState } from 'react';
import { Client } from '@/src/types';
import { toast } from 'react-toastify';
import Button from '@/src/components/shared/Button';
import Table, { Column } from '@/src/components/shared/Table';

const ClientsPage = () => {
  const router = useRouter();
  const { hasParams, setParams, deleteParams } = useUrlParams();
  const showClientForm = hasParams('clientForm');
  const auth = useSelector((state: RootState) => state.auth);
  const { data, isLoading, error } = useGetAllClients(
    auth.loggedAccountInfos?.enterpriseId!,
    auth.token!
  );
  const deleteClientMutation = useDeleteClientById(auth.token!);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handlePushLeft = () => {
    router.back();
  };

  const handleAddClient = () => {
    setParams('clientForm', 'true');
  };

  const handleEditClient = (e: React.MouseEvent, clientId: string) => {
    e.stopPropagation(); // Empêche la navigation vers la page du client
    setParams({ clientForm: 'true', client: clientId });
  };

  const closeClientForm = () => {
    deleteParams(['clientForm', 'client']);
    setSelectedClient(null); // Reset the selected client
  };

  const handleDeleteClient = (e: React.MouseEvent, clientId: string) => {
    e.stopPropagation(); // Empêche la navigation vers la page du client
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      deleteClientMutation.mutate(clientId, {
        onSuccess: data => {
          if (data.success) {
            toast.success('Client supprimé avec succès');
          } else {
            toast.error(`Erreur lors de la suppression: ${data.message}`);
          }
        },
        onError: error => {
          console.error(`Erreur: ${error.message}`);
          toast.error('Erreur lors de la suppression du client:');
        },
      });
    }
  };

  // Définition des colonnes pour la table des clients
  const clientColumns: Column<Client>[] = [
    {
      header: 'N°',
      accessor: () => +1,
      className: 'w-16',
    },
    {
      header: 'Nom du Client/Entreprise',
      accessor: client =>
        client.company && client.company?.length > 0
          ? client.company
          : `${client.firstName} ${client.lastName}`,
    },
    { header: 'Email', accessor: 'email' },
    { header: 'Téléphone', accessor: 'phone' },
    {
      header: 'Nb de factures',
      accessor: client => client?.invoices?.length || 0,
    },
    {
      header: 'Actions',
      className: 'w-28 text-center',
      accessor: client => (
        <div className="flex justify-center gap-3">
          <button
            onClick={e => handleEditClient(e, client.id)}
            className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-100"
            title="Modifier"
          >
            <FaEdit size={18} />
          </button>
          <button
            onClick={e => handleDeleteClient(e, client.id)}
            className="text-red-600 hover:text-red-800 p-1.5 rounded-full hover:bg-red-100"
            title="Supprimer"
          >
            <FaTrash size={18} />
          </button>
        </div>
      ),
    },
  ];

  const handleClientClick = (client: Client) => {
    router.push(`/dashboard/clients/${client.id}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching clients: {error.message}</p>;

  const clients = data?.clients || [];

  if (!clients || clients.length === 0) {
    return <p>Aucun client enregistré.</p>;
  }

  // Création des options pour react-select avec nom/entreprise, email et téléphone
  const clientOptions = clients.map((client: Client) => {
    const clientName = client.company || `${client.firstName} ${client.lastName}`;
    const emailInfo = client.email ? `| ${client.email}` : '';
    const phoneInfo = client.phone ? `| ${client.phone}` : '';

    return {
      value: client.id,
      label: `${clientName} ${emailInfo} ${phoneInfo}`,
      email: client.email,
      phone: client.phone,
      // Données supplémentaires pour la recherche
      searchTerms: [
        clientName.toLowerCase(),
        client.email?.toLowerCase() || '',
        client.phone || '',
      ].join(' '),
    };
  });

  const handleSearchChange = (selectedOption: any) => {
    if (selectedOption && selectedOption.value) {
      router.push(`/dashboard/clients/${selectedOption.value}`);
    }
  };

  // Fonction de filtrage personnalisée pour react-select
  const customFilter = (option: any, inputValue: string) => {
    if (!inputValue) return true;
    const input = inputValue.toLowerCase();

    return option.data.searchTerms.includes(input) || option.data.searchTerms.indexOf(input) > -1;
  };

  return (
    <div>
      <ClientForm isOpen={showClientForm} onClose={closeClientForm} />
      {/* <PrevHeader /> */}
      <div className="pr-4 flex justify-between items-center">
        <div className="flex flex-col py-4 px-1">
          <h2 className="text-lg font-semibold">Listes des clients enregistrées</h2>
          <p className="font-light text-xs text-black">{clients.length} clients</p>
        </div>
        <Button onClick={handleAddClient} icon={<IoMdAdd className="w-5 h-5" />}>
          Ajouter un client
        </Button>
      </div>

      <div className="py-4">
        <Select
          className="basic-single"
          classNamePrefix="select"
          onChange={handleSearchChange}
          options={clientOptions}
          placeholder="Rechercher un client par nom, email ou téléphone"
          isClearable={true}
          isSearchable={true}
          filterOption={customFilter}
          noOptionsMessage={() => 'Aucun client trouvé'}
        />
      </div>

      {/* Utilisation du composant Table réutilisable */}
      <Table
        columns={clientColumns}
        data={clients}
        onRowClick={handleClientClick}
        // Utilisation du même style de header que dans dashboard/page.tsx
        headerClassName="text-xs uppercase bg-gradient-to-r from-finance-primary to-finance-secondary"
      />
    </div>
  );
};

export default ClientsPage;
