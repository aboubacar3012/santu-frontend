"use client"
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { useEffect, useState } from "react";
import { Partner } from "@/src/types";
import StatCard from "@/src/components/StatCard";
import { IoMdAdd } from "react-icons/io";
import Badge from "@/src/components/Badge";
import { useRouter } from "next/navigation";

const DashboardPage = ({ params }: { params: { partnerId: string } }) => {
  const [partnerData, setPartnerData] = useState<Partner>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState<"all" | "paid" | "unpaid" | "cancelled">("all");
  const router = useRouter();
  // const auth = useSelector((state: RootState) => state.auth);
  // const loggedUser = auth.loggedUserInfos;
  // const partner = loggedUser && loggedUser.partnerId;

  

  useEffect(() => {

  }, [])

  const getSelectedBtnStyle = (btn: "all" | "paid" | "unpaid" | "cancelled") => {
    if (selectedBtn === btn) {
      return "bg-gray-700 text-white border";
    }
    return "hover:bg-gray-700 hover:text-white border border-gray-300 text-black"
  }

  const handleOpenInvoice = () => {
    router.push(`/dashboard/invoice/${12345}`)
  }

  // if (loading) {
  //   return <div>Loading...</div>
  // }

  // if (!partnerData) {
  //   return <div>Partner not found</div>
  // }

  return (
    <div className="w-3/4 h-[96vh] overflow-y-auto flex flex-col">
      {/* <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border">
        <div
          className="relative grid mx-4 mb-3 -mt-6 overflow-hidden text-white shadow-lg h-16 place-items-center rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
          <h3 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-white">
            Banima group SARL
          </h3>
        </div>
      </div> */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Montant" value={'20 000 GNF'} unit="Aujourd'hui" />
        <StatCard title="Montant" value={'20 000 GNF'} unit="Aujourd'hui" />
        <StatCard title="Montant" value={'20 000 GNF'} unit="Aujourd'hui" />
        <StatCard title="Montant" value={'20 000 GNF'} unit="Aujourd'hui" />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <button onClick={() => setSelectedBtn("all")} className={`font-bold text-center transition-all text-xs py-4 px-3 rounded-lg ${getSelectedBtnStyle("all")}`}>
            Tous
          </button>
          <button onClick={() => setSelectedBtn("paid")} className={`font-bold text-center transition-all text-xs py-4 px-3 rounded-lg ${getSelectedBtnStyle("paid")}`}>
            Payées
          </button>
          <button onClick={() => setSelectedBtn("unpaid")} className={`font-bold text-center transition-all text-xs py-4 px-3 rounded-lg ${getSelectedBtnStyle("unpaid")}`}>
            Non payées
          </button>
          <button onClick={() => setSelectedBtn("cancelled")} className={`font-bold text-center transition-all text-xs py-4 px-3 rounded-lg ${getSelectedBtnStyle("cancelled")}`}>
            Annulées
          </button>
        </div>
        <button onClick={() => { }} className=" mt-4 select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-2 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-1">
          <IoMdAdd className="w-6 h-6" />
          Créer une facture
        </button>
      </div>


      {/* Invoices list */}
      <div className="relative overflow-x-auto shadow-md rounded-lg mt-4 bg-white ">
        <table className="w-full text-sm text-left text-gray-500 sticky">
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
              [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15].map((invoice, index) => (
                <tr onClick={handleOpenInvoice} key={index} className="border-b cursor-pointer hover:bg-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Facture, MacBook Pro 16&#34;
                  </th>
                  <td className="px-6 py-4">INV-2024-005</td>
                  <td className="px-6 py-4">$2999</td>
                  <td className="px-6 py-4">
                    08/12/2021
                  </td>
                  <td className="px-6 py-4 flex">
                    <Badge type="green" text="Payée" />
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