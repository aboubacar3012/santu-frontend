/* eslint-disable @next/next/no-img-element */
import { useUrlParams } from '@/src/hooks/useUrlParams';
import {
  useGetClientById,
  useCreateClient,
  useUpdateClient,
} from '@/src/hooks/useClients';
import { refreshAccount } from '@/src/libs/refreshAccount';
import { RootState } from '@/src/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Client, TypeEnum } from '@/src/types';
import Modal from '@/src/components/ui/Modal';
import FormInput from '@/src/components/ui/FormInput';

type ClientFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ClientForm = ({ isOpen, onClose }: ClientFormProps) => {
  const { hasParams, getParams } = useUrlParams();
  const isEdit = hasParams('client') && hasParams('clientForm');
  const clientId = isEdit ? (getParams('client') as string | null) : null;

  const [clientName, setClientName] = useState<string>('');
  const [clientFirstName, setClientFirstName] = useState<string>('');
  const [clientLastName, setClientLastName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientAddress, setClientAddress] = useState<string>('');
  const [clientType, setClientType] = useState<TypeEnum>(TypeEnum.PARTICULAR);

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const auth = useSelector((state: RootState) => state.auth);
  const accountId = auth.loggedAccountInfos?._id;
  const dispatch = useDispatch();

  // Initialiser le hook useCreateClient
  const { mutate: createClientMutation, isPending } = useCreateClient(
    auth.token!
  );

  // Initialiser le hook useUpdateClient
  const { mutate: updateClientMutation, isPending: isUpdating } =
    useUpdateClient(auth.token!);

  // Utiliser useGetClientById pour récupérer les données du client
  const { data, isLoading } = useGetClientById(clientId, auth.token!);
  const client = data?.client as Client;

  useEffect(() => {
    // Remplir les champs du formulaire si un client est chargé pour édition
    if (client && isEdit) {
      console.log({ client });
      if (client.type === TypeEnum.PROFESSIONAL) {
        setClientType(TypeEnum.PROFESSIONAL);
        setClientName(client.company || '');
      } else {
        setClientType(TypeEnum.PARTICULAR);
        setClientFirstName(client.firstName || '');
        setClientLastName(client.lastName || '');
      }
      setClientPhone(client.phone || '');
      setClientEmail(client.email || '');
      setClientAddress(client.address || '');
    }

    return () => {
      // Réinitialiser les champs lors de la fermeture du formulaire
      setClientName('');
      setClientFirstName('');
      setClientLastName('');
      setClientPhone('');
      setClientEmail('');
      setClientAddress('');
      setClientType(TypeEnum.PARTICULAR);
      setErrorMessage('');
    };
  }, [client, isEdit, isOpen]);

  const onSubmit = () => {
    if (client) return handleEdit();
    if (!clientName && (!clientFirstName || !clientLastName)) {
      return toast.error('Veuillez renseigner le nom du client');
    }
    if (!clientPhone || !clientEmail || !clientAddress) {
      return toast.error('Veuillez renseigner tous les champs');
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
        invoices: [],
      };
    } else {
      clientToAdd = {
        account: accountId,
        firstName: clientFirstName,
        lastName: clientLastName,
        phone: clientPhone,
        email: clientEmail,
        address: clientAddress,
        type: clientType,
        invoices: [],
      };
    }

    // Utiliser la mutation au lieu de createClient directement
    createClientMutation(clientToAdd, {
      onSuccess: response => {
        if (response.success) {
          toast.success('Client créé avec succès');
          onClose();
        } else {
          setErrorMessage(
            response.message || 'Erreur lors de la création du client'
          );
        }
      },
      onError: error => {
        setErrorMessage(
          error.message || 'Erreur lors de la création du client'
        );
      },
    });
  };

  const handleEdit = () => {
    if (!client || !clientId) {
      return toast.error('Erreur lors de la récupération du client à modifier');
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
        clientData: updatedClientData,
      },
      {
        onSuccess: response => {
          if (response.success) {
            toast.success('Client modifié avec succès');
            onClose();
          } else {
            toast.error(
              response.message || 'Erreur lors de la modification du client'
            );
          }
        },
        onError: (error: any) => {
          toast.error(
            error.message || 'Erreur lors de la modification du client'
          );
        },
      }
    );
  };

  // Contenu du formulaire amélioré avec un style plus moderne
  const formContent = (
    <section className="space-y-6">
      {isLoading && isEdit ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
          <span className="ml-3 text-gray-600">Chargement des données...</span>
        </div>
      ) : (
        <>
          {/* Sélection du type de client */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Type de client
            </h3>
            <div className="flex gap-4">
              <label
                className={`flex-1 relative cursor-pointer rounded-md border p-4 flex gap-2 items-center ${
                  clientType === TypeEnum.PARTICULAR
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="clientType"
                  value={TypeEnum.PARTICULAR}
                  checked={clientType === TypeEnum.PARTICULAR}
                  onChange={() => setClientType(TypeEnum.PARTICULAR)}
                  className="sr-only"
                />
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    clientType === TypeEnum.PARTICULAR
                      ? 'border-green-500'
                      : 'border-gray-300'
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      clientType === TypeEnum.PARTICULAR
                        ? 'bg-green-500'
                        : 'bg-transparent'
                    }`}
                  ></span>
                </span>
                <span className="text-sm">Particulier</span>
              </label>

              <label
                className={`flex-1 relative cursor-pointer rounded-md border p-4 flex gap-2 items-center ${
                  clientType === TypeEnum.PROFESSIONAL
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="clientType"
                  value={TypeEnum.PROFESSIONAL}
                  checked={clientType === TypeEnum.PROFESSIONAL}
                  onChange={() => setClientType(TypeEnum.PROFESSIONAL)}
                  className="sr-only"
                />
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    clientType === TypeEnum.PROFESSIONAL
                      ? 'border-green-500'
                      : 'border-gray-300'
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      clientType === TypeEnum.PROFESSIONAL
                        ? 'bg-green-500'
                        : 'bg-transparent'
                    }`}
                  ></span>
                </span>
                <span className="text-sm">Entreprise</span>
              </label>
            </div>
          </div>

          {/* Informations d'identification */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Identité</h3>

            {clientType === TypeEnum.PROFESSIONAL && (
              <FormInput
                label="Nom de l'entreprise"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                placeholder="Nom de l'entreprise"
                required
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                  </svg>
                }
              />
            )}

            {clientType === TypeEnum.PARTICULAR && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Prénom"
                  value={clientFirstName}
                  onChange={e => setClientFirstName(e.target.value)}
                  placeholder="Prénom"
                  required
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    </svg>
                  }
                />
                <FormInput
                  label="Nom"
                  value={clientLastName}
                  onChange={e => setClientLastName(e.target.value)}
                  placeholder="Nom"
                  required
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    </svg>
                  }
                />
              </div>
            )}
          </div>

          {/* Coordonnées */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Coordonnées
            </h3>
            <div className="space-y-4">
              <FormInput
                label="Téléphone"
                value={clientPhone}
                onChange={e => setClientPhone(e.target.value)}
                type="tel"
                placeholder="Téléphone"
                required
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                    />
                  </svg>
                }
              />

              <FormInput
                label="Email"
                value={clientEmail}
                onChange={e => setClientEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                  </svg>
                }
              />

              <FormInput
                label="Adresse"
                value={clientAddress}
                onChange={e => setClientAddress(e.target.value)}
                placeholder="Adresse complète"
                required
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
                    />
                  </svg>
                }
              />
            </div>
          </div>

          {/* Message d'erreur */}
          {errorMessage && (
            <div className="rounded-md bg-red-50 p-4 border border-red-100">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );

  // Également, améliorons le footer pour qu'il corresponde au style moderne
  const footerContent = (
    <div className="flex justify-end gap-3">
      <button
        onClick={onClose}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Annuler
      </button>
      <button
        onClick={onSubmit}
        disabled={isPending || isUpdating}
        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-500 border border-transparent rounded-md shadow-sm hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending || isUpdating ? (
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Chargement...
          </span>
        ) : (
          'Enregistrer'
        )}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Modifier le client' : 'Créer un nouveau client'}
      size="small"
      footer={<div className="w-full">{footerContent}</div>}
    >
      {formContent}
    </Modal>
  );
};

export default ClientForm;
