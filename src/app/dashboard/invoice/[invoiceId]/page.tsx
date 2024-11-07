"use client";
import Badge from "@/src/components/Badge";
import { RootState } from "@/src/redux/store";
import { getInvoiceById } from "@/src/services/invoice";
import { Invoice } from "@/src/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";

const SingleInvoicePage = ({ params }: { params: { invoiceId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);
  const router = useRouter();

  const auth = useSelector((state: RootState) => state.auth);
  const loggedAccount = auth.loggedAccountInfos;

  const handlePushLeft = () => {
    router.back();
  }

  const fetchData = async () => {
    getInvoiceById(params.invoiceId, auth.token!).then((data) => {
      if (data.success) {
        setInvoiceData(data.invoice);
        setLoading(false);
      } else if (!data.success) {
        setError("Une erreur s'est produite lors de la récupération de la facture");
        setLoading(false);
      }
    }).catch((error) => {
      setError("Une erreur s'est produite lors de la récupération de la facture");
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchData();
  }, [])

  if (!invoiceData) return <div>Not found</div>

  return (
    <div>
      <div onClick={handlePushLeft} className="flex gap-2 bg-white w-full p-2 rounded-xl cursor-pointer">
        <FaAngleLeft className="w-8 h-8" />
        <h3 className="text-xl font-light">
          Détails de la facture
        </h3>
      </div>
      <div className="w-5/6 pr-4 flex justify-between items-center">
        <div className="flex flex-col py-4 px-1">
          <h2 className="text-lg font-semibold">Facture n° {invoiceData.invoiceNumber}</h2>
          <p className="font-light text-xs text-gray-500">
            Payé le 27 Juin 2023
          </p>
        </div>
        {
          invoiceData.status === "DRAFT" && (
            <div className="bg-white rounded-xl w-60 p-2 flex flex-col">
              <button type="button" className="text-xs hover:text-white border border-green-700 hover:bg-green-800 text-green-800  font-medium rounded-lg px-3 py-2.5">
                Marqué comme payé
              </button>
            </div>
          )
        }
      </div>
      <div className="flex gap-4 h-dvh">
        <div className="w-5/6  flex flex-col gap-2 bg-white p-4 rounded-xl">
          <div className="w-full flex justify-between">
            <div className="flex gap-2">
              {
                loggedAccount && loggedAccount.logo && (
                  <img
                    src={invoiceData?.client.logo}
                    className="w-32 h-20 mx-auto"
                  />
                )
              }
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">
                  {loggedAccount && loggedAccount.company &&
                    loggedAccount.company?.length > 0
                    ? loggedAccount.company
                    : `${loggedAccount?.firstName} ${loggedAccount?.lastName}`
                  }
                </h3>
                <p className="text-sm text-gray-500">
                  {loggedAccount?.address}
                </p>
                {/* Tel */}
                <p className="text-sm text-gray-500">
                  {loggedAccount?.phone}
                </p>
                {/* Email */}
                <p className="text-sm text-gray-500">
                  {loggedAccount?.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end gap-6">
              <div className="flex gap-4">
                {
                  invoiceData.status === "DRAFT" && (<Badge type="gray" text="Facture en brouillon" />)
                }
                {
                  invoiceData.status === "SENT" && (<Badge type="blue" text="Facture envoyée au client" />)
                }
                {
                  invoiceData.status === "PAID" && (<Badge type="green" text="Facture payée" />)
                }
                {
                  invoiceData.status === "CANCELLED" && (<Badge type="red" text="Facture annulée" />)
                }

                <Badge type="gray" text={invoiceData.invoiceNumber} />
              </div>
              <div className="text-right">
                <p className="font-light text-xs">Montant total</p>
                <p className="font-bold text-lg">
                  {invoiceData.amount} GNF
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-12 p-4 border my-2 rounded-lg">
            <div className="w-4/12 flex flex-col gap-2 p-6 bg-gray-100 rounded-2xl">
              <div>
                <h2 className="text-xs font-light">Date de facture</h2>
                <p className="text-xs font-semibold text-gray-700">
                  {invoiceData.date}
                </p>
              </div>
              <div>
                <h2 className="text-xs font-light">Conditions de règlement</h2>
                <p className="text-xs font-semibold text-gray-700">
                  {
                    invoiceData.paymentCondition === 'NOW' ? 'Immédiat' : `Dans ${invoiceData.paymentCondition} jours`
                  }
                </p>
              </div>
              <div>
                <h2 className="text-xs font-light">Mode de paiement</h2>
                <p className="text-xs font-semibold text-gray-700">
                  Espèces
                </p>
              </div>
            </div>
            <div className="w-full">
              <h3 className="text-md font-light">Adresse de facturation</h3>
              <div className="h-0.5 w-full bg-gray-50"></div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold">
                  {invoiceData.client && invoiceData.client.company
                    && invoiceData.client.company?.length > 0
                    ? invoiceData.client.company
                    : `${invoiceData.client.firstName} ${invoiceData.client.lastName}`
                  }
                </h3>
                <p className="text-sm text-gray-500">
                  {invoiceData.client.address}
                </p>
                {/* Tel */}
                <p className="text-sm text-gray-500">
                  {invoiceData.client.phone}
                </p>
                {/* Email */}
                <p className="text-sm text-gray-500">
                  {invoiceData.client.email}
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md h-56 rounded-lg mt-2 bg-white ">
            <table className="w-full text-sm text-left text-gray-500 sticky">
              <thead className="text-xs text-white bg-gray-700 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    N°
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Article/Service
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantité
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Montant
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {
                  invoiceData?.articles.map((article, index) => (
                    <tr onClick={() => { }} key={index} className="border-b cursor-pointer hover:bg-gray-200">
                      <th
                        scope="row"
                        className="text-xs px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="text-xs px-6 py-4">
                        {article.name}
                        <p className="text-xs text-gray-400">{article.description}</p>
                      </td>
                      <td className="text-xs px-6 py-4">
                        {article.quantity}
                      </td>
                      <td className="text-xs px-6 py-4">
                        {article.price * article.quantity} GNF
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          <div className="w-full flex justify-end mt-4">
            <div className="w-56 flex flex-col gap-2 mt-4">
              <div className="w-full flex justify-between">
                <h3 className="text-sm font-semibold">Total HT</h3>
                <p className="text-xs text-gray-500">
                  {invoiceData.amount} GNF
                </p>
              </div>
              <div className="w-full flex justify-between">
                <h3 className="text-sm font-semibold">TVA</h3>
                <p className="text-xs text-gray-500">0%</p>
              </div>
              {/* <div className="w-full flex justify-between">
                <h3 className="text-sm font-semibold">Réduction</h3>
                <p className="text-xs text-gray-500">0 GNF</p>
              </div> */}
              <hr className="w-full border-gray-50" />
              <div className="w-full flex justify-between">
                <h3 className="text-sm font-semibold">Total TTC</h3>
                <p className="text-xs text-gray-500">{invoiceData.amount} GNF</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/6 flex flex-col gap-4">
          <div className="bg-white rounded-xl w-54 p-2 flex flex-col">
            {/* <h3>Facture pas encore envoyée?</h3> */}
            <button type="button" className=" text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-3 py-2.5">
              Imprimer la facture
            </button>
          </div>
          <div className="bg-white rounded-xl w-54 p-2 flex flex-col">
            {/* <h3>Facture pas encore envoyée?</h3> */}
            <button type="button" className=" text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2.5">
              Envoyer la facture par mail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleInvoicePage;

// Numero de la facture
// Date de la facture
// Conditions de règlement (Immédiat)
// Mode de paiement (Espèces)