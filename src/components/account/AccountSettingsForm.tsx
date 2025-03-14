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

// Nouvelles constantes
const DOCUMENT_THEMES = [
  { value: 'classic', label: 'Classique' },
  { value: 'modern', label: 'Moderne' },
  { value: 'minimal', label: 'Minimaliste' },
  { value: 'professional', label: 'Professionnel' },
];

const PAYMENT_METHODS = [
  { value: 'bank_transfer', label: 'Virement bancaire' },
  { value: 'cash', label: 'Espèces' },
  { value: 'check', label: 'Chèque' },
  { value: 'mobile_money', label: 'Mobile Money' },
  { value: 'card', label: 'Carte bancaire' },
];

const AccountSettingsForm = ({ accountData }: AccountSettingsFormProps) => {
  // États existants
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

  // Nouveaux états pour les informations d'entreprise
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');

  // Nouveaux états pour la personnalisation de documents
  const [documentTheme, setDocumentTheme] = useState('classic');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState('#6366f1');
  const [documentFooterText, setDocumentFooterText] = useState('');

  // Nouveaux états pour les notifications et rappels
  const [sendPaymentReminders, setSendPaymentReminders] = useState(false);
  const [reminderDays, setReminderDays] = useState('7');
  const [reminderMessage, setReminderMessage] = useState('');

  // Nouveaux états pour les méthodes de paiement
  const [acceptedPaymentMethods, setAcceptedPaymentMethods] = useState<string[]>(['bank_transfer']);
  const [bankDetails, setBankDetails] = useState('');
  const [mobileMoneyCodes, setMobileMoneyCodes] = useState('');

  // Nouveaux états pour la signature électronique
  const [enableESignature, setEnableESignature] = useState(false);
  const [signatureImage, setSignatureImage] = useState<File | null>(null);
  const [signaturePreview, setSignaturePreview] = useState('');

  useEffect(() => {
    if (accountData) {
      // Initialisation existante
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
      // Nouvelles initialisations
      // setCompanyName(accountData.companyName || '');
      // setCompanyAddress(accountData.companyAddress || '');
      // setCompanyPhone(accountData.companyPhone || '');
      // setCompanyEmail(accountData.companyEmail || '');
      // setTaxNumber(accountData.taxNumber || '');
      // setRegistrationNumber(accountData.registrationNumber || '');
      // setDocumentTheme(accountData.documentTheme || 'classic');
      // setPrimaryColor(accountData.primaryColor || '#3b82f6');
      // setSecondaryColor(accountData.secondaryColor || '#6366f1');
      // setSendPaymentReminders(accountData.sendPaymentReminders || false);
      // setReminderDays(accountData.reminderDays?.toString() || '7');
      // setReminderMessage(accountData.reminderMessage || '');
      // setAcceptedPaymentMethods(accountData.acceptedPaymentMethods || ['bank_transfer']);
      // setBankDetails(accountData.bankDetails || '');
      // setMobileMoneyCodes(accountData.mobileMoneyCodes || '');
      // setEnableESignature(accountData.enableESignature || false);
      // if (accountData.signatureUrl) {
      //   setSignaturePreview(accountData.signatureUrl);
      // }
    }
  }, [accountData]);

  // Méthodes existantes
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Nouvelle méthode pour la signature
  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSignatureImage(file);
      setSignaturePreview(URL.createObjectURL(file));
    }
  };

  // Méthode pour gérer les méthodes de paiement
  const handlePaymentMethodToggle = (method: string) => {
    setAcceptedPaymentMethods(prev => {
      if (prev.includes(method)) {
        return prev.filter(m => m !== method);
      } else {
        return [...prev, method];
      }
    });
  };

  const handleReset = () => {
    // Réinitialisation existante
    setCurrency('GNF');
    setPaymentTerm('immediate');
    setCustomPaymentTerm('');
    setDefaultTaxRate('0');
    setInvoicePrefix('INV');
    setInvoiceNumberFormat('YYYY-MM-####');
    setCustomInvoiceFormat('');
    setLegalFooter('');
    setLogo(null);
    setLogoPreview('');

    // Nouvelles réinitialisations
    setCompanyName('');
    setCompanyAddress('');
    setCompanyPhone('');
    setCompanyEmail('');
    setTaxNumber('');
    setRegistrationNumber('');
    setDocumentTheme('classic');
    setPrimaryColor('#3b82f6');
    setSecondaryColor('#6366f1');
    setDocumentFooterText('');
    setSendPaymentReminders(false);
    setReminderDays('7');
    setReminderMessage('');
    setAcceptedPaymentMethods(['bank_transfer']);
    setBankDetails('');
    setMobileMoneyCodes('');
    setEnableESignature(false);
    setSignatureImage(null);
    setSignaturePreview('');

    toast.info('Formulaire réinitialisé');
  };

  const validateForm = () => {
    // Validation existante
    if (paymentTerm === 'custom' && !customPaymentTerm.trim()) {
      toast.error('Veuillez spécifier les conditions de paiement personnalisées');
      return false;
    }

    if (invoiceNumberFormat === 'custom' && !customInvoiceFormat.trim()) {
      toast.error('Veuillez spécifier le format de numérotation personnalisé');
      return false;
    }

    if (parseFloat(defaultTaxRate) < 0 || parseFloat(defaultTaxRate) > 100) {
      toast.error('Le taux de TVA doit être compris entre 0 et 100%');
      return false;
    }

    // Nouvelles validations
    if (!companyName.trim()) {
      toast.error("Le nom de l'entreprise est obligatoire");
      return false;
    }

    if (!companyEmail.trim()) {
      toast.error("L'email de l'entreprise est obligatoire");
      return false;
    }

    if (sendPaymentReminders && !reminderMessage.trim()) {
      toast.error('Veuillez spécifier un message pour les rappels de paiement');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

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
    <div className="w-full h-min py-4 gap-4 flex flex-col text-black bg-white rounded-lg shadow-sm">
      <h3 className="px-6 text-lg font-semibold bg-gradient-to-r from-finance-primary to-finance-secondary bg-clip-text text-transparent">
        Paramètres du compte
      </h3>

      <div className="flex flex-col gap-6 px-6 pt-2">
        {/* Nouvelle section: Informations de l'entreprise */}
        <div className="border-b border-gray-200 pb-4">
          <h4 className="font-medium text-sm mb-4">Informations de l'entreprise</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-black" htmlFor="companyName">
                Nom de l'entreprise*
              </label>
              <input
                id="companyName"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-black" htmlFor="companyEmail">
                Email de l'entreprise*
              </label>
              <input
                id="companyEmail"
                type="email"
                value={companyEmail}
                onChange={e => setCompanyEmail(e.target.value)}
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-black" htmlFor="companyPhone">
                Téléphone
              </label>
              <input
                id="companyPhone"
                value={companyPhone}
                onChange={e => setCompanyPhone(e.target.value)}
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-black" htmlFor="taxNumber">
                Numéro d'identification fiscale (NIF)
              </label>
              <input
                id="taxNumber"
                value={taxNumber}
                onChange={e => setTaxNumber(e.target.value)}
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="block text-sm font-medium text-black" htmlFor="companyAddress">
                Adresse
              </label>
              <textarea
                id="companyAddress"
                value={companyAddress}
                onChange={e => setCompanyAddress(e.target.value)}
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                rows={2}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-black" htmlFor="registrationNumber">
                RCCM / Numéro d'enregistrement
              </label>
              <input
                id="registrationNumber"
                value={registrationNumber}
                onChange={e => setRegistrationNumber(e.target.value)}
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
              />
            </div>
          </div>
        </div>

        {/* Devise - Existant */}
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

        {/* Paramètres de numérotation des factures - Existant */}
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-4">
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

        {/* Conditions de paiement par défaut - Existant */}
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

        {/* Taux de TVA par défaut - Existant */}
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

        {/* Nouvelle section: Méthodes de paiement acceptées */}
        <div className="border-t border-b border-gray-200 py-4">
          <h4 className="font-medium text-sm mb-3">Méthodes de paiement acceptées</h4>

          <div className="flex flex-wrap gap-3">
            {PAYMENT_METHODS.map(method => (
              <label key={method.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={acceptedPaymentMethods.includes(method.value)}
                  onChange={() => handlePaymentMethodToggle(method.value)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm">{method.label}</span>
              </label>
            ))}
          </div>

          {acceptedPaymentMethods.includes('bank_transfer') && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-black" htmlFor="bankDetails">
                Coordonnées bancaires
              </label>
              <textarea
                id="bankDetails"
                value={bankDetails}
                onChange={e => setBankDetails(e.target.value)}
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 mt-1"
                rows={2}
                placeholder="IBAN, BIC, nom de la banque..."
              />
            </div>
          )}

          {acceptedPaymentMethods.includes('mobile_money') && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-black" htmlFor="mobileMoneyCodes">
                Codes Mobile Money
              </label>
              <textarea
                id="mobileMoneyCodes"
                value={mobileMoneyCodes}
                onChange={e => setMobileMoneyCodes(e.target.value)}
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 mt-1"
                rows={2}
                placeholder="Orange Money: 6xx xxx xxx, MTN MoMo: 6xx xxx xxx..."
              />
            </div>
          )}
        </div>

        {/* Nouvelle section: Personnalisation des documents */}
        <div className="border-b border-gray-200 pb-4">
          <h4 className="font-medium text-sm mb-3">Personnalisation des documents</h4>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-black" htmlFor="documentTheme">
                Thème des documents
              </label>
              <select
                id="documentTheme"
                value={documentTheme}
                onChange={e => setDocumentTheme(e.target.value)}
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
              >
                {DOCUMENT_THEMES.map(theme => (
                  <option key={theme.value} value={theme.value}>
                    {theme.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium text-black" htmlFor="primaryColor">
                  Couleur principale
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="primaryColor"
                    value={primaryColor}
                    onChange={e => setPrimaryColor(e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={e => setPrimaryColor(e.target.value)}
                    className="ml-2 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium text-black" htmlFor="secondaryColor">
                  Couleur secondaire
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="secondaryColor"
                    value={secondaryColor}
                    onChange={e => setSecondaryColor(e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={e => setSecondaryColor(e.target.value)}
                    className="ml-2 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-black" htmlFor="documentFooterText">
                Texte de pied de page personnalisé
              </label>
              <textarea
                id="documentFooterText"
                value={documentFooterText}
                onChange={e => setDocumentFooterText(e.target.value)}
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                rows={2}
                placeholder="Texte apparaissant sur tous les documents générés"
              />
            </div>
          </div>
        </div>

        {/* Nouvelle section: Rappels de paiement */}
        <div className="border-b border-gray-200 pb-4">
          <h4 className="font-medium text-sm mb-3">Rappels de paiement</h4>

          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="sendPaymentReminders"
              checked={sendPaymentReminders}
              onChange={e => setSendPaymentReminders(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <label className="ml-2 text-sm" htmlFor="sendPaymentReminders">
              Activer les rappels automatiques pour les factures impayées
            </label>
          </div>

          {sendPaymentReminders && (
            <div className="flex flex-col gap-3 pl-6">
              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium text-black" htmlFor="reminderDays">
                  Envoyer un rappel (jours après l'échéance)
                </label>
                <select
                  id="reminderDays"
                  value={reminderDays}
                  onChange={e => setReminderDays(e.target.value)}
                  className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                >
                  <option value="1">1 jour</option>
                  <option value="3">3 jours</option>
                  <option value="7">7 jours</option>
                  <option value="14">14 jours</option>
                  <option value="30">30 jours</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium text-black" htmlFor="reminderMessage">
                  Message de rappel
                </label>
                <textarea
                  id="reminderMessage"
                  value={reminderMessage}
                  onChange={e => setReminderMessage(e.target.value)}
                  className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                  rows={3}
                  placeholder="Ex: Nous vous rappelons que votre facture {invoice_number} d'un montant de {amount} est en retard de paiement. Merci de régulariser la situation."
                />
              </div>
            </div>
          )}
        </div>

        {/* Mentions légales - Existant */}
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

        {/* Logo - Existant */}
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

        {/* Boutons de sauvegarde et de réinitialisation */}
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            onClick={handleReset}
            // variant="outline"
            className="flex items-center gap-2"
          >
            Réinitialiser
          </Button>
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
