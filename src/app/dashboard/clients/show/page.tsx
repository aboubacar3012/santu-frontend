"use client";
import Badge from "@/src/components/Badge";
import { useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";

const SingleClient = () => {
  const router = useRouter();

  const handlePushLeft = () => {
    router.back();
  }


  return (
    <div className="w-3/5  h-[96vh] overflow-hidden flex flex-col justify-start gap-4">
      <div onClick={handlePushLeft} className="flex gap-2 bg-white w-full p-2 rounded-xl cursor-pointer">
        <FaAngleLeft className="w-8 h-8" />
        <h3 className="text-xl font-light">
          Adverco SARL
        </h3>
      </div>
      <div className="w-full flex gap-4 h-dvh">
        <div className="w-full flex flex-col gap-2 bg-white p-4 rounded-xl">
          <div className="w-full flex justify-between">
            <div className="flex gap-2">
              <img
                src="https://adverco.fr/wp-content/uploads/2024/01/cropped-ADVERCO-1-png.png"
                className="w-32 h-20 mx-auto"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-md font-semibold">Banima Group SARL</h3>
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
            <div className="flex flex-col justify-between items-end gap-6">
              <div className="flex gap-4">
                <Badge type="gray" text="32 Factures" />
              </div>
              <div className="text-right">
                <p className="font-light text-xs">Montant total</p>
                <p className="font-bold text-lg">30 000 000 GNF</p>
              </div>
            </div>
          </div>
          {/* divider */}
          <div className="h-0.5 w-full bg-gray-100"></div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col py-4 px-1">
              <h2 className="text-lg font-semibold">Listes des clients enregistrées</h2>
              <p className="font-light text-xs text-gray-500">
                27 clients enregistrés
              </p>
            </div>
          </div>

          <div className="overflow-auto flex flex-col gap-2 bg-white py-4">
            <div className=" shadow-md  mt-2 bg-white ">
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
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((invoice, index) => (
                      <tr onClick={() => { }} key={index} className="border-b cursor-pointer hover:bg-gray-200">
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
        </div>
      </div>
    </div>
  );
}

export default SingleClient;