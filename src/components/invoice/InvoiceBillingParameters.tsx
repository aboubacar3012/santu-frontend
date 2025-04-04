import { Calendar, Percent, CreditCard, Clock, MessageSquare } from 'lucide-react';
import FormInput from '../ui/FormInput';
import { PaymentModeEnum, PaymentConditionEnum } from '@/src/types';

type InvoiceBillingParametersProps = {
  invoiceDate: string;
  setInvoiceDate: (date: string) => void;
  invoiceTva: number;
  setInvoiceTva: (tva: number) => void;
  invoicePaymentMode: PaymentModeEnum;
  setInvoicePaymentMode: (method: PaymentModeEnum) => void;
  invoicePaymentCondition: PaymentConditionEnum;
  setInvoicePaymentCondition: (condition: PaymentConditionEnum) => void;
  invoiceRemark: string;
  setInvoiceRemark: (remark: string) => void;
};

const InvoiceBillingParameters = ({
  invoiceDate,
  setInvoiceDate,
  invoiceTva,
  setInvoiceTva,
  invoicePaymentMode,
  setInvoicePaymentMode,
  invoicePaymentCondition,
  setInvoicePaymentCondition,
  invoiceRemark,
  setInvoiceRemark,
}: InvoiceBillingParametersProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <h3 className="text-sm font-medium text-gray-900 mb-3">Paramètres de facturation</h3>

      <div className="space-y-4">
        {/* Date et TVA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date de la facture */}
          <div className="relative">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="invoiceDate" className="text-sm font-medium text-gray-900">
                Date de la facture
              </label>
              <button
                type="button"
                onClick={() => setInvoiceDate(new Date().toISOString().split('T')[0])}
                className="text-xs bg-gray-700 text-white py-1 px-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Aujourd'hui
              </button>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Calendar size={18} className="text-gray-600" />
              </span>
              <input
                type="date"
                value={invoiceDate}
                onChange={e => setInvoiceDate(e.target.value)}
                id="invoiceDate"
                className="pl-10 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* TVA */}
          <FormInput
            label="TVA (en %)"
            value={invoiceTva.toString()}
            onChange={e => setInvoiceTva(Number(e.target.value))}
            type="number"
            placeholder="TVA"
            icon={<Percent size={18} className="text-gray-600" />}
            required
          />
        </div>

        {/* Mode et conditions de paiement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mode de règlement */}
          <div className="relative">
            <label htmlFor="paymentMode" className="block mb-2 text-sm font-medium text-gray-900">
              Mode de règlement
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <CreditCard size={18} className="text-gray-600" />
              </span>
              <select
                value={invoicePaymentMode}
                onChange={e => setInvoicePaymentMode(e.target.value as PaymentModeEnum)}
                id="paymentMode"
                className="pl-10 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all"
              >
                <option value={PaymentModeEnum.CASH}>Espèces</option>
                <option disabled value={PaymentModeEnum.OM}>
                  Orange Money
                </option>
                <option disabled value={PaymentModeEnum.CB}>
                  Carte Bancaire
                </option>
                <option disabled value={PaymentModeEnum.VIREMENT}>
                  Virement
                </option>
              </select>
            </div>
          </div>

          {/* Conditions de règlement */}
          <div className="relative">
            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">
              Conditions de règlement
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Clock size={18} className="text-gray-600" />
              </span>
              <select
                value={invoicePaymentCondition}
                onChange={e => setInvoicePaymentCondition(e.target.value as PaymentConditionEnum)}
                id="status"
                className="pl-10 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all"
              >
                <option value={PaymentConditionEnum.NOW}>Immédiat</option>
                <option value={PaymentConditionEnum.FIFTEEN}>15 jours</option>
                <option value={PaymentConditionEnum.THIRTY}>30 jours</option>
                <option value={PaymentConditionEnum.FORTYFIVE}>45 jours</option>
                <option value={PaymentConditionEnum.SIXTY}>60 jours</option>
                <option value={PaymentConditionEnum.UPONRECEIPT}>Jusqu'à réception</option>
              </select>
            </div>
          </div>
        </div>

        {/* Remarque */}
        <FormInput
          label="Remarque"
          value={invoiceRemark}
          onChange={e => setInvoiceRemark(e.target.value)}
          type="textarea"
          placeholder="Entrez une remarque"
          icon={<MessageSquare size={18} className="text-gray-600" />}
          rows={3}
        />
      </div>
    </div>
  );
};

export default InvoiceBillingParameters;
