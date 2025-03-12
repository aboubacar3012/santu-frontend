import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Account } from '@/src/types';
import Button from '@/src/components/shared/Button';
import { Save, Upload } from 'lucide-react';

interface AccountSettingsFormProps {
  accountData: Account | null;
}

const CURRENCIES = [
  { value: 'GNF', label: 'Franc Guinéen (GNF)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'USD', label: 'Dollar US ($)' },
  { value: 'XOF', label: 'Franc CFA (FCFA)' },
];

const PAYMENT_TERMS = [
  { value: 'immediate', label: 'Paiement immédiat' },
  { value: '7', label: '7 jours' },
  { value: '15', label: '15 jours' },
  { value: '30', label: '30 jours' },
  { value: '60', label: '60 jours' },
  { value: 'custom', label: 'Personnalisé' },
];

const INVOICE_NUMBER_FORMATS = [
  { value: 'YYYY-MM-####', label: 'YYYY-MM-0001 (Année-Mois-Numéro)' },
  { value: 'YYYY####', label: 'YYYY0001 (Année-Numéro)' },
  { value: 'INV####', label: 'INV0001 (Préfixe-Numéro)' },
  { value: 'custom', label: 'Format personnalisé' },
];

const AccountSettingsForm = ({ accountData }: AccountSettingsFormProps) => {
  const [currency, setCurrency] = useState('GNF');
  const [paymentTerm, setPaymentTerm] = useState('immediate');
  const [customPaymentTerm, setCustomPaymentTerm] = useState('');
  const [defaultTaxRate, setDefaultTaxRate] = useState('0');
  const [invoicePrefix, setInvoicePrefix] = useState('INV');
  const [invoiceNumberFormat, setInvoiceNumberFormat] = useState('YYYY-MM-####');
  const [customInvoiceFormat, setCustomInvoiceFormat] = useState('');
  const [legalFooter, setLegalFooter] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (accountData) {
      //   setCurrency(accountData.currency || 'GNF');
      //   setPaymentTerm(accountData.defaultPaymentTerm || 'immediate');
      //   setCustomPaymentTerm(accountData.customPaymentTerm || '');
      //   setDefaultTaxRate(accountData.defaultTaxRate?.toString() || '0');
      //   setInvoicePrefix(accountData.invoicePrefix || 'INV');
      //   setInvoiceNumberFormat(accountData.invoiceNumberFormat || 'YYYY-MM-####');
      //   setCustomInvoiceFormat(accountData.customInvoiceFormat || '');
      //   setLegalFooter(accountData.legalFooter || '');
      //   if (accountData.logoUrl) {
      //     setLogoPreview(accountData.logoUrl);
      //   }
    }
  }, [accountData]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Paramètres mis à jour avec succès');
    } catch (error) {
      toast.error('Une erreur est survenue lors de la mise à jour des paramètres');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 h-min py-4 gap-4 flex flex-col text-black bg-white rounded-lg shadow-sm">
      <h3 className="px-6 text-lg font-semibold bg-gradient-to-r from-my-raspberry to-my-eggplant bg-clip-text text-transparent">
        Paramètres du compte
      </h3>

      <div className="flex flex-col gap-6 px-6 pt-2">
        {/* Devise */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-black" htmlFor="currency">
            Devise par défaut
          </label>
          <select
            id="currency"
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
          >
            {CURRENCIES.map(curr => (
              <option key={curr.value} value={curr.value}>
                {curr.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Cette devise sera utilisée par défaut pour toutes vos factures.
          </p>
        </div>

        {/* Paramètres de numérotation des factures */}
        <div className="flex flex-col gap-4">
          <h4 className="font-medium text-sm">Numérotation des factures</h4>

          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-black" htmlFor="invoicePrefix">
              Préfixe des factures
            </label>
            <input
              id="invoicePrefix"
              value={invoicePrefix}
              onChange={e => setInvoicePrefix(e.target.value)}
              className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
              placeholder="INV"
            />
            <p className="text-xs text-gray-500 mt-1">
              Exemple: INV pour les factures, DEVIS pour les devis, etc.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-black" htmlFor="invoiceNumberFormat">
              Format de numérotation
            </label>
            <select
              id="invoiceNumberFormat"
              value={invoiceNumberFormat}
              onChange={e => setInvoiceNumberFormat(e.target.value)}
              className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
            >
              {INVOICE_NUMBER_FORMATS.map(format => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>
          </div>

          {invoiceNumberFormat === 'custom' && (
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-black" htmlFor="customInvoiceFormat">
                Format personnalisé
              </label>
              <input
                id="customInvoiceFormat"
                value={customInvoiceFormat}
                onChange={e => setCustomInvoiceFormat(e.target.value)}
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                placeholder="YYYY-####-MM"
              />
              <p className="text-xs text-gray-500 mt-1">
                Utilisez YYYY pour l'année, MM pour le mois, et #### pour le numéro séquentiel.
              </p>
            </div>
          )}
        </div>

        {/* Conditions de paiement par défaut */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-black" htmlFor="paymentTerm">
            Conditions de paiement par défaut
          </label>
          <select
            id="paymentTerm"
            value={paymentTerm}
            onChange={e => setPaymentTerm(e.target.value)}
            className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
          >
            {PAYMENT_TERMS.map(term => (
              <option key={term.value} value={term.value}>
                {term.label}
              </option>
            ))}
          </select>

          {paymentTerm === 'custom' && (
            <div className="mt-2">
              <input
                value={customPaymentTerm}
                onChange={e => setCustomPaymentTerm(e.target.value)}
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                placeholder="Description personnalisée (ex: 45 jours fin de mois)"
              />
            </div>
          )}
        </div>

        {/* Taux de TVA par défaut */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-black" htmlFor="defaultTaxRate">
            Taux de TVA par défaut (%)
          </label>
          <input
            id="defaultTaxRate"
            type="number"
            value={defaultTaxRate}
            onChange={e => setDefaultTaxRate(e.target.value)}
            className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
            min="0"
            max="100"
            step="0.01"
          />
        </div>

        {/* Mentions légales */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-black" htmlFor="legalFooter">
            Mentions légales (bas de facture)
          </label>
          <textarea
            id="legalFooter"
            value={legalFooter}
            onChange={e => setLegalFooter(e.target.value)}
            className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
            rows={3}
            placeholder="Ex: Délai de paiement: 30 jours. Pénalités de retard: 10% du montant TTC."
          ></textarea>
        </div>

        {/* Logo */}
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-black">Logo de l'entreprise</label>

          {logoPreview && (
            <div className="mb-2">
              <img src={logoPreview} alt="Aperçu du logo" className="max-h-32 object-contain" />
            </div>
          )}

          <div className="flex items-center">
            <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <Upload className="w-4 h-4 mr-2" />
              <span className="text-sm">Télécharger un logo</span>
              <input type="file" className="hidden" onChange={handleLogoChange} accept="image/*" />
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">Format recommandé: PNG ou JPEG, max 1MB</p>
        </div>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-end pt-4">
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Enregistrement...' : 'Enregistrer les paramètres'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsForm;
