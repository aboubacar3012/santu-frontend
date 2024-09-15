
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { toast } from "react-toastify";
import InvoiceFormStep from "../InvoiceFormStep";
import InvoiceInfoForm from "./InvoiceInfoForm";

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
  const [invoicePaymentMethod, setInvoicePaymentMethod] = useState<string>("");
  const [invoicePaymentCondition, setInvoicePaymentCondition] = useState<string>("");
  const [invoiceRemark, setInvoiceRemark] = useState<string>("");

  const router = useRouter()
  const auth = useSelector((state: RootState) => state.auth);

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
      setStep(1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isEdit) {



    }

    return () => {

    }
  }, [auth, isEdit, isOpen]);

  const onSubmit = (e: any) => {
    e.preventDefault();

  }


  // Nom de la facture
  // Date de la facture
  // Conditions de règlement (Immédiat)
  // Numero de la facture
  // Client (Nom, Adresse, NIF, NIS, N° de TVA)

  // Produit (Nom, Quantité, Prix unitaire, Total)
  // Description


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
          <form onSubmit={onSubmit}>
            {
              step === 1 && (
                <InvoiceInfoForm
                  invoiceName={invoiceName}
                  setInvoiceName={setInvoiceName}
                  invoiceDate={invoiceDate}
                  setInvoiceDate={setInvoiceDate}
                  invoiceTva={invoiceTva}
                  setInvoiceTva={setInvoiceTva}
                  invoicePaymentMethod={invoicePaymentMethod}
                  setInvoicePaymentMethod={setInvoicePaymentMethod}
                  invoicePaymentCondition={invoicePaymentCondition}
                  setInvoicePaymentCondition={setInvoicePaymentCondition}
                  invoiceRemark={invoiceRemark}
                  setInvoiceRemark={setInvoiceRemark}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                />
              )
            }

            {
              step === 2 && (
                <>
                  <div className="overflow-auto flex flex-col gap-2 bg-white py-4 px-2 h-48">
                    <div className=" shadow-md  mt-2 bg-white ">
                      <table className="w-full text-sm text-left text-gray-500 sticky">
                        <thead className="text-xs text-white uppercase bg-gray-700 ">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Product/Service
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Quantité
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Prix
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            [1, 2, 3, 4, 5].map((invoice, index) => (
                              <tr onClick={() => { }} key={index} className="text-xs border-b cursor-pointer hover:bg-gray-200">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-wrap">
                                  Facture, MacBook Pro 16&#34;
                                </td>
                                <td className="px-6 py-4">1</td>
                                <td className="px-6 py-4">
                                  2999
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <hr className="w-full border-gray-50 py-2" />
                  <div className="flex flex-col gap-1 px-4 py-2">
                    <div className="relative w-full min-w-[200px]">
                      <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-900">
                        Nom du produit/service
                      </label>
                      <input value={campaignName} onChange={(e) => setCampaignName(e.target.value)} type="text" id="product" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez le nom du produit ou service" required />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 px-4 py-2">
                    <div className="relative w-full min-w-[200px]">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                      <textarea value={objective} onChange={(e) => setObjective(e.target.value)} id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez la description de la campagne" required />
                    </div>
                  </div>
                  <div className="flex gap-2 px-4 py-2">
                    <div className="relative w-full min-w-[200px]">
                      <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900">
                        Quantité
                      </label>
                      <input value={campaignName} onChange={(e) => setCampaignName(e.target.value)} type="number" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez le nom du produit ou service" required />
                    </div>
                    <div className="relative w-full min-w-[200px]">
                      <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                        Prix
                      </label>
                      <input value={campaignName} onChange={(e) => setCampaignName(e.target.value)} type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez le nom du produit ou service" required />
                    </div>
                  </div>
                </>
              )
            }

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
              <button
                type="button"
                onClick={() => {
                  if (step > 0 && step < 3) setStep(step + 1);
                }}
                className="cursor-pointer middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                SUIVANT
              </button>
            </div>
          </form>

        </div>
      </div>
    </>

  );
}

export default InvoiceForm;