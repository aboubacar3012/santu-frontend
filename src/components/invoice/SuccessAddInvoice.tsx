import Link from "next/link";

type SuccessAddInvoiceProps = {
  onClick: () => void;
};

const SuccessAddInvoice = ({ onClick }: SuccessAddInvoiceProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h-min py-8 px-2 gap-2 flex flex-col items-center text-gray-700 bg-gray-100  rounded-lg m-2">
        <img src="/animated/animatedCheck.gif" alt="registration success" className="w-32 mx-auto" />
        <p className="text-lg font-semibold">
          Facture créée avec succès.
        </p>
        <p className="text-gray-800 md:w-4/5 text-center">
          Pour terminer la creation de la facture, veillez appuyer sur le bouton ci-dessous.
        </p>
        <button
          type="button"
          onClick={onClick}
          className="mx-6 mt-4 w-min text-nowrap px-6 font-semibold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Générer la facture
        </button>
      </div>
    </div>
  );
}

export default SuccessAddInvoice;