import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { toast } from 'react-toastify';
import { Article, StatusEnum } from '../types';
import { generateInvoiceId } from '../libs/generateInvoiceId';
import { createInvoice, getInvoiceById, updateInvoice } from '../services/invoice';

// Interface pour gérer les erreurs par champ
export interface InvoiceFormErrors {
  invoiceName?: string;
  invoiceDate?: string;
  selectedClient?: string;
  articleName?: string;
  articleQuantity?: string;
  articlePrice?: string;
}

interface UseInvoiceFormProps {
  isEdit: boolean;
  onClose: () => void;
  invoiceId?: string | null;
}

export const useInvoiceForm = ({
  isEdit,
  onClose,
  invoiceId: existingInvoiceId,
}: UseInvoiceFormProps) => {
  // États du formulaire
  const [step, setStep] = useState<number>(1);
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [invoiceName, setInvoiceName] = useState<string>('');
  const [invoiceDate, setInvoiceDate] = useState<string>('');
  const [invoiceTva, setInvoiceTva] = useState<number>(0);
  const [invoicePaymentMode, setInvoicePaymentMode] = useState<string>('CASH');
  const [invoicePaymentCondition, setInvoicePaymentCondition] = useState<string>('NOW');
  const [invoiceRemark, setInvoiceRemark] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formErrors, setFormErrors] = useState<InvoiceFormErrors>({});

  // Gestion des articles
  const [articles, setArticles] = useState<Partial<Article>[]>([]);
  const [articleName, setArticleName] = useState<string>('');
  const [articleQuantity, setArticleQuantity] = useState<string>('');
  const [articlePrice, setArticlePrice] = useState<string>('');
  const [articleDescription, setArticleDescription] = useState<string>('');

  // Redux
  const auth = useSelector((state: RootState) => state.auth);
  const accountId = auth.loggedAccountInfos?.id;
  const enterpriseId = auth.loggedAccountInfos?.enterpriseId || '';
  const dispatch = useDispatch();

  // État pour le chargement
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initialisation de l'ID de la facture et récupération des données si en mode édition
  useEffect(() => {
    if (!existingInvoiceId) {
      const newInvoiceId = generateInvoiceId();
      setInvoiceNumber(newInvoiceId);
    } else {
      setInvoiceNumber(existingInvoiceId);
      
      if (isEdit && existingInvoiceId) {
        setIsLoading(true);
        getInvoiceById(existingInvoiceId, auth.token).then((response) => {
          if (response.success) {
            const invoice = response.invoice;
            setInvoiceName(invoice.name);
            setInvoiceDate(invoice.date);
            setInvoiceTva(Number(invoice.tva || 0));
            setInvoicePaymentMode(invoice.paymentMode);
            setInvoicePaymentCondition(invoice.paymentCondition);
            setInvoiceRemark(invoice.remark || '');
            setSelectedClient(invoice.clientId);
            setArticles(invoice.articles || []);
          } else {
            setErrorMessage("Impossible de récupérer les détails de la facture");
          }
        }).finally(() => {
          setIsLoading(false);
        });
      }
    }
  }, [existingInvoiceId, isEdit, auth.token]);

  // Nettoyage du message d'erreur après 5 secondes
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // Validation du formulaire
  const validateForm = (): boolean => {
    const errors: InvoiceFormErrors = {};
    let isValid = true;

    // Validation des champs obligatoires
    if (!invoiceName.trim()) {
      errors.invoiceName = 'Le nom de la facture est requis';
      isValid = false;
    }

    if (!invoiceDate) {
      errors.invoiceDate = 'La date de la facture est requise';
      isValid = false;
    }

    if (!selectedClient) {
      errors.selectedClient = "La sélection d'un client est requise";
      isValid = false;
    }

    // Validation des articles
    if (articles.length === 0) {
      setErrorMessage('Veuillez ajouter au moins un article à la facture');
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Validation des champs d'article avant ajout
  const validateArticle = (): boolean => {
    const errors: InvoiceFormErrors = {};
    let isValid = true;

    if (!articleName.trim()) {
      errors.articleName = "Le nom de l'article est requis";
      isValid = false;
    }

    if (!articleQuantity || Number(articleQuantity) <= 0) {
      errors.articleQuantity = 'La quantité doit être supérieure à 0';
      isValid = false;
    }

    if (!articlePrice || Number(articlePrice) <= 0) {
      errors.articlePrice = 'Le prix doit être supérieur à 0';
      isValid = false;
    }

    setFormErrors({ ...formErrors, ...errors });
    return isValid;
  };

  // Ajout d'un article
  const addArticle = () => {
    if (!validateArticle()) return;

    const newArticle: Partial<Article> = {
      name: articleName,
      quantity: articleQuantity,
      price: articlePrice,
      description: articleDescription,
    };

    setArticles([...articles, newArticle]);

    // Réinitialisation des champs
    setArticleName('');
    setArticleQuantity('');
    setArticlePrice('');
    setArticleDescription('');

    // Effacer les erreurs liées aux articles
    const {
      articleName: _,
      articleQuantity: __,
      articlePrice: ___,
      ...remainingErrors
    } = formErrors;
    setFormErrors(remainingErrors);
  };

  // Suppression d'un article
  const removeArticle = (index: number) => {
    const updatedArticles = [...articles];
    updatedArticles.splice(index, 1);
    setArticles(updatedArticles);
  };

  // Progression d'étape
  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else onClose();
  };

  // Soumission du formulaire
  const handleSubmit = () => {
    if (step === 1) {
      if (!validateForm()) return;
      nextStep();
      return;
    }

    if (step === 2) {
      submitInvoice();
    }
  };

  // Calcul du montant total de la facture
  const calculateTotalAmount = (): string => {
    let total = 0;
    articles.forEach(article => {
      total += Number(article.price) * Number(article.quantity || 1);
    });
    return total.toString();
  };

  // Envoi des données à l'API
  const submitInvoice = async () => {
    if (!validateForm()) return;

    setIsPending(true);

    const amount = calculateTotalAmount();
    const status = invoicePaymentCondition === 'NOW' ? StatusEnum.PAID : StatusEnum.DRAFT;

    const invoiceData = {
      invoiceNumber,
      name: invoiceName,
      date: invoiceDate,
      amount,
      paymentMode: invoicePaymentMode,
      paymentCondition: invoicePaymentCondition,
      status,
      tva: invoiceTva.toString(),
      remark: invoiceRemark,
      clientId: selectedClient,
      enterpriseId,
      articles: articles.map(article => ({
        name: article.name,
        description: article.description || '',
        quantity: article.quantity,
        price: article.price
      }))
    };

    try {
      let response;
      
      if (isEdit && existingInvoiceId) {
        response = await updateInvoice(existingInvoiceId, invoiceData, auth.token);
      } else {
        response = await createInvoice(invoiceData, auth.token);
      }
      
      if (response.success) {
        toast.success(`Facture ${isEdit ? 'modifiée' : 'créée'} avec succès`);
        onClose();
      } else {
        setErrorMessage(response.message || `Erreur lors de la ${isEdit ? 'modification' : 'création'} de la facture`);
      }
    } catch (error) {
      setErrorMessage('Erreur de connexion au serveur');
      console.error('Erreur lors de la soumission de la facture:', error);
    } finally {
      setIsPending(false);
    }
  };

  return {
    // États du formulaire
    step,
    formData: {
      invoiceNumber,
      invoiceName,
      invoiceDate,
      invoiceTva,
      invoicePaymentMode,
      invoicePaymentCondition,
      invoiceRemark,
      selectedClient,
    },
    articlesData: {
      articles,
      articleName,
      articleQuantity,
      articlePrice,
      articleDescription,
    },
    // Gestion des erreurs
    formErrors,
    errorMessage,
    // Setters
    setters: {
      setStep,
      setInvoiceName,
      setInvoiceDate,
      setInvoiceTva,
      setInvoicePaymentMode,
      setInvoicePaymentCondition,
      setInvoiceRemark,
      setSelectedClient,
      setArticleName,
      setArticleQuantity,
      setArticlePrice,
      setArticleDescription,
      setErrorMessage,
    },
    // Gestion des articles
    setArticles,
    addArticle,
    removeArticle,
    // État du chargement
    isPending,
    isLoading,
    // Actions
    nextStep,
    prevStep,
    handleSubmit,
  };
};
