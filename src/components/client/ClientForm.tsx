/* eslint-disable @next/next/no-img-element */
import { useUrlParams } from '@/src/hooks/useUrlParams';
import { useClientForm } from '@/src/hooks/useClientForm';
import Modal from '@/src/components/ui/Modal';

// Composants modulaires importés
import ClientTypeSelector from './ClientTypeSelector';
import ClientIdentityForm from './ClientIdentityForm';
import ClientContactForm from './ClientContactForm';
import FormFooter from '../shared/FormFooter';

type ClientFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ClientForm = ({ isOpen, onClose }: ClientFormProps) => {
  const { hasParams, getParams } = useUrlParams();
  const isEdit = hasParams('client') && hasParams('clientForm');
  const clientId = isEdit ? (getParams('client') as string | null) : null;

  // Utilisation du hook personnalisé pour gérer la logique du formulaire
  const {
    formData,
    setters,
    formErrors,
    errorMessage,
    isLoading,
    isPending,
    client,
    handleSubmit,
  } = useClientForm({
    clientId,
    isEdit,
    onClose,
  });

  // Contenu du formulaire avec les composants modulaires
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
          <ClientTypeSelector
            clientType={formData.clientType}
            onChangeType={setters.setClientType}
          />

          {/* Informations d'identification */}
          <ClientIdentityForm
            clientType={formData.clientType}
            clientName={formData.clientName}
            setClientName={setters.setClientName}
            clientFirstName={formData.clientFirstName}
            setClientFirstName={setters.setClientFirstName}
            clientLastName={formData.clientLastName}
            setClientLastName={setters.setClientLastName}
            formErrors={formErrors}
          />

          {/* Coordonnées */}
          <ClientContactForm
            clientPhone={formData.clientPhone}
            setClientPhone={setters.setClientPhone}
            clientEmail={formData.clientEmail}
            setClientEmail={setters.setClientEmail}
            clientAddress={formData.clientAddress}
            setClientAddress={setters.setClientAddress}
            formErrors={formErrors}
          />
        </>
      )}
    </section>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Modifier le client' : 'Créer un nouveau client'}
      size="small"
      footer={
        <FormFooter
          onClose={onClose}
          onSubmit={handleSubmit}
          isLoading={isPending}
          errorMessage={errorMessage}
        />
      }
    >
      {formContent}
    </Modal>
  );
};

export default ClientForm;
