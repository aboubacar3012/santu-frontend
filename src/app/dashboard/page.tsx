"use client";
import { useEffect, useState } from "react";
import StatCard from "@/src/components/StatCard";
import { IoMdAdd } from "react-icons/io";
import Badge from "@/src/components/Badge";
import { useRouter, useSearchParams } from "next/navigation";
import InvoiceForm from "../../components/invoice/InvoiceForm";
import { getDashboard } from "@/src/services/invoice";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { Invoice } from "@/src/types";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { GiMoneyStack } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";
import { formatCurrency } from "@/src/libs/formatCurrency";


const DashboardPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<any | null>(null);
  const [selectedPaymentFilterBtn, setSelectPaymentFilterBtn] = useState<"all" | "paid" | "unpaid" | "cancelled">("all");
  const [selectedDateFilterBtn, setSelectedDateFilterBtn] = useState<"all" | "today" | "thisWeek" | "thisMonth">("all");
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useSelector((state: RootState) => state.auth);
  
  // Vérifier si le formulaire de facture doit être affiché
  const showInvoiceForm = searchParams.get('addInvoice') === 'true';

  const fetchData = async () => {
    getDashboard(auth.loggedAccountInfos?._id!, auth.token!).then((data) => {
      if (data.success) {
        setDashboardData(data.dashboardData);
        setLoading(false);
      } else if (!data.success) {
        setError("Une erreur s'est produite lors de la récupération de l'utilisateur");
        setLoading(false);
      }
    }).catch((error) => {
      setError("Une erreur s'est produite lors de la récupération de l'utilisateur");
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchData();
  }, [showInvoiceForm])

  const getSelectedPaymentFilterBtn = (btn: "all" | "paid" | "unpaid" | "cancelled") => {
    if (selectedPaymentFilterBtn === btn) {
      return "bg-gray-700 text-white border";
    }
    return "hover:bg-gray-700 hover:text-white border border-gray-300 text-black"
  }

  const getSelectedDateFilterBtn = (btn: "all" | "today" | "thisWeek" | "thisMonth") => {
    if (selectedDateFilterBtn === btn) {
      return "bg-blue-700 text-white border";
    }
    return "hover:bg-blue-700 hover:text-white border border-blue-300 text-black"
  }

  // Fonction pour ouvrir le formulaire de facture
  const openInvoiceForm = () => {
    router.push('/dashboard?addInvoice=true');
  }

  // Fonction pour fermer le formulaire de facture
  const closeInvoiceForm = () => {
    router.push('/dashboard');
  }

  const handleOpenInvoice = (invoiceId: string) => {
    router.push(`/dashboard/invoice/${invoiceId}`)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!dashboardData) {
    return <div>Dashboard data not found</div>
  }

  return (
    <div>
      <InvoiceForm isOpen={showInvoiceForm} isEdit={false} onClose={closeInvoiceForm} />
      <div className="relative flex flex-col text-black bg-white shadow-md w-full rounded-xl bg-clip-border">
        <div
          className="relative grid mx-4 mb-3 overflow-hidden text-white shadow-lg h-16 place-items-center rounded-xl bg-gradient-to-tr from-my-raspberry to-my-eggplant bg-clip-border shadow-my-raspberry-900/20">
          <h3 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-white">
            Santu Pro - Tableau de bord
          </h3>
        </div>
      </div>
      <h2 className="text-lg font-bold text-black my-4 mt-8 text-center">
        Statistiques générales de l&apos;entreprise pour le mois de {new Date().toLocaleString('default', { month: 'long' })}
      </h2>
      <div className="grid grid-cols-4 gap-4 py-2">
        <StatCard title="Aujourd'hui" value={`${formatCurrency(dashboardData.totalToday)}`} unit="Total vendu" icon={<GiMoneyStack className="w-8 h-8" />} />
        <StatCard title="Chiffres d'affaire" value={`${formatCurrency(dashboardData.total)}`} unit="Toute les factures" icon={<GiMoneyStack className="w-8 h-8" />} />
        <StatCard title="Nombre de clients" value={formatCurrency(dashboardData.clientsCount)} unit="clients" icon={<FaUserFriends className="w-8 h-8" />} />
        <StatCard title="Nombre de factures" value={formatCurrency(dashboardData.invoicesCount)} unit="factures" icon={<LiaFileInvoiceDollarSolid className="w-8 h-8" />} />
      </div>
      <div className="flex justify-end items-center">
        {/* <div className="flex gap-1">
          <button onClick={() => setSelectedDateFilterBtn("all")} className={`font-bold text-center transition-all text-xs py-4 px-3 rounded-lg ${getSelectedDateFilterBtn("all")}`}>
            Tous
          </button>
          <button onClick={() => setSelectedDateFilterBtn("today")} className={`font-bold text-center transition-all text-xs py-4 px-3 rounded-lg ${getSelectedDateFilterBtn("today")}`}>
            Aujourd&apos;hui
          </button>
          <button onClick={() => setSelectedDateFilterBtn("thisWeek")} className={`font-bold text-center transition-all text-xs py-4 px-3 rounded-lg ${getSelectedDateFilterBtn("thisWeek")}`}>
            Cette Semaine
          </button>
          <button onClick={() => setSelectedDateFilterBtn("thisMonth")} className={`font-bold text-center transition-all text-xs py-4 px-3 rounded-lg ${getSelectedDateFilterBtn("thisMonth")}`}>
            Ce Mois
          </button>
        </div>
        <div className="flex gap-1">
          <button onClick={() => setSelectPaymentFilterBtn("all")} className={`font-bold text-center transition-all text-xs py-4 px-3 rounded-lg ${getSelectedPaymentFilterBtn("all")}`}>
            Tous
          </button>
          <button onClick={() => setSelectPaymentFilterBtn("unpaid")} className={`font-bold text-center transition-all text-xs py-4 px-3 rounded-lg ${getSelectedPaymentFilterBtn("unpaid")}`}>
            Brouillons
          </button>
          <button onClick={() => setSelectPaymentFilterBtn("paid")} className={`font-bold text-center transition-all text-xs py-4 px-3 rounded-lg ${getSelectedPaymentFilterBtn("paid")}`}>
            Payées
          </button>
          <button onClick={() => setSelectPaymentFilterBtn("cancelled")} className={`font-bold text-center transition-all text-xs py-4 px-3 rounded-lg ${getSelectedPaymentFilterBtn("cancelled")}`}>
            Annulées
          </button>
        </div> */}
        <button onClick={openInvoiceForm} className=" mt-4 select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-2 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-1">
          <IoMdAdd className="w-6 h-6" />
          Créer une facture
        </button>
      </div>


      {/* Invoices list */}
      <div className="relative overflow-x-auto shadow-md rounded-lg mt-4 bg-white ">
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
            {
              dashboardData.invoices.map((invoice: Partial<Invoice>, index: number) => (
                <tr onClick={() => handleOpenInvoice(invoice._id!)} key={index} className="border-b cursor-pointer hover:bg-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    {invoice.name}
                  </th>
                  <td className="px-6 py-4">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-6 py-4">
                    {invoice.amount} GNF
                  </td>
                  <td className="px-6 py-4">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 flex">
                    {
                      invoice.status === "DRAFT" && (
                        <Badge type="gray" text="Brouillon" />
                      )
                    }
                    {
                      invoice.status === "SENT" && (
                        <Badge type="blue" text="Envoyée" />
                      )
                    }
                    {
                      invoice.status === "PAID" && (
                        <Badge type="green" text="Déjà payée" />
                      )
                    }
                    {
                      invoice.status === "CANCELLED" && (
                        <Badge type="red" text="Annulée" />
                      )
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardPage;