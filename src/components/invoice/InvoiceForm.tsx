import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { toast } from 'react-toastify';
import InvoiceFormStep from '../InvoiceFormStep';
import InvoiceInfoForm from './InvoiceInfoForm';
import { generateInvoiceId } from '@/src/libs/generateInvoiceId';
import SuccessAddInvoice from './SuccessAddInvoice';
import { createInvoice } from '@/src/services/invoice';
import { loginReducer } from '@/src/redux/features/authSlice';
import { StatusEnum } from '@/src/types';
import Modal from '../ui/Modal';

type InvoiceFormProps = {
  isEdit: boolean;
  isOpen: boolean;
  onClose: () => void;
};
const InvoiceForm = ({ isOpen, onClose, isEdit }: InvoiceFormProps) => {
  const [step, setStep] = useState<number>(1); // 1: Informations générales, 2: Confirmation
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [invoiceName, setInvoiceName] = useState<string>('');
  const [invoiceDate, setInvoiceDate] = useState<string>('');
  const [invoiceTva, setInvoiceTva] = useState<number>(0);
  const [invoicePaymentMode, setInvoicePaymentMode] = useState<string>('CASH');
  const [invoicePaymentCondition, setInvoicePaymentCondition] =
    useState<string>('NOW');
  const [invoiceRemark, setInvoiceRemark] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [invoiceId, setInvoiceId] = useState<string>('');

  // Article
  const [articles, setArticles] = useState<any[]>([]);
  const [articleName, setProductName] = useState<string>('');
  const [articleQuantity, setProductQuantity] = useState<string>('');
  const [articlePrice, setProductPrice] = useState<string>('');
  const [articleDescription, setProductDescription] = useState<string>('');

  const auth = useSelector((state: RootState) => state.auth);
  const accountId = auth.loggedAccountInfos?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    const invoiceId = generateInvoiceId();
    setInvoiceId(invoiceId);
  }, []);

  useEffect(() => {
    // vider errorMessage après 5 secondes
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);

      // Nettoyer le timer si le composant est démonté ou si errorMessage change
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const onSubmit = (status: StatusEnum = StatusEnum.PAID) => {
    if (
      !invoiceId ||
      !selectedClient ||
      !invoiceName ||
      !invoiceDate ||
      !invoicePaymentMode ||
      !invoicePaymentCondition
    ) {
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    }

    if (step === 1) return setStep(2);

    let amount = 0;
    if (articles.length > 0) {
      articles.forEach(article => {
        amount += Number(article.price);
      });
    }

    const invoiceToAdd = {
      accountId: accountId,
      invoiceNumber: invoiceId,
      clientId: selectedClient,
      name: invoiceName,
      date: invoiceDate,
      paymentMode: invoicePaymentMode,
      paymentCondition: invoicePaymentCondition,
      status: status,
      tva: invoiceTva,
      articles,
      amount,
    };

    createInvoice(invoiceToAdd, auth.token!).then(async response => {
      if (response.success) {
        dispatch(
          loginReducer({
            isAuthenticated: true,
            loggedAccountInfos: response.account,
          })
        );
        toast.success('Facture créé avec succès');
        onClose();
      } else if (!response.success) {
        setErrorMessage(response.message);
      } else {
        setErrorMessage('Erreur lors de la création de la facture');
      }
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Création de facture"
      size="medium"
      footer={
        <div className="flex justify-end w-full">
          <button
            onClick={() => {
              if (step === 1) return onClose();
              else setStep(step - 1);
            }}
            className="cursor-pointer px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            {step === 1 ? 'Annuler' : 'Retour'}
          </button>
          {step < 2 && (
            <button
              type="button"
              onClick={() => onSubmit()}
              className="cursor-pointer middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              SUIVANT
            </button>
          )}
        </div>
      }
    >
      <div className={step === 1 ? 'h-[70vh] overflow-y-auto' : 'min-h-max'}>
        {step === 1 && (
          <InvoiceInfoForm
            invoiceName={invoiceName}
            setInvoiceName={setInvoiceName}
            invoiceDate={invoiceDate}
            setInvoiceDate={setInvoiceDate}
            invoiceTva={invoiceTva}
            setInvoiceTva={setInvoiceTva}
            invoicePaymentMode={invoicePaymentMode}
            setInvoicePaymentMode={setInvoicePaymentMode}
            invoicePaymentCondition={invoicePaymentCondition}
            setInvoicePaymentCondition={setInvoicePaymentCondition}
            invoiceRemark={invoiceRemark}
            setInvoiceRemark={setInvoiceRemark}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            invoiceId={invoiceId}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            articles={articles}
            setArticles={setArticles}
            articleName={articleName}
            setProductName={setProductName}
            articleQuantity={articleQuantity}
            setProductQuantity={setProductQuantity}
            articlePrice={articlePrice}
            setProductPrice={setProductPrice}
            articleDescription={articleDescription}
            setProductDescription={setProductDescription}
          />
        )}

        {step === 2 && <SuccessAddInvoice onClick={onSubmit} />}
      </div>
    </Modal>
  );
};

export default InvoiceForm;
