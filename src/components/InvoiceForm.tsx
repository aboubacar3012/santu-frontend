
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CampaignStatus, Campaign, User, Partner } from "@/src/types";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { toast } from "react-toastify";
import InvoiceFormStep from "./InvoiceFormStep";

type InvoiceFormProps = {
  isEdit: boolean;
  isOpen: boolean;
  onClose: () => void;
};
const InvoiceForm = (
  { isOpen, onClose, isEdit }: InvoiceFormProps
) => {
  const [step, setStep] = useState<number>(2); // 1: Informations générales, 2: Produits/Services, 3: Confirmation
  const [campaignName, setCampaignName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [status, setStatus] = useState<CampaignStatus>(CampaignStatus.PREPARATION)
  const [partnerId, setPartnerId] = useState<string>("")
  const [objective, setObjective] = useState<string>("")
  const [tool, setTool] = useState<string>("")
  const [budget, setBudget] = useState<number>()
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [city, setCity] = useState<string>("Marseille")
  const [zones, setZones] = useState<string[]>([])
  const [camions, setCamions] = useState<number>()
  const [faces, setFaces] = useState<number>()
  const [tva, setTva] = useState<number>(20)

  const [partnersData, setPartnersData] = useState<Partner[]>([])

  const router = useRouter()
  const auth = useSelector((state: RootState) => state.auth);
  const [errorMessage, setErrorMessage] = useState("");

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
          className="relative md:m-4 md:w-3/6 w-full h-[100%] md:h-[80%] overflow-auto md:min-w-[30%] md:max-w-[30%] md:rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
        >
          <div className="w-full flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-semibold">
              Création de facture
            </h1>
          </div>
          <InvoiceFormStep />
          <form onSubmit={onSubmit}>
            {
              step === 1 && (
                <>
                  <div className="flex flex-col gap-1 px-4 py-2">
                    <div className="relative w-full min-w-[200px]">
                      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Numéro de la facture</label>
                      <p className="bg-gray-50 border font-semibold border-gray-100 text-gray-900 text-sm rounded-lg  block w-full p-2.5" >
                        #INV-2024-01-00002343
                      </p>
                    </div>
                  </div>
                  {/* Choisir le client */}
                  {
                    !isEdit && (
                      <div className="flex flex-col gap-1 px-4 py-2">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-900 ">
                          Choisir le client
                        </label>
                        <div className="flex gap-2">
                          <select value={partnerId} onChange={(e) => setPartnerId(e.target.value)} id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ">
                            <option selected value="">
                              Choisir un client
                            </option>
                            {
                              partnersData.map((partner) => (
                                <option key={partner._id} value={partner._id}>
                                  {partner.name}
                                </option>
                              ))
                            }
                          </select>
                          {/* Nouveau client */}
                          <button
                            type="button"
                            className="w-2/5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 "
                          >
                            + Nouveau client
                          </button>
                        </div>
                      </div>

                    )
                  }
                  <div className="flex flex-col gap-1 px-4 py-2">
                    <div className="relative w-full min-w-[200px]">
                      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Donner un titre a votre facture</label>
                      <input value={campaignName} onChange={(e) => setCampaignName(e.target.value)} type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez le nom de la facture" required />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 px-4 py-2">
                    <div className="relative w-full min-w-[200px]">
                      <label htmlFor="budget" className="block mb-2 text-sm font-medium text-gray-900">Date de la facture</label>
                      <input
                        type="date"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        id="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                        placeholder="Entrez le titre de la campagne"
                        required
                        // min aujourdhui
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>


                  {/* Conditions de règlement (Immédiat) */}
                  <div className="flex gap-2 px-4">
                    <div className="w-1/2 flex flex-col gap-1 py-2">
                      <label htmlFor="status" className="block text-sm font-medium text-gray-900 ">
                        Mode de règlement
                      </label>
                      <select value={partnerId} onChange={(e) => setPartnerId(e.target.value)} id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ">
                        <option value="1">
                          Espèces
                        </option>
                        <option disabled value="2">
                          Orange Money
                        </option>
                        <option disabled value="3">
                          Carte Bancaire
                        </option>
                        <option disabled value="4">
                          Virement
                        </option>
                      </select>
                    </div>
                    <div className="w-1/2 flex flex-col gap-1 py-2">
                      <label htmlFor="status" className="block text-sm font-medium text-gray-900 ">
                        Conditions de règlement
                      </label>
                      <select value={partnerId} onChange={(e) => setPartnerId(e.target.value)} id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ">
                        <option value="1">
                          Immédiat
                        </option>
                        <option value="2">
                          15 jours
                        </option>
                        <option value="3">
                          30 jours
                        </option>
                        <option value="4">
                          Non défini
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 px-4 py-2">
                    <div className="relative w-full min-w-[200px]">
                      <label htmlFor="tva" className="block mb-2 text-sm font-medium text-gray-900">TVA (en %)</label>
                      <input value={tva} onChange={(e) => setTva(e.target.value)} type="text" id="tva" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="TVA" required />
                    </div>
                  </div>
                  {/* Rémarque */}
                  <div className="flex flex-col gap-1 px-4 py-2">
                    <div className="relative w-full min-w-[200px]">
                      <label htmlFor="objective" className="block mb-2 text-sm font-medium text-gray-900">Rémarque</label>
                      <textarea value={objective} onChange={(e) => setObjective(e.target.value)} id="objective" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez la description de la campagne" required />
                    </div>
                  </div>

                  <div className="px-2">
                    {errorMessage && <div
                      className="px-2 relative block w-full p-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
                      {errorMessage}
                    </div>}
                  </div></>
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
                onClick={onClose}
                data-ripple-dark="true"
                data-dialog-close="true"
                className="cursor-pointer px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Annuler
              </button>
              <button
                type="submit"
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