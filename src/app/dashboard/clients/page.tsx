"use client";
import Badge from "@/src/components/Badge";
import ClientForm from "@/src/components/client/ClientForm";
import { useGetClientsAccountById } from "@/src/hooks/useClients";
import { useUrlParams } from "@/src/hooks/useUrlParams";
import { RootState } from "@/src/redux/store";
import { useRouter } from "next/navigation";
import { FaAngleLeft, FaEdit, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import Select from 'react-select';
import { useState } from "react";
import { Client } from "@/src/types";

const ClientsPage = () => {
  const router = useRouter();
  const { hasParams, setParams, deleteParams } = useUrlParams();
  const showClientForm = hasParams('clientForm');
  // const clientId = hasParam('client') ? hasParam('client') : null;
  const auth = useSelector((state: RootState) => state.auth);
  const { data, isLoading, error } = useGetClientsAccountById(auth.loggedAccountInfos?._id!, auth.token!);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handlePushLeft = () => {
    router.back();
  }

  const handleAddClient = () => {
    setParams('clientForm', 'true');
  }

  const handleEditClient = (e: React.MouseEvent, clientId: string) => {
    e.stopPropagation(); // Empêche la navigation vers la page du client
    setParams({ clientForm: 'true', client: clientId });
  }

  const closeClientForm = () => {
    deleteParams(['clientForm', 'client']);
    setSelectedClient(null); // Reset the selected client
  }

  // const handleEditClient = (e: React.MouseEvent, client: Client) => {
  //   e.stopPropagation(); // Empêche la navigation vers la page du client
  //   setSelectedClient(client);
  //   setParam('client', client._id);
  //   setParam('addClient', 'true');
  // }

  const handleDeleteClient = (e: React.MouseEvent, clientId: string) => {
    e.stopPropagation(); // Empêche la navigation vers la page du client
    if (confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      // Ajouter ici la logique de suppression du client
      console.log("Suppression du client", clientId);
      // Après suppression, rafraîchir les données
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching clients: {error.message}</p>;

  console.log(data.clients);

  const clients = data.clients;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching clients: {error}</p>;

  if (!clients || clients.length === 0) {
    return <p>Aucun client enregistré.</p>;
  }

  // Création des options pour react-select avec nom/entreprise, email et téléphone
  const clientOptions = clients.map((client: Client) => {
    const clientName = client.company || `${client.firstName} ${client.lastName}`;
    const emailInfo = client.email ? `| ${client.email}` : '';
    const phoneInfo = client.phone ? `| ${client.phone}` : '';

    return {
      value: client._id,
      label: `${clientName} ${emailInfo} ${phoneInfo}`,
      email: client.email,
      phone: client.phone,
      // Données supplémentaires pour la recherche
      searchTerms: [
        clientName.toLowerCase(),
        client.email?.toLowerCase() || '',
        client.phone || ''
      ].join(' ')
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

    return option.data.searchTerms.includes(input) ||
      option.data.searchTerms.indexOf(input) > -1;
  };

  return (
    <div>
      <ClientForm
        isOpen={showClientForm}
        selectedClientId={selectedClient ? selectedClient._id : null}
        onClose={closeClientForm}
      />
      <div onClick={handlePushLeft} className="flex gap-2 bg-white w-full p-2 rounded-xl cursor-pointer">
        <FaAngleLeft className="w-8 h-8" />
        <h3 className="text-xl font-light">
          Mes clients
        </h3>
      </div>
      <div className="pr-4 flex justify-between items-center">
        <div className="flex flex-col py-4 px-1">
          <h2 className="text-lg font-semibold">Listes des clients enregistrées</h2>
          <p className="font-light text-xs text-black">
            {clients.length} clients
          </p>
        </div>
        <button onClick={handleAddClient} className=" mt-4 select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-2 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-1">
          <IoMdAdd className="w-6 h-6" />
          Ajouter un client
        </button>
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
          noOptionsMessage={() => "Aucun client trouvé"}
        />
      </div>

      <div className=" h-dvh rounded-lg overflow-auto flex flex-col gap-2 bg-white p-4">
        <div className=" shadow-md rounded-lg mt-2 bg-white ">
          <table className="w-full text-sm text-left text-black sticky">
            <thead className="text-xs rounded-lg text-white bg-gray-700 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  N°
                </th>
                <th scope="col" className="px-6 py-3">
                  Nom du Client/Entreprise
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Téléphone
                </th>
                <th scope="col" className="px-6 py-3">
                  Nb de factures
                </th>
                <th scope="col" className="px-6 py-3">
                  Montant total
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {
                clients && clients.map((client: Client, index: number) => (
                  <tr onClick={() => router.push(`/dashboard/clients/${client._id}`)} key={index} className="border-b cursor-pointer hover:bg-gray-200">
                    <th
                      scope="row"
                      className="text-xs px-6 py-4 font-medium text-black whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="text-xs px-6 py-4">
                      {client.company && client.company?.length > 0 ? client.company : `${client.firstName} ${client.lastName}`}
                    </td>
                    <td className="text-xs px-6 py-4">
                      {client.email}
                    </td>
                    <td className="text-xs px-6 py-4">
                      {client.phone}
                    </td>
                    <td className="text-xs px-6 py-4">
                      0
                    </td>
                    <td className="text-xs px-6 py-4">
                      0
                    </td>
                    <td className="text-xs px-6 py-4 flex gap-3">
                      <button
                        onClick={(e) => handleEditClient(e, client._id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={(e) => handleDeleteClient(e, client._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ClientsPage;
