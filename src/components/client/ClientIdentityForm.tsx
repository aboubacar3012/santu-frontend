import { TypeEnum } from '@/src/types';
import FormInput from '@/src/components/ui/FormInput';
interface ClientIdentityFormProps {
  clientType: TypeEnum;
  clientName: string;
  setClientName: (value: string) => void;
  clientFirstName: string;
  setClientFirstName: (value: string) => void;
  clientLastName: string;
  setClientLastName: (value: string) => void;
  formErrors: {
    clientName?: string;
    clientFirstName?: string;
    clientLastName?: string;
  };
}

const ClientIdentityForm = ({
  clientType,
  clientName,
  setClientName,
  clientFirstName,
  setClientFirstName,
  clientLastName,
  setClientLastName,
  formErrors,
}: ClientIdentityFormProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Identité</h3>

      {clientType === TypeEnum.PROFESSIONAL && (
        <div>
          <FormInput
            label="Nom de l'entreprise"
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            placeholder="Nom de l'entreprise"
            required
            error={formErrors.clientName}
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
        </div>
      )}

      {clientType === TypeEnum.PARTICULAR && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FormInput
              label="Prénom"
              value={clientFirstName}
              onChange={e => setClientFirstName(e.target.value)}
              placeholder="Prénom"
              required
              error={formErrors.clientFirstName}
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
          <div>
            <FormInput
              label="Nom"
              value={clientLastName}
              onChange={e => setClientLastName(e.target.value)}
              placeholder="Nom"
              required
              error={formErrors.clientLastName}
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
        </div>
      )}
    </div>
  );
};

export default ClientIdentityForm;
