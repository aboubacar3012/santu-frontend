"use client"
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { useEffect, useState } from "react";
import { Client } from "@/src/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ProfilePage = ({ params }: { params: { clientId: string } }) => {
  const [logoUrl, setLogoUrl] = useState("");
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
    // const fetchData = async () => {
    //   getClientById(params.clientId).then((data) => {
    //     if (data.success) {
    //       setClientData(data?.client);
    //       setError(null);
    //       setLoading(false);
    //     } else if (!data.success) {
    //       setError("Une erreur s'est produite lors de la récupération des stagiaires");
    //       setLoading(false);
    //     }
    //   }).catch((error) => {
    //     setError("Une erreur s'est produite lors de la récupération des stagiaires");
    //     setLoading(false);
    //   });
    // }
    // fetchData();
  }, [])

  // if (loading) {
  //   return <div>Loading...</div>
  // }

  // if (!clientData) {
  //   return <div>Client not found</div>
  // }

  return (
    <div className="w-3/4 m-auto h-screen py-4 overflow-y-hidden">
      <h1 className="text-2xl font-semibold text-gray-900">
        Mon compte
      </h1>
      <p className="text-gray-700 text-lg">
        Ici, vous pouvez gérer vos informations personnelles
      </p>
      <div className="h-0.5 my-8 w-full bg-gray-200"></div>
      {/* Client profile */}
      <div className="w-min px-4 my-2 py-2 gap-2 flex flex-col justify-end text-gray-700 bg-white  rounded-lg ">
        <p className="text-nowrap text-lg font-normal text-gray-900">
          Inscrit depuis le <span className="font-semibold">13 septembre 2024</span>
        </p>
      </div>
      <div className="w-min px-4 my-2 py-2 gap-2 flex flex-col justify-end text-gray-700 bg-white  rounded-lg ">
        <p className="text-nowrap text-lg font-normal text-gray-900">
          Dernière mise à jour le <span className="font-semibold">13 septembre 2024</span>
        </p>
      </div>
      <div className="flex gap-2 py-2">
        <div className="w-1/2 h-min py-2 gap-4  flex flex-col text-gray-700 bg-white  rounded-lg ">
        <div className="flex items-center">
              <div className="w-full flex flex-col gap-1 p-6">
                <div className="relative h-11 w-full min-w-[200px]">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                    Logo URL
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    // required={isEdit ? false : true}
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
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez l'url du logo" />
                </div>
              </div>
              {
                logoUrl && (
                  <div className="w-max border border-gray-300 rounded-lg p-2.5">
                    <img src={logoUrl} alt="logo" className="w-32 h-22" />
                  </div>
                )
              }
            </div>

          <div className="flex flex-col gap-1 px-6">
            <div className="relative w-full min-w-[200px]">
              <label htmlFor="clientName" className="block mb-2 text-sm font-medium text-gray-900">
                Nom de l&apos;entreprise/client
              </label>
              <input value={clientName} onChange={(e) => setClientName(e.target.value)} type="text" id="clientName" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le titre du client" required />
            </div>
          </div>

          <div className="w-full flex gap-1 px-6">
            <div className="w-full flex flex-col">
              <div className="w-full min-w-[200px]">
                <label htmlFor="clientFirstName" className="block mb-2 text-sm font-medium text-gray-900">
                  Prénom
                </label>
                <input value={clientFirstName} onChange={(e) => setClientFirstName(e.target.value)} type="text" id="clientFirstName" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le prénom" required />
              </div>
            </div>
            <div className="w-full flex flex-col">
              <div className="w-full min-w-[200px]">
                <label htmlFor="clientLastName" className="block mb-2 text-sm font-medium text-gray-900">
                  Nom
                </label>
                <input value={clientLastName} onChange={(e) => setClientLastName(e.target.value)} type="text" id="clientLastName" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le nom" required />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 px-6">
            <div className=" w-full min-w-[200px]">
              <label htmlFor="clientPhone" className="block mb-2 text-sm font-medium text-gray-900">
                Téléphone
              </label>
              <input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} type="text" id="clientPhone" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le titre du client" required />
            </div>
          </div>

          <div className="flex flex-col gap-1 px-6">
            <div className=" w-full min-w-[200px]">
              <label htmlFor="clientEmail" className="block mb-2 text-sm font-medium text-gray-900">
                E-mail
              </label>
              <input value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} type="email" id="clientEmail" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez l'adresse email du client" required />
            </div>
          </div>

          <div className="flex flex-col gap-1 px-6">
            <div className=" w-full min-w-[200px]">
              <label htmlFor="clientAdresse" className="block mb-2 text-sm font-medium text-gray-900">
                Adresse
              </label>
              <input value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} type="text" id="clientAdresse" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le titre du client" required />
            </div>
          </div>

          <button onClick={() => { }}
            className="mx-6 w-min px-6 font-semibold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>

        <div className="w-1/2 h-min py-2 gap-2 flex flex-col text-gray-700 bg-white  rounded-lg ">
          <div className="flex flex-col gap-1 px-6">
            <div className=" w-full min-w-[200px]">
              <label htmlFor="clientEmail" className="block mb-2 text-sm font-medium text-gray-900">
                E-mail
              </label>
              <input value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} type="email" id="clientEmail" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez l'adresse email du client" required />
            </div>
          </div>
          <div className="flex flex-col gap-1 px-6">
            <div className=" w-full min-w-[200px]">
              <label htmlFor="clientAdresse" className="block mb-2 text-sm font-medium text-gray-900">
                Mot de passe actuel
              </label>
              <input value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} type="text" id="clientAdresse" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le titre du client" required />
            </div>
          </div>
          <div className="flex flex-col gap-1 px-6">
            <div className=" w-full min-w-[200px]">
              <label htmlFor="clientAdresse" className="block mb-2 text-sm font-medium text-gray-900">
                Nouveau mot de passe
              </label>
              <input value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} type="text" id="clientAdresse" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le titre du client" required />
            </div>
          </div>
          <div className="flex flex-col gap-1 px-6">
            <div className=" w-full min-w-[200px]">
              <label htmlFor="clientAdresse" className="block mb-2 text-sm font-medium text-gray-900">
                Confirmer le mot de passe
              </label>
              <input value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} type="text" id="clientAdresse" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Entrez le titre du client" required />
            </div>
          </div>
          <button onClick={() => { }}
            className="mx-6 w-min px-6 font-semibold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;