type InvoiceInfoFormProps = {
  invoiceName: string;
  setInvoiceName: (name: string) => void;
  invoiceDate: string;
  setInvoiceDate: (date: string) => void;
  invoiceTva: number;
  setInvoiceTva: (tva: number) => void;
  invoicePaymentMethod: string;
  setInvoicePaymentMethod: (method: string) => void;
  invoicePaymentCondition: string;
  setInvoicePaymentCondition: (condition: string) => void;
  invoiceRemark: string;
  setInvoiceRemark: (remark: string) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;

}

const InvoiceInfoForm = ({
  invoiceName,
  setInvoiceName,
  invoiceDate,
  setInvoiceDate,
  invoiceTva,
  setInvoiceTva,
  invoicePaymentMethod,
  setInvoicePaymentMethod,
  invoicePaymentCondition,
  setInvoicePaymentCondition,
  invoiceRemark,
  setInvoiceRemark,
  errorMessage,
  setErrorMessage
}: InvoiceInfoFormProps) => {
  
  return (
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
        true && (
          <div className="flex flex-col gap-1 px-4 py-2">
            <label htmlFor="status" className="block text-sm font-medium text-gray-900 ">
              Choisir le client
            </label>
            <div className="flex gap-2">
              <select value={1234} onChange={(e) => { }} id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ">
                <option selected value="">
                  Choisir un client
                </option>
                {/* {
                              partnersData.map((partner) => (
                                <option key={partner._id} value={partner._id}>
                                  {partner.name}
                                </option>
                              ))
                            } */}
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
          <label htmlFor="invoiceName" className="block mb-2 text-sm font-medium text-gray-900">Donner un titre a votre facture</label>
          <input value={invoiceName} onChange={(e) => setInvoiceName(e.target.value)} type="text" id="invoiceName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez le nom de la facture" required />
        </div>
      </div>
      <div className="flex flex-col gap-1 px-4 py-2">
        <div className="relative w-full min-w-[200px]">
          <label htmlFor="invoiceDate" className="block mb-2 text-sm font-medium text-gray-900">Date de la facture</label>
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            id="invoiceDate"
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
          <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-900 ">
            Mode de règlement
          </label>
          <select value={invoicePaymentMethod} onChange={(e) => setInvoicePaymentMethod(e.target.value)} id="paymentMode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ">
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
          <select value={invoicePaymentCondition} onChange={(e) => setInvoicePaymentCondition(e.target.value)} id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ">
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
          <input value={invoiceTva} onChange={(e) => setInvoiceTva(Number(e.target.value))} type="number" id="tva" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="TVA" required />
        </div>
      </div>
      {/* Rémarque */}
      <div className="flex flex-col gap-1 px-4 py-2">
        <div className="relative w-full min-w-[200px]">
          <label htmlFor="objective" className="block mb-2 text-sm font-medium text-gray-900">Rémarque</label>
          <textarea value={invoiceRemark} onChange={(e) => setInvoiceRemark(e.target.value)} id="objective" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Entrez la description de la campagne" required />
        </div>
      </div>

      <div className="px-2">
        {errorMessage && <div
          className="px-2 relative block w-full p-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
          {errorMessage}
        </div>}
      </div>
    </>
  );
}

export default InvoiceInfoForm;