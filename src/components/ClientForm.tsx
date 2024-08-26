/* eslint-disable @next/next/no-img-element */
import { RootState } from "@/src/redux/store";
import { createPartner, updatePartner } from "@/src/services/partner";
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
  const [logoUrl, setLogoUrl] = useState("")
  const [partnerName, setPartnerName] = useState("");
  const [partnerDescription, setPartnerDescription] = useState("");
  const [partnerSiret, setPartnerSiret] = useState("");
  const [partnerCapital, setPartnerCapital] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerPhone, setPartnerPhone] = useState("");
  const [partnerAddress, setPartnerAddress] = useState("");
  const [partnerPostalCode, setPartnerPostalCode] = useState("");
  const [partnerCity, setPartnerCity] = useState("");
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState("");

  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isEdit) {
      // const partner = auth.partnerToEdit;
      // if (partner) {
      //   setLogoUrl(partner.logo || "");
      //   setPartnerName(partner.name || "");
      //   setPartnerDescription(partner.description || "");
      //   setPartnerSiret(partner.siret || "");
      //   setPartnerCapital(partner.capital || "");
      //   setPartnerEmail(partner.email || "");
      //   setPartnerPhone(partner.phone || "");
      //   setPartnerAddress(partner.address || "");
      //   setPartnerPostalCode(partner.postalCode || "");
      //   setPartnerCity(partner.city || "");
      // }
    }

    return () => {
      // setLogoUrl("");
      // setPartnerName("");
      // setPartnerDescription("");
      // setPartnerSiret("");
      // setPartnerCapital("");
      // setPartnerEmail("");
      // setPartnerPhone("");
      // setPartnerAddress("");
      // setPartnerPostalCode("");
      // setPartnerCity("");
      // setErrorMessage("");
    }
  }, [auth, isEdit, isOpen]);

  const deletePartner = (id: string) => {
    if (window.confirm("Etes vous sure de vouloir ")) {
      console.log("Deleted")
    }
  }

  console.log("partner", auth.partnerToEdit)

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (isEdit) return handleEdit();
    const partnerToAdd = {
      logo: logoUrl,
      name: partnerName,
      description: partnerDescription,
      siret: partnerSiret,
      capital: partnerCapital,
      email: partnerEmail,
      phone: partnerPhone,
      address: partnerAddress,
      postalCode: partnerPostalCode,
      city: partnerCity
    };

    // createPartner(partnerToAdd, "token").then((response) => {
    //   if (response.success) {
    //     toast.success("Partner créé avec succès");
    //     onClose();
    //   } else if (!response.success) {
    //     setErrorMessage(response.message);
    //   } else {
    //     setErrorMessage("Erreur lors de la création du partenaire");
    //   }
    // });
  }

  const handleEdit = () => {
    // const partner = auth.partnerToEdit;
    // if (!partner) {
    //   return toast.error("Erreur lors de la récupération de l'utilisateur à modifier");
    // }
    // // Verifier que par exemple partner.logoUrl est différent de logoUrl
    // let newPartner = {}
    // if (partner.logo !== logoUrl) {
    //   newPartner = { ...newPartner, logo: logoUrl }
    // }

    // if (partner.name !== partnerName) {
    //   newPartner = { ...newPartner, name: partnerName }
    // }

    // if (partner.description !== partnerDescription) {
    //   newPartner = { ...newPartner, description: partnerDescription }
    // }

    // if (partner.siret !== partnerSiret) {
    //   newPartner = { ...newPartner, siret: partnerSiret }
    // }

    // if (partner.capital !== partnerCapital) {
    //   newPartner = { ...newPartner, capital: partnerCapital }
    // }

    // if (partner.email !== partnerEmail) {
    //   newPartner = { ...newPartner, email: partnerEmail }
    // }

    // if (partner.phone !== partnerPhone) {
    //   newPartner = { ...newPartner, phone: partnerPhone }
    // }

    // if (partner.address !== partnerAddress) {
    //   newPartner = { ...newPartner, address: partnerAddress }
    // }

    // if (partner.postalCode !== partnerPostalCode) {
    //   newPartner = { ...newPartner, postalCode: partnerPostalCode }
    // }

    // if (partner.city !== partnerCity) {
    //   newPartner = { ...newPartner, city: partnerCity }
    // }


    // if (Object.keys(newPartner).length === 0) {
    //   return toast.error("Aucune modification n'a été effectuée");
    // }

    // updatePartner(partner._id, newPartner, auth.token).then((response) => {
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
          className="relative md:m-4 md:w-3/6 w-full h-[100%] md:h-[80%] overflow-auto md:min-w-[30%] md:max-w-[30%] md:rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
        >
          <div className="w-full flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-semibold">
              Ajouter un partenaire
            </h1>
          </div>

         
            {/* LOGO */}
            <div className="flex items-center">
              <div className="w-full flex flex-col gap-1 p-6">
                <div className="relative h-11 w-full min-w-[200px]">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                    Logo URL
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required={isEdit ? false : true}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      // si la taille du fichier est supérieure à 1MB
                      if (file && file.size > 1024 * 1024) {
                        return toast.error("La taille du fichier ne doit pas dépasser 1MB");
                      }
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          setLogoUrl(e.target?.result as string);
                        }
                        reader.readAsDataURL(file);
                      }
                    }}
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez l'url du logo" />
                </div>
              </div>
              {
                logoUrl && (
                  <div className="w-1/4 border border-gray-300 rounded-lg p-2.5">
                    <img src={logoUrl} alt="logo" className="w-30 h-20" />
                  </div>
                )
              }
            </div>
            <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-1 p-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                  Nom du partenaire
                </label>
                <input value={partnerName} onChange={(e) => setPartnerName(e.target.value)} type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le titre du partenaire" required />
              </div>
            </div>
            <div className="flex flex-col gap-1 p-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900">
                  Description
                </label>
                <textarea value={partnerDescription} onChange={(e) => setPartnerDescription(e.target.value)} id="desc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez la description du partenaire" required />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <div className="w-full flex flex-col gap-1 py-6 pl-6">
                <div className="relative h-11 w-full min-w-[200px]">
                  <label htmlFor="siret" className="block mb-2 text-sm font-medium text-gray-900">
                    SIRET/SIREN
                  </label>
                  <input value={partnerSiret} onChange={(e) => setPartnerSiret(e.target.value)} type="text" id="siret" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le siret/siren du partenaire" required />
                </div>
              </div>
              <div className="w-full flex flex-col gap-1 py-6 pr-6">
                <div className="relative h-11 w-full min-w-[200px]">
                  <label htmlFor="capital" className="block mb-2 text-sm font-medium text-gray-900">
                    CAPITAL
                  </label>
                  <input value={partnerCapital} onChange={(e) => setPartnerCapital(e.target.value)} type="text" id="capital" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le capital du partenaire" required />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-full flex flex-col gap-1 py-6 pl-6">
                <div className="relative h-11 w-full min-w-[200px]">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    ADRESSE MAIL
                  </label>
                  <input value={partnerEmail} onChange={(e) => setPartnerEmail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez l'adresse email du partenaire" required />
                </div>
              </div>
              <div className="w-full flex flex-col gap-1 py-6 pr-6">
                <div className="relative h-11 w-full min-w-[200px]">
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                    TELEPHONE
                  </label>
                  <input value={partnerPhone} onChange={(e) => setPartnerPhone(e.target.value)} type="text" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le téléphone du partenaire" required />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 p-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                  ADRESSE
                </label>
                <input value={partnerAddress} onChange={(e) => setPartnerAddress(e.target.value)} type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez l'adresse du partenaire" required />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-full flex flex-col py-6 pl-6">
                <div className="relative h-11 w-full min-w-[200px]">
                  <label htmlFor="postal" className="block mb-2 text-sm font-medium text-gray-900">
                    CODE POSTAL
                  </label>
                  <input value={partnerPostalCode} onChange={(e) => setPartnerPostalCode(e.target.value)} type="text" id="postal" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le code postal" required />
                </div>
              </div>
              <div className="w-full flex flex-col gap-1 py-6 pr-6">
                <div className="relative h-11 w-full min-w-[200px]">
                  <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">
                    VILLE
                  </label>
                  <input value={partnerCity} onChange={(e) => setPartnerCity(e.target.value)} type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez la ville du partenaire" required />
                </div>
              </div>
            </div>
            <div className="px-2">
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
                type="submit"
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