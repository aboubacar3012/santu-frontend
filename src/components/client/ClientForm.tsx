/* eslint-disable @next/next/no-img-element */
import { RootState } from "@/src/redux/store";
import { createClient } from "@/src/services/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type ClientFormProps = {
  isEdit: boolean;
  isOpen: boolean;
  onClose: () => void;
};
const ClientForm = (
  { isOpen, onClose, isEdit }: ClientFormProps
) => {
  const [clientName, setClientName] = useState<string>("");
  const [clientFirstName, setClientFirstName] = useState<string>("");
  const [clientLastName, setClientLastName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientAddress, setClientAddress] = useState<string>("");
  const [clientType, setClientType] = useState<string | "particular" | "company">("particular");

  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState("");

  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isEdit) {
      // const partner = auth.partnerToEdit;
      // if (partner) {
      //   setLogoUrl(partner.logo || "");
      //   setClientName(partner.name || "");
      //   setClientDescription(partner.description || "");
      //   setClientSiret(partner.siret || "");
      //   setClientCapital(partner.capital || "");
      //   setClientEmail(partner.email || "");
      //   setClientPhone(partner.phone || "");
      //   setClientAddress(partner.address || "");
      //   setClientPostalCode(partner.postalCode || "");
      //   setClientCity(partner.city || "");
      // }
    }

    return () => {
      // setLogoUrl("");
      // setClientName("");
      // setClientDescription("");
      // setClientSiret("");
      // setClientCapital("");
      // setClientEmail("");
      // setClientPhone("");
      // setClientAddress("");
      // setClientPostalCode("");
      // setClientCity("");
      // setErrorMessage("");
    }
  }, [auth, isEdit, isOpen]);

  const deleteClient = (id: string) => {
    if (window.confirm("Etes vous sure de vouloir ")) {
      console.log("Deleted")
    }
  }

  console.log("partner", auth.partnerToEdit)

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (isEdit) return handleEdit();
    if (!clientName && (!clientFirstName || !clientLastName)) {
      return toast.error("Veuillez renseigner le nom du client");
    }
    if (!clientPhone || !clientEmail || !clientAddress) {
      return toast.error("Veuillez renseigner tous les champs");
    }

    let clientToAdd = {};
    if (clientType === "company") {
      clientToAdd = {
        company: clientName,
        phone: clientPhone,
        email: clientEmail,
        address: clientAddress,
        type: clientType
      }
    } else {
      clientToAdd = {
        firstName: clientFirstName,
        lastName: clientLastName,
        phone: clientPhone,
        email: clientEmail,
        address: clientAddress,
        type: clientType
      }
    }

    createClient(clientToAdd, "token").then((response) => {
      if (response.success) {
        toast.success("Client créé avec succès");
        onClose();
      } else if (!response.success) {
        setErrorMessage(response.message);
      } else {
        setErrorMessage("Erreur lors de la création du client");
      }
    });
  }

  const handleEdit = () => {
    // const partner = auth.partnerToEdit;
    // if (!partner) {
    //   return toast.error("Erreur lors de la récupération de l'utilisateur à modifier");
    // }
    // // Verifier que par exemple partner.logoUrl est différent de logoUrl
    // let newClient = {}
    // if (partner.logo !== logoUrl) {
    //   newClient = { ...newClient, logo: logoUrl }
    // }

    // if (partner.name !== partnerName) {
    //   newClient = { ...newClient, name: partnerName }
    // }

    // if (partner.description !== partnerDescription) {
    //   newClient = { ...newClient, description: partnerDescription }
    // }

    // if (partner.siret !== partnerSiret) {
    //   newClient = { ...newClient, siret: partnerSiret }
    // }

    // if (partner.capital !== partnerCapital) {
    //   newClient = { ...newClient, capital: partnerCapital }
    // }

    // if (partner.email !== partnerEmail) {
    //   newClient = { ...newClient, email: partnerEmail }
    // }

    // if (partner.phone !== partnerPhone) {
    //   newClient = { ...newClient, phone: partnerPhone }
    // }

    // if (partner.address !== partnerAddress) {
    //   newClient = { ...newClient, address: partnerAddress }
    // }

    // if (partner.postalCode !== partnerPostalCode) {
    //   newClient = { ...newClient, postalCode: partnerPostalCode }
    // }

    // if (partner.city !== partnerCity) {
    //   newClient = { ...newClient, city: partnerCity }
    // }


    // if (Object.keys(newClient).length === 0) {
    //   return toast.error("Aucune modification n'a été effectuée");
    // }

    // updateClient(partner._id, newClient, auth.token).then((response) => {
    //   if (response.success) {
    //     toast.success("Utilisateur modifié avec succès");
    //     onClose();
    //   } else {
    //     toast.error("Erreur lors de la modification de l'utilisateur");
    //   }
    // }
    // ).catch((error) => {
    //   toast.error("Erreur lors de la modification de l'utilisateur");
    // });
  }

  if (!isOpen) return null;
  return (
    <>
      <div
        className=" fixed inset-0 z-[999] grid place-items-center bg-black bg-opacity-60  backdrop-blur-sm transition-opacity duration-300"
      >
        <div
          className="relative m-4 w-2/6 overflow-auto  rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
        >
          <div className="w-full flex justify-center items-center px-6 py-4">
            <h1 className="text-2xl font-semibold">
              Ajouter un client
            </h1>
          </div>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-1 p-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <label htmlFor="clientName" className="block mb-2 text-sm font-medium text-gray-900">
                  Choisir le type de client
                </label>
                <select value={clientType} onChange={(e) => setClientType(e.target.value)} id="status" className=" border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ">
                  <option value="particular">
                    Particulier
                  </option>
                  <option value="company">
                    Entreprise
                  </option>
                </select>
              </div>
            </div>
            {
              clientType === "company" && (
                <div className="flex flex-col gap-1 p-6">
                  <div className="relative h-11 w-full min-w-[200px]">
                    <label htmlFor="clientName" className="block mb-2 text-sm font-medium text-gray-900">
                      Nom de l&apos;entreprise/client
                    </label>
                    <input value={clientName} onChange={(e) => setClientName(e.target.value)} type="text" id="clientName" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le titre du client" required />
                  </div>
                </div>
              )
            }
            {
              clientType === "particular" && (
                <div className="w-full flex gap-1 p-6">
                  <div className="w-full flex flex-col">
                    <div className="relative h-11 w-full min-w-[200px]">
                      <label htmlFor="clientFirstName" className="block mb-2 text-sm font-medium text-gray-900">
                        Prénom
                      </label>
                      <input value={clientFirstName} onChange={(e) => setClientFirstName(e.target.value)} type="text" id="clientFirstName" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le prénom" required />
                    </div>
                  </div>
                  <div className="w-full flex flex-col">
                    <div className="relative h-11 w-full min-w-[200px]">
                      <label htmlFor="clientLastName" className="block mb-2 text-sm font-medium text-gray-900">
                        Nom
                      </label>
                      <input value={clientLastName} onChange={(e) => setClientLastName(e.target.value)} type="text" id="clientLastName" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le nom" required />
                    </div>
                  </div>
                </div>
              )
            }
            <div className="flex flex-col gap-1 p-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <label htmlFor="clientPhone" className="block mb-2 text-sm font-medium text-gray-900">
                  Téléphone
                </label>
                <input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} type="text" id="clientPhone" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le titre du client" required />
              </div>
            </div>
            <div className="flex flex-col gap-1 p-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <label htmlFor="clientEmail" className="block mb-2 text-sm font-medium text-gray-900">
                  E-mail
                </label>
                <input value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} type="email" id="clientEmail" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez l'adresse email du client" required />
              </div>
            </div>
            <div className="flex flex-col gap-1 p-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <label htmlFor="clientAdresse" className="block mb-2 text-sm font-medium text-gray-900">
                  Adresse
                </label>
                <input value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} type="text" id="clientAdresse" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le titre du client" required />
              </div>
            </div>
            <div className="p-2">
              {errorMessage && <div
                className="px-2 relative block w-full p-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
                {errorMessage}
              </div>}
            </div>
            <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
              <button
                onClick={onClose}
                className="cursor-pointer px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Annuler
              </button>
              <button
                // type="submit"
                className="cursor-pointer middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>

  );
}

export default ClientForm;