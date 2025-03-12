import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Account } from '@/src/types';
import FormInput from '@/src/components/ui/FormInput';

interface AccountInfoFormProps {
  accountData: Account | null;
}

const AccountInfoForm = ({ accountData }: AccountInfoFormProps) => {
  const [logoUrl, setLogoUrl] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (accountData) {
      setLogoUrl(accountData.logo || '');
      setFirstName(accountData.firstName || '');
      setLastName(accountData.lastName || '');
      setCompany(accountData.company || '');
      setPhone(accountData.phone);
      setAddress(accountData.address);
    }
  }, [accountData]);

  const handleSave = () => {
    // Implémentation de la sauvegarde à faire
    console.log('Sauvegarde des informations du compte');
  };

  return (
    <div className="w-1/2 h-min py-2 gap-4 flex flex-col text-black bg-white rounded-lg">
      <div className="flex items-center">
        {accountData && accountData.logo && (
          <div className="w-full flex flex-col gap-1 p-6">
            <div className="relative h-11 w-full min-w-[200px]">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-black"
              >
                Logo URL
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  // si la taille du fichier est supérieure à 1MB
                  if (file && file.size > 1024 * 1024) {
                    return toast.error(
                      'La taille du fichier ne doit pas dépasser 1MB'
                    );
                  }
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = e => {
                      setLogoUrl(e.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                id="title"
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                placeholder="Entrez l'url du logo"
              />
            </div>
          </div>
        )}

        {logoUrl && (
          <div className="w-max border border-gray-300 rounded-lg p-2.5">
            <img src={logoUrl} alt="logo" className="w-32 h-22" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 px-6">
        <FormInput
          label="Nom de l'entreprise/client"
          value={company}
          onChange={e => setCompany(e.target.value)}
          placeholder="Entrez le nom de votre entreprise"
          required={true}
        />
      </div>

      <div className="w-full flex gap-1 px-6">
        <div className="w-full flex flex-col">
          <FormInput
            label="Prénom"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="Entrez le prénom"
            required={true}
          />
        </div>
        <div className="w-full flex flex-col">
          <FormInput
            label="Nom"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Entrez le nom"
            required={true}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 px-6">
        <FormInput
          label="Téléphone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Entrez votre téléphone"
          required={true}
        />
      </div>
      <div className="flex flex-col gap-1 px-6">
        <FormInput
          label="Adresse"
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Entrez votre adresse"
          required={true}
        />
      </div>

      <button
        onClick={handleSave}
        className="mx-6 w-min px-6 font-semibold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Enregistrer
      </button>
    </div>
  );
};

export default AccountInfoForm;
