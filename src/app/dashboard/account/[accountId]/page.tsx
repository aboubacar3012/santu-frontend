"use client"
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { useEffect, useState } from "react";
import { Account } from "@/src/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getAccountById } from "@/src/services/account";

const ProfilePage = ({ params }: { params: { accountId: string } }) => {
  const [accountData, setAccountData] = useState<Account | null>(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [actualPassword, setActualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState("");

  const auth = useSelector((state: RootState) => state.auth);

  const fetchData = async () => {
    getAccountById(params.accountId, auth.token!).then((data) => {
      if (data.success) {
        setAccountData(data.account);
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
  }, [])

  useEffect(() => {
    console.log("useEffect")
    if (accountData) {
      console.log("useEffect accountData")
      setLogoUrl(accountData.logoUrl || "");
      setFirstName(accountData.firstName || "");
      setLastName(accountData.lastName || "");
      setCompany(accountData.company || "");
      setEmail(accountData.email);
      setPhone(accountData.phone);
      setAddress(accountData.address);
    }
  }, [accountData])

  if (loading) {
    return <div>
      Loading...
    </div>
  }

  console.log({
    accountData,
    logoUrl,
    firstName,
    lastName,
    company,
    email,
    phone,
    address,
    actualPassword,
    newPassword,
    confirmNewPassword
  })

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">
        Mon compte
      </h1>
      <p className="text-gray-700 text-lg">
        Ici, vous pouvez gérer vos informations personnelles
      </p>
      <div className="h-0.5 my-8 w-full bg-gray-200"></div>
      {/* Account profile */}
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
            {accountData && accountData.logoUrl && (
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
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Entrez l'url du logo" />
                </div>
              </div>
            )}

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
              <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900">
                Nom de l&apos;entreprise/client
              </label>
              <input value={company} onChange={(e) => setCompany(e.target.value)} type="text" id="company" className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Entrez le nom de votre entreprise" required />
            </div>
          </div>

          <div className="w-full flex gap-1 px-6">
            <div className="w-full flex flex-col">
              <div className="w-full min-w-[200px]">
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">
                  Prénom
                </label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" id="firstName" className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Entrez le prénom" required />
              </div>
            </div>
            <div className="w-full flex flex-col">
              <div className="w-full min-w-[200px]">
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">
                  Nom
                </label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" id="lastName" className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Entrez le nom" required />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 px-6">
            <div className=" w-full min-w-[200px]">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                Téléphone
              </label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" id="phone" className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Entrez votre téléphone" required />
            </div>
          </div>
          <div className="flex flex-col gap-1 px-6">
            <div className=" w-full min-w-[200px]">
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                Adresse
              </label>
              <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" id="address" className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Entrez votre adresse" required />
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
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                E-mail
              </label>
              <input disabled={true} value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
            </div>
          </div>
          <div className="flex flex-col gap-1 px-6">
            <div className=" w-full min-w-[200px]">
              <label htmlFor="actualPassword" className="block mb-2 text-sm font-medium text-gray-900">
                Mot de passe actuel
              </label>
              <input value={actualPassword} onChange={(e) => setActualPassword(e.target.value)} type="text" id="actualPassword" className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Entrez le mot de passe actuel" required />
            </div>
          </div>
          <div className="flex flex-col gap-1 px-6">
            <div className=" w-full min-w-[200px]">
              <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900">
                Nouveau mot de passe
              </label>
              <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="text" id="newPassword" className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Entrez le nouveau mot de passe" required />
            </div>
          </div>
          <div className="flex flex-col gap-1 px-6">
            <div className=" w-full min-w-[200px]">
              <label htmlFor="confirmNewPassword" className="block mb-2 text-sm font-medium text-gray-900">
                Confirmer le mot de passe
              </label>
              <input value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} type="text" id="confirmNewPassword" className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Confirmez le nouveau mot de passe" required />
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