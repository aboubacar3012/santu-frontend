import { useState, useEffect } from 'react';
import { Account } from '@/src/types';
import FormInput from '@/src/components/ui/FormInput';

interface AccountPasswordFormProps {
  accountData: Account | null;
}

const AccountPasswordForm = ({ accountData }: AccountPasswordFormProps) => {
  const [email, setEmail] = useState('');
  const [actualPassword, setActualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    if (accountData) {
      setEmail(accountData.email);
    }
  }, [accountData]);

  const handleSave = () => {
    // Implémentation de la mise à jour du mot de passe
    console.log('Mise à jour du mot de passe');
  };

  return (
    <div className="w-1/2 h-min py-2 gap-2 flex flex-col text-black bg-white rounded-lg">
      <div className="flex flex-col gap-1 px-6">
        <FormInput
          label="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          required={true}
        />
      </div>
      <div className="flex flex-col gap-1 px-6">
        <FormInput
          label="Mot de passe actuel"
          value={actualPassword}
          onChange={e => setActualPassword(e.target.value)}
          type="password"
          placeholder="Entrez le mot de passe actuel"
          required={true}
        />
      </div>
      <div className="flex flex-col gap-1 px-6">
        <FormInput
          label="Nouveau mot de passe"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          type="password"
          placeholder="Entrez le nouveau mot de passe"
          required={true}
        />
      </div>
      <div className="flex flex-col gap-1 px-6">
        <FormInput
          label="Confirmer le mot de passe"
          value={confirmNewPassword}
          onChange={e => setConfirmNewPassword(e.target.value)}
          type="password"
          placeholder="Confirmez le nouveau mot de passe"
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

export default AccountPasswordForm;
