/* eslint-disable @next/next/no-img-element */
import { useUrlParams } from "@/src/hooks/useUrlParams";
import { useGetClientById, useCreateClient, useUpdateClient } from "@/src/hooks/useClients";
import { refreshAccount } from "@/src/libs/refreshAccount";
import { RootState } from "@/src/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Client, TypeEnum } from "@/src/types";

type ClientFormProps = {
  isOpen: boolean;
  onClose: () => void;
};
const ClientForm = (
  { isOpen, onClose }: ClientFormProps
) => {
  const { hasParams, getParams } = useUrlParams();
  const isEdit = hasParams('client') && hasParams('clientForm');
  const clientId = isEdit ? (getParams('client') as string | null) : null;

  const [clientName, setClientName] = useState<string>("");
  const [clientFirstName, setClientFirstName] = useState<string>("");
  const [clientLastName, setClientLastName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientAddress, setClientAddress] = useState<string>("");
  const [clientType, setClientType] = useState<TypeEnum>(TypeEnum.PARTICULAR);

  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState("");

  const auth = useSelector((state: RootState) => state.auth);
  const accountId = auth.loggedAccountInfos?._id;
  const dispatch = useDispatch();

  // Initialiser le hook useCreateClient
  const { mutate: createClientMutation, isPending } = useCreateClient(auth.token!);

  // Initialiser le hook useUpdateClient
  const { mutate: updateClientMutation, isPending: isUpdating } = useUpdateClient(auth.token!);

  // Utiliser useGetClientById pour récupérer les données du client
  const { data, isLoading } = useGetClientById(clientId, auth.token!);
  const client = data?.client as Client;


  useEffect(() => {
    // Remplir les champs du formulaire si un client est chargé pour édition
    if (client && isEdit) {
      console.log({ client });
      if (client.type === TypeEnum.PROFESSIONAL) {
        setClientType(TypeEnum.PROFESSIONAL);
        setClientName(client.company || "");
      } else {
        setClientType(TypeEnum.PARTICULAR);
        setClientFirstName(client.firstName || "");
        setClientLastName(client.lastName || "");
      }
      setClientPhone(client.phone || "");
      setClientEmail(client.email || "");
      setClientAddress(client.address || "");
    }

    return () => {
      // Réinitialiser les champs lors de la fermeture du formulaire
      setClientName("");
      setClientFirstName("");
      setClientLastName("");
      setClientPhone("");
      setClientEmail("");
      setClientAddress("");
      setClientType(TypeEnum.PARTICULAR);
      setErrorMessage("");
    }
  }, [client, isEdit, isOpen]);


  const onSubmit = () => {
    if (client) return handleEdit();
    if (!clientName && (!clientFirstName || !clientLastName)) {
      return toast.error("Veuillez renseigner le nom du client");
    }
    if (!clientPhone || !clientEmail || !clientAddress) {
      return toast.error("Veuillez renseigner tous les champs");
    }

    let clientToAdd: Partial<Client> = {};
    if (clientType === TypeEnum.PROFESSIONAL) {
      clientToAdd = {
        account: accountId,
        company: clientName,
        phone: clientPhone,
        email: clientEmail,
        address: clientAddress,
        type: clientType,
        invoices: []
      }
    } else {
      clientToAdd = {
        account: accountId,
        firstName: clientFirstName,
        lastName: clientLastName,
        phone: clientPhone,
        email: clientEmail,
        address: clientAddress,
        type: clientType,
        invoices: []
      }
    }

    // Utiliser la mutation au lieu de createClient directement
    createClientMutation(clientToAdd, {
      onSuccess: (response) => {
        if (response.success) {
          toast.success("Client créé avec succès");
          onClose();
        } else {
          setErrorMessage(response.message || "Erreur lors de la création du client");
        }
      },
      onError: (error) => {
        setErrorMessage(error.message || "Erreur lors de la création du client");
      }
    });
  }

  const handleEdit = () => {
    if (!client || !clientId) {
      return toast.error("Erreur lors de la récupération du client à modifier");
    }

    // Préparer les données modifiées
    let updatedClientData: Partial<Client> = {};

    if (clientType === TypeEnum.PROFESSIONAL) {
      // Vérifier si le nom de l'entreprise a changé
      if (client.company !== clientName) {
        updatedClientData.company = clientName;
      }
      // Assurons-nous que le type est correct
      if (client.type !== clientType) {
        updatedClientData.type = clientType;
      }
    } else {
      // Vérifier si le prénom a changé
      if (client.firstName !== clientFirstName) {
        updatedClientData.firstName = clientFirstName;
      }
      // Vérifier si le nom a changé
      if (client.lastName !== clientLastName) {
        updatedClientData.lastName = clientLastName;
      }
      // Assurons-nous que le type est correct
      if (client.type !== clientType) {
        updatedClientData.type = clientType;
      }
    }

    // Vérifier si le téléphone a changé
    if (client.phone !== clientPhone) {
      updatedClientData.phone = clientPhone;
    }

    // Vérifier si l'email a changé
    if (client.email !== clientEmail) {
      updatedClientData.email = clientEmail;
    }

    // Vérifier si l'adresse a changé
    if (client.address !== clientAddress) {
      updatedClientData.address = clientAddress;
    }

    // Si aucun changement n'a été effectué
    if (Object.keys(updatedClientData).length === 0) {
      return toast.error("Aucune modification n'a été effectuée");
    }

    // Conserver l'ID du compte pour l'invalidation du cache
    updatedClientData.account = client.account;

    // Utiliser la mutation pour mettre à jour le client
    updateClientMutation(
      {
        clientId: clientId,
        clientData: updatedClientData
      },
      {
        onSuccess: (response) => {
          if (response.success) {
            toast.success("Client modifié avec succès");
            onClose();
          } else {
            toast.error(response.message || "Erreur lors de la modification du client");
          }
        },
        onError: (error: any) => {
          toast.error(error.message || "Erreur lors de la modification du client");
        }
      }
    );
  }

  if (!isOpen) return null;
  return (
    <>
      <div
        className=" fixed inset-0 z-[999] grid place-items-center bg-black bg-opacity-60   transition-opacity duration-300"
      >
        <div
          className="relative m-4 w-2/6 overflow-auto  rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
        >
          <div className="w-full flex justify-center items-center px-6 py-4">
            <h1 className="text-2xl font-semibold">
              {isEdit ? "Modifier le client" : "Créer un nouveau client"}
            </h1>
          </div>

          {isLoading && isEdit ? (
            <div className="p-6 text-center">Chargement des données du client...</div>
          ) : (
            <section>
              <div className="flex flex-col gap-1 p-6">
                <div className="relative h-11 w-full min-w-[200px]">
                  <label htmlFor="clientName" className="block mb-2 text-sm font-medium text-black">
                    Choisir le type de client
                  </label>
                  <select value={clientType} onChange={(e) => setClientType(e.target.value as TypeEnum)} id="status" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 ">
                    <option value={TypeEnum.PARTICULAR}>
                      Particulier
                    </option>
                    <option value={TypeEnum.PROFESSIONAL}>
                      Entreprise
                    </option>
                  </select>
                </div>
              </div>
              {
                clientType === TypeEnum.PROFESSIONAL && (
                  <div className="flex flex-col gap-1 p-6">
                    <div className="relative h-11 w-full min-w-[200px]">
                      <label htmlFor="clientName" className="block mb-2 text-sm font-medium text-black">
                        Nom de l&apos;entreprise/client
                      </label>
                      <input value={clientName} onChange={(e) => setClientName(e.target.value)} type="text" id="clientName" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le titre du client" required />
                    </div>
                  </div>
                )
              }
              {
                clientType === "PARTICULAR" && (
                  <div className="w-full flex gap-1 p-6">
                    <div className="w-full flex flex-col">
                      <div className="relative h-11 w-full min-w-[200px]">
                        <label htmlFor="clientFirstName" className="block mb-2 text-sm font-medium text-black">
                          Prénom
                        </label>
                        <input value={clientFirstName} onChange={(e) => setClientFirstName(e.target.value)} type="text" id="clientFirstName" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le prénom" required />
                      </div>
                    </div>
                    <div className="w-full flex flex-col">
                      <div className="relative h-11 w-full min-w-[200px]">
                        <label htmlFor="clientLastName" className="block mb-2 text-sm font-medium text-black">
                          Nom
                        </label>
                        <input value={clientLastName} onChange={(e) => setClientLastName(e.target.value)} type="text" id="clientLastName" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le nom" required />
                      </div>
                    </div>
                  </div>
                )
              }
              <div className="flex flex-col gap-1 p-6">
                <div className="relative h-11 w-full min-w-[200px]">
                  <label htmlFor="clientPhone" className="block mb-2 text-sm font-medium text-black">
                    Téléphone
                  </label>
                  <input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} type="text" id="clientPhone" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le titre du client" required />
                </div>
              </div>
              <div className="flex flex-col gap-1 p-6">
                <div className="relative h-11 w-full min-w-[200px]">
                  <label htmlFor="clientEmail" className="block mb-2 text-sm font-medium text-black">
                    E-mail
                  </label>
                  <input value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} type="email" id="clientEmail" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez l'adresse email du client" required />
                </div>
              </div>
              <div className="flex flex-col gap-1 p-6">
                <div className="relative h-11 w-full min-w-[200px]">
                  <label htmlFor="clientAdresse" className="block mb-2 text-sm font-medium text-black">
                    Adresse
                  </label>
                  <input value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} type="text" id="clientAdresse" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le titre du client" required />
                </div>
              </div>
              <div className="p-2">
                {errorMessage && <div
                  className="px-2 relative block w-full p-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
                  {errorMessage}
                </div>}
              </div>
              <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
                <button
                  onClick={onClose}
                  className="cursor-pointer px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Annuler
                </button>
                <button
                  onClick={onSubmit}
                  disabled={isPending || isUpdating}
                  className="cursor-pointer middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  {isPending || isUpdating ? 'Chargement...' : 'Enregistrer'}
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default ClientForm;