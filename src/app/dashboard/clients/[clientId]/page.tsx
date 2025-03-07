"use client";
import Badge from "@/src/components/Badge";
import { useGetClientById } from "@/src/hooks/useClients";
import { useGetInvoicesByClientId } from "@/src/hooks/useInvoices";
import { formatCurrency } from "@/src/libs/formatCurrency";
import { RootState } from "@/src/redux/store";
import { getClientById } from "@/src/services/client";
import { Client, Invoice } from "@/src/types";
import { formatDate } from "date-fns";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";

// Cette fonction indique à Next.js que cette page doit être générée côté client
// et non dans le cadre de l'export statique
export const dynamic = "force-dynamic";

const SingleClient = ({ params }: { params: { clientId: string } }) => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading } = useGetClientById(params.clientId, auth.token!);
  const client = data?.client as Client;

  // Utilisation du hook pour récupérer les factures du client
  const { data: invoicesData, isLoading: isLoadingInvoices } = useGetInvoicesByClientId(params.clientId, auth.token!);
  const invoices = invoicesData?.invoices || [];

  // Calcul du montant total de toutes les factures
  const totalAmount = invoices.reduce((sum:number, invoice:any) => sum + (invoice.amount || 0), 0);

  const handlePushLeft = () => {
    router.back();
  }

  // Fonction pour naviguer vers la page de facture
  const navigateToInvoice = (invoiceId: string) => {
    router.push(`/dashboard/invoice/${invoiceId}`);
  }

  if(!client) return <div>Not found</div>

  return (
    <div>
      <div onClick={handlePushLeft} className="flex gap-2 bg-white w-full p-2 mb-2 rounded-xl cursor-pointer">
        <FaAngleLeft className="w-8 h-8" />
        <h3 className="text-xl font-light">
          Santu Pro
        </h3>
      </div>
      <div className="w-full flex gap-4">
        <div className="w-full flex flex-col gap-2 bg-white p-4 rounded-xl">
          <div className="w-full flex justify-between">
            <div className="flex gap-2">
              {client?.logo && (
                <img
                  src="https://santupro.fr/wp-content/uploads/2024/01/cropped-ADVERCO-1-png.png"
                  className="w-32 h-20 mx-auto"
                />
              )}
              <div className="flex flex-col gap-1">
                <h3 className="text-md font-semibold">
                {client.company && client.company?.length > 0 ? client.company : `${client.firstName} ${client.lastName}`}
                </h3>
                <p className="text-sm text-black">
                  {client.address}
                </p>
                <p className="text-sm text-black">
                 {client.phone}
                </p>
                <p className="text-sm text-black">
                  {client.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end gap-6">
              <div className="flex gap-4">
                <Badge type="gray" text={`${invoices.length} Factures`} />
              </div>
              <div className="text-right">
                <p className="font-light text-xs">Montant total</p>
                <p className="font-bold text-lg">{formatCurrency(totalAmount)}</p>
              </div>
            </div>
          </div>
          <div className="h-0.5 w-full bg-gray-100"></div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col py-4 px-1">
              <h2 className="text-lg font-semibold">Listes des factures</h2>
              <p className="font-light text-xs text-black">
                {invoices.length} factures enregistrées
              </p>
            </div>
          </div>

          <div className=" shadow-md  mt-2 bg-white h-[38rem] overflow-auto">
              {isLoadingInvoices ? (
                <div className="flex justify-center items-center h-32">Chargement des factures...</div>
              ) : (
                <table className="w-full text-sm text-left text-black sticky">
                  <thead className="text-xs text-white uppercase bg-gray-700 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Nom de la facture
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Montant
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date de création
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.length > 0 ? (
                      invoices.map((invoice:any, index:any) => (
                        <tr onClick={() => navigateToInvoice(invoice._id)} key={invoice._id} className="border-b cursor-pointer hover:bg-gray-200">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-black whitespace-nowrap"
                          >
                            {invoice.name || `Facture #${index + 1}`}
                          </th>
                          <td className="px-6 py-4">{invoice.invoiceNumber || `-`}</td>
                          <td className="px-6 py-4">{formatCurrency(invoice.amount || 0)}</td>
                          <td className="px-6 py-4">
                            {/* {invoice.createdAt ? formatDate(new Date(invoice.createdAt)) : '-'} */}
                          </td>
                          <td className="px-6 py-4 flex">
                            <Badge 
                              type={invoice.status === 'paid' ? 'green' : invoice.status === 'pending' ? 'yellow' : 'red'} 
                              text={invoice.status === 'paid' ? 'Payée' : invoice.status === 'pending' ? 'En attente' : 'En retard'} 
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center">
                          Aucune facture trouvée
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default SingleClient;