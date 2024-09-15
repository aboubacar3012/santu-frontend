"use client";
import Badge from "@/src/components/Badge";
import { useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";

const SingleInvoicePage = () => {
  const router = useRouter();

  const handlePushLeft = () => {
    router.back();
  }


  return (
    <div className="w-4/6  h-[96vh] overflow-hidden flex flex-col justify-start">
      <div onClick={handlePushLeft} className="flex gap-2 bg-white w-full p-2 rounded-xl cursor-pointer">
        <FaAngleLeft className="w-8 h-8" />
        <h3 className="text-xl font-light">
          Détails de la facture
        </h3>
      </div>
      <div className="w-5/6 pr-4 flex justify-between items-center">
      <div className="flex flex-col py-4 px-1">
        <h2 className="text-lg font-semibold">Facture n° #INV-2020-05-0001</h2>
        <p className="font-light text-xs text-gray-500">
          Payé le 27 Juin 2023
        </p>
      </div>
      <div className="bg-white rounded-xl w-60 p-2 flex flex-col">
            <button type="button" className="text-xs hover:text-white border border-green-700 hover:bg-green-800 text-green-800  font-medium rounded-lg text-sm px-3 py-2.5">
              Marqué comme payé
            </button>
          </div>
      </div>
      <div className="flex gap-4 h-dvh">
        <div className="w-5/6  flex flex-col gap-2 bg-white p-4 rounded-xl">
          <div className="w-full flex justify-between">
            <div className="flex gap-2">
              <img
                src="https://santupro.fr/wp-content/uploads/2024/01/cropped-ADVERCO-1-png.png"
                className="w-24 h-20 mx-auto"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">Banima Group SARL</h3>
                <p className="text-xs text-gray-500">
                  123 rue de la paix, Conakry
                </p>
                {/* Tel */}
                <p className="text-xs text-gray-500">
                  +224 666 666 666
                </p>
                {/* Email */}
                <p className="text-xs text-gray-500">
                  contact@gmail.com
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end gap-6">
              <div className="flex gap-4">
              <Badge type="green" text="Facture déjà payé" />
              <Badge type="gray" text="#INV-2024-05-0001" />
              </div>
              <div className="text-right">
                <p className="font-light text-xs">Montant total</p>
                <p className="font-bold text-lg">3 030,00€</p>
              </div>
            </div>
          </div>
          <div className="flex gap-12 p-4 border my-2 rounded-lg">
            <div className="w-4/12 flex flex-col gap-2 p-6 bg-gray-100 rounded-2xl">
              <div>
                <h2 className="text-xs font-light">Date de facture</h2>
                <p className="text-xs font-semibold text-gray-700">
                  03/05/2024
                </p>
              </div>
              <div>
                <h2 className="text-xs font-light">Date de livraison</h2>
                <p className="text-xs font-semibold text-gray-700">
                  03/05/2024
                </p>
              </div>
              <div>
                <h2 className="text-xs font-light">Conditions de règlement</h2>
                <p className="text-xs font-semibold text-gray-700">
                  Immédiat
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
                <h3 className="text-lg font-semibold">Banima Group SARL</h3>
                <p className="text-sm text-gray-500">
                  123 rue de la paix, Conakry
                </p>
                {/* Tel */}
                <p className="text-sm text-gray-500">
                  +224 666 666 666
                </p>
                {/* Email */}
                <p className="text-sm text-gray-500">
                  contact@gmail.com
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
                    Prix unité HT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TVA
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Montant TTC
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {
                  [1, 2, 3, 4, 6, 6].map((invoice, index) => (
                    <tr onClick={() => { }} key={index} className="border-b cursor-pointer hover:bg-gray-200">
                      <th
                        scope="row"
                        className="text-xs px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="text-xs px-6 py-4">Facture, MacBook Pro 16&#34;</td>
                      <td className="text-xs px-6 py-4">2</td>
                      <td className="text-xs px-6 py-4">
                        $2999
                      </td>
                      <td className="text-xs px-6 py-4">
                        20%
                      </td>
                      <td className="text-xs px-6 py-4">
                        $3999
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
                <p className="text-xs text-gray-500">3 030,00€</p>
              </div>
              <div className="w-full flex justify-between">
                <h3 className="text-sm font-semibold">TVA</h3>
                <p className="text-xs text-gray-500">0%</p>
              </div>
              <div className="w-full flex justify-between">
                <h3 className="text-sm font-semibold">Réduction</h3>
                <p className="text-xs text-gray-500">3 636,00€</p>
              </div>
              <hr className="w-full border-gray-50" />
              <div className="w-full flex justify-between">
                <h3 className="text-sm font-semibold">Total TTC</h3>
                <p className="text-xs text-gray-500">3 636,00€</p>
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