
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { toast } from "react-toastify";
import InvoiceFormStep from "../InvoiceFormStep";
import InvoiceInfoForm from "./InvoiceInfoForm";
import { generateInvoiceId } from "@/src/libs/generateInvoiceId";
import AddArticleForm from "./AddArticleForm";
import SuccessAddInvoice from "./SuccessAddInvoice";
import { createInvoice } from "@/src/services/invoice";
import { refreshAccount } from "@/src/libs/refreshAccount";
import { loginReducer } from "@/src/redux/features/authSlice";

type InvoiceFormProps = {
  isEdit: boolean;
  isOpen: boolean;
  onClose: () => void;
};
const InvoiceForm = (
  { isOpen, onClose, isEdit }: InvoiceFormProps
) => {
  const [step, setStep] = useState<number>(1); // 1: Informations générales, 2: Produits/Services, 3: Confirmation
  const [campaignName, setCampaignName] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [invoiceName, setInvoiceName] = useState<string>("");
  const [invoiceDate, setInvoiceDate] = useState<string>("");
  const [invoiceTva, setInvoiceTva] = useState<number>(0);
  const [invoicePaymentMode, setInvoicePaymentMode] = useState<string>("CASH");
  const [invoicePaymentCondition, setInvoicePaymentCondition] = useState<string>("NOW");
  const [invoiceRemark, setInvoiceRemark] = useState<string>("");
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [invoiceId, setInvoiceId] = useState<string>("");

  // Article
  const [articles, setArticles] = useState<any[]>([]);
  const [articleName, setProductName] = useState<string>("");
  const [articleQuantity, setProductQuantity] = useState<string>("");
  const [articlePrice, setProductPrice] = useState<string>("");
  const [articleDescription, setProductDescription] = useState<string>("");

  const router = useRouter()
  const auth = useSelector((state: RootState) => state.auth);
  const clients = auth.loggedAccountInfos?.clients;
  const accountId = auth.loggedAccountInfos?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    const invoiceId = generateInvoiceId();
    setInvoiceId(invoiceId);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      // getPartners().then((data) => {
      //   if (data.success) {
      //     setPartnersData(data.partners);
      //   } else if (!data.success) {
      //     setErrorMessage("Une erreur s'est produite lors de la récupération des partenaires");
      //   }
      // }).catch((error) => {
      //   setErrorMessage("Une erreur s'est produite lors de la récupération des partenaires");
      // });
    }

    isOpen && fetchData();

    return () => {
      // setStep(1);
    }
  }, [isOpen]);

  // useEffect(() => {
  //   if (isEdit) {



  //   }

  //   return () => {

  //   }
  // }, [auth, isEdit, isOpen]);

  const onSubmit = () => {
    console.log({
      invoiceId,
      selectedClient,
      invoiceName,
      invoiceDate,
      invoicePaymentMode,
      invoicePaymentCondition,
      invoiceTva,
      articles,
    })
    if (
      !invoiceId ||
      !selectedClient ||
      !invoiceName ||
      !invoiceDate ||
      !invoicePaymentMode ||
      !invoicePaymentCondition
    ) {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }

    const amount = articles && articles.length > 0
      ? articles.reduce((acc, article) => {
        return acc + article.quantity * article.price;
      })
      : 0;

    const invoiceToAdd = {
      accountId: accountId,
      invoiceNumber: invoiceId,
      clientId: selectedClient,
      name: invoiceName,
      date: invoiceDate,
      paymentMode: invoicePaymentMode,
      paymentCondition: invoicePaymentCondition,
      tva: invoiceTva,
      articles,
      amount,
    }

    if (step === 3) {
      createInvoice(invoiceToAdd, auth.token!).then(async (response) => {
        if (response.success) {
          dispatch(loginReducer({ isAuthenticated: true, loggedAccountInfos: response.account }))
          toast.success("Facture créé avec succès");
          onClose();
        } else if (!response.success) {
          setErrorMessage(response.message);
        } else {
          setErrorMessage("Erreur lors de la création de la facture");
        }
      });
    }


    if (step > 0 && step < 3) setStep(step + 1);
  }


  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed inset-0 z-[999] grid place-items-center bg-black bg-opacity-60  backdrop-blur-sm transition-opacity duration-300"
      >
        <div
          className="relative m-4 w-2/6 h-[90%] overflow-auto  ] md:rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
        >
          <div className="w-full flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-semibold">
              Création de facture
            </h1>
          </div>
          <InvoiceFormStep step={step} />
          {
            step === 1 && (
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
              />
            )
          }

          {
            step === 2 && (
              <AddArticleForm
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
            )
          }

          {step === 3 && <SuccessAddInvoice onClick={onSubmit} />}

          <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
            <button
              onClick={() => {
                if (step === 1) return onClose();
                else setStep(step - 1);
              }}
              className="cursor-pointer px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              {step === 1 ? "Annuler" : "Précédant"}
            </button>
            {
              step < 3 && (
                <button
                  type="button"
                  onClick={() => onSubmit()}
                  className="cursor-pointer middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  SUIVANT
                </button>
              )
            }
          </div>
        </div>
      </div>
    </>

  );
}

export default InvoiceForm;