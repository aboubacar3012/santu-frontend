import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetClientById,
  useCreateClient,
  useUpdateClient,
} from './useClients';
import { RootState } from '../redux/store';
import { Client, TypeEnum } from '../types';

// Interface pour gérer les erreurs par champ
export interface FormErrors {
  clientName?: string;
  clientFirstName?: string;
  clientLastName?: string;
  clientPhone?: string;
  clientEmail?: string;
  clientAddress?: string;
}

interface UseClientFormProps {
  clientId: string | null;
  isEdit: boolean;
  onClose: () => void;
}

export const useClientForm = ({
  clientId,
  isEdit,
  onClose,
}: UseClientFormProps) => {
  // États du formulaire
  const [clientName, setClientName] = useState<string>('');
  const [clientFirstName, setClientFirstName] = useState<string>('');
  const [clientLastName, setClientLastName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientAddress, setClientAddress] = useState<string>('');
  const [clientType, setClientType] = useState<TypeEnum>(TypeEnum.PARTICULAR);
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const auth = useSelector((state: RootState) => state.auth);
  const accountId = auth.loggedAccountInfos?.id;

  // Hooks de requête API
  const { mutate: createClientMutation, isPending } = useCreateClient(
    auth.token!
  );
  const { mutate: updateClientMutation, isPending: isUpdating } =
    useUpdateClient(auth.token!);
  const { data, isLoading } = useGetClientById(clientId, auth.token!);
  const client = data?.client as Client;

  // Effet pour initialiser/réinitialiser le formulaire
  useEffect(() => {
    if (client && isEdit) {
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
      // Nettoyage à la fermeture
      resetForm();
    };
  }, [client, isEdit]);

  const resetForm = () => {
    setClientName('');
    setClientFirstName('');
    setClientLastName('');
    setClientPhone('');
    setClientEmail('');
    setClientAddress('');
    setClientType(TypeEnum.PARTICULAR);
    setErrorMessage('');
    setFormErrors({});
  };

  // Validation du formulaire
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    // Validation pour le type professionnel
    if (clientType === TypeEnum.PROFESSIONAL) {
      if (!clientName.trim()) {
        errors.clientName = "Le nom de l'entreprise est requis";
        isValid = false;
      }
    } else {
      // Validation pour le type particulier
      if (!clientFirstName.trim()) {
        errors.clientFirstName = 'Le prénom est requis';
        isValid = false;
      }
      if (!clientLastName.trim()) {
        errors.clientLastName = 'Le nom est requis';
        isValid = false;
      }
    }

    // Validations communes
    if (!clientPhone.trim()) {
      errors.clientPhone = 'Le téléphone est requis';
      isValid = false;
    }

    if (!clientEmail.trim()) {
      errors.clientEmail = "L'email est requis";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(clientEmail)) {
      errors.clientEmail = "Format d'email invalide";
      isValid = false;
    }

    if (!clientAddress.trim()) {
      errors.clientAddress = "L'adresse est requise";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = () => {
    if (client) return handleEdit();

    if (!validateForm()) {
      return;
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

  // Gestion de la modification d'un client
  const handleEdit = () => {
    if (!client || !clientId) {
      setErrorMessage('Erreur lors de la récupération du client à modifier');
      return;
    }

    if (!validateForm()) {
      return;
    }

    let updatedClientData: Partial<Client> = {};

    if (clientType === TypeEnum.PROFESSIONAL) {
      if (client.company !== clientName) {
        updatedClientData.company = clientName;
      }
      if (client.type !== clientType) {
        updatedClientData.type = clientType;
      }
    } else {
      if (client.firstName !== clientFirstName) {
        updatedClientData.firstName = clientFirstName;
      }
      if (client.lastName !== clientLastName) {
        updatedClientData.lastName = clientLastName;
      }
      if (client.type !== clientType) {
        updatedClientData.type = clientType;
      }
    }

    if (client.phone !== clientPhone) {
      updatedClientData.phone = clientPhone;
    }

    if (client.email !== clientEmail) {
      updatedClientData.email = clientEmail;
    }

    if (client.address !== clientAddress) {
      updatedClientData.address = clientAddress;
    }

    if (Object.keys(updatedClientData).length === 0) {
      setErrorMessage("Aucune modification n'a été effectuée");
      return;
    }

    updatedClientData.account = client.account;

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
            setErrorMessage(
              response.message || 'Erreur lors de la modification du client'
            );
          }
        },
        onError: (error: any) => {
          setErrorMessage(
            error.message || 'Erreur lors de la modification du client'
          );
        },
      }
    );
  };

  return {
    formData: {
      clientName,
      clientFirstName,
      clientLastName,
      clientPhone,
      clientEmail,
      clientAddress,
      clientType,
    },
    setters: {
      setClientName,
      setClientFirstName,
      setClientLastName,
      setClientPhone,
      setClientEmail,
      setClientAddress,
      setClientType,
    },
    formErrors,
    errorMessage,
    isLoading,
    isPending: isPending || isUpdating,
    client,
    handleSubmit,
  };
};
