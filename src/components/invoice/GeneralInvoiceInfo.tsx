import { Hash } from 'lucide-react';
import FormInput from '../ui/FormInput';
import ClientsSelect from './ClientsSelect';
import { FileText } from 'lucide-react';

type GeneralInvoiceInfoProps = {
  invoiceId: string;
  selectedClient: string;
  setSelectedClient: (client: string) => void;
  invoiceName: string;
  setInvoiceName: (name: string) => void;
};

const GeneralInvoiceInfo = ({
  invoiceId,
  selectedClient,
  setSelectedClient,
  invoiceName,
  setInvoiceName,
}: GeneralInvoiceInfoProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        Informations générales
      </h3>

      <div className="space-y-4">
        {/* Numéro de facture */}
        <div className="relative w-full">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Numéro de la facture
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Hash size={18} className="text-gray-600" />
            </span>
            <p className="pl-10 bg-gray-50 border font-semibold border-gray-100 text-black text-sm rounded-lg block w-full p-2.5">
              {invoiceId}
            </p>
          </div>
        </div>

        {/* Sélection du client */}
        <ClientsSelect
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
        />

        {/* Titre de la facture */}
        <FormInput
          label="Titre de la facture"
          value={invoiceName}
          onChange={e => setInvoiceName(e.target.value)}
          placeholder="Entrez le nom de la facture"
          icon={<FileText size={18} className="text-gray-600" />}
          required
        />
      </div>
    </div>
  );
};

export default GeneralInvoiceInfo;
