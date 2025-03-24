import { useGetClientsAccountById } from '@/src/hooks/useClients';
import { RootState } from '@/src/redux/store';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Client } from '@/src/types';
import Select from 'react-select';

interface ClientsSelectProps {
  selectedClient: string;
  setSelectedClient: (clientId: string) => void;
}

const ClientsSelect = ({ selectedClient, setSelectedClient }: ClientsSelectProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const {
    data = { clients: [] },
    isLoading,
    error,
  } = useGetClientsAccountById(auth.loggedAccountInfos?.id!, auth.token!);

  const clients = data?.clients || [];

  // Préparation des options pour react-select
  const clientOptions = clients.map((client: Client) => ({
    value: client.id,
    label: client.company || `${client.firstName} ${client.lastName}`,
  }));

  // Trouver l'option sélectionnée
  const selectedOption =
    clientOptions.find((option: { value: string }) => option.value === selectedClient) || null;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching clients: {error.message}</p>;

  if (!clients || clients.length === 0) {
    return <p>Aucun client enregistré.</p>;
  }

  return (
    <div className="flex flex-col gap-1  py-2">
      <label htmlFor="status" className="block text-sm font-medium text-black ">
        Choisir le client
      </label>
      <div className="flex gap-2">
        <Select
          className="basic-single w-full"
          classNamePrefix="select"
          value={selectedOption}
          onChange={option => setSelectedClient(option ? option.value : '')}
          isDisabled={isLoading}
          isLoading={isLoading}
          isClearable={true}
          isSearchable={true}
          name="client"
          options={clientOptions}
          placeholder="Choisir un client"
          noOptionsMessage={() => 'Aucun client disponible'}
        />
        {/* Nouveau client */}
        <Link
          href="/dashboard/clients?addClient=true"
          passHref
          className="w-2/5 text-white bg-finance-primary hover:bg-finance-primary/80 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          + Créer un client
        </Link>
      </div>
    </div>
  );
};

export default ClientsSelect;
