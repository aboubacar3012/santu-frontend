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
    <div className="w-3/4  m-auto h-[92vh] overflow-y-auto flex flex-col justify-start">
      <div onClick={handlePushLeft} className="flex gap-2 bg-white w-full p-2 rounded-xl cursor-pointer">
        <FaAngleLeft className="w-8 h-8" />
        <h3 className=" text-2xl font-light">
          Détails de la facture
        </h3>
      </div>
      <div className="flex flex-col gap-2 py-8 px-1">
        <h2 className="text-xl font-semibold">Facture n° #INV-2020-05-0001</h2>
        <p className="font-light text-sm text-gray-500">
          Payé le 27 Juin 2023
        </p>
      </div>
      <div className="w-2/3 flex flex-col gap-2 bg-white p-4 rounded-xl">
        <div className="w-full flex justify-between">
          <div className="flex gap-2">
            <img
              src="https://adverco.fr/wp-content/uploads/2024/01/cropped-ADVERCO-1-png.png"
              className="w-32 mx-auto"
            />
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
          <div className="flex flex-col justify-between items-end gap-6">
            <Badge type="gray" text="#INV-2024-05-0001" />
            <div className="text-right">
              <p className="font-light text-sm">Montant total</p>
              <p className="font-bold text-xl">3 030,00€</p>
            </div>
          </div>
        </div>
        <div className="flex gap-12 p-4 border my-4 rounded-lg">
          <div className="w-4/12 flex flex-col gap-2 p-6 bg-gray-100 rounded-2xl">
            <div>
              <h2 className="text-xs font-light">Date de facture</h2>
              <p className="text-sm font-semibold text-gray-700">
                03/05/2024
              </p>
            </div>
            <div>
              <h2 className="text-xs font-light">Date de livraison</h2>
              <p className="text-sm font-semibold text-gray-700">
                03/05/2024
              </p>
            </div>
            <div>
              <h2 className="text-xs font-light">Conditions de règlement</h2>
              <p className="text-sm font-semibold text-gray-700">
              Immédiat
              </p>
            </div>
            <div>
              <h2 className="text-xs font-light">Mode de paiement</h2>
              <p className="text-sm font-semibold text-gray-700">
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
        <div></div>
      </div>
    </div>
  );
}

export default SingleInvoicePage;

// Numero de la facture
// Date de la facture
// Conditions de règlement (Immédiat)
// Mode de paiement (Espèces)