import { useState, useEffect } from 'react';
import { Account } from '@/src/types';
import FormInput from '@/src/components/ui/FormInput';
import Button from '@/src/components/shared/Button';
import { Key, Save } from 'lucide-react';
import { toast } from 'react-toastify';

interface AccountPasswordFormProps {
  accountData: Account | null;
}

const AccountPasswordForm = ({ accountData }: AccountPasswordFormProps) => {
  const [email, setEmail] = useState('');
  const [actualPassword, setActualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (accountData) {
      setEmail(accountData.email);
    }
  }, [accountData]);

  const handleSave = () => {
    // Validation des champs
    if (!actualPassword) {
      toast.error('Veuillez saisir votre mot de passe actuel');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error('Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    if (newPassword && newPassword.length < 8) {
      toast.error(
        'Le nouveau mot de passe doit contenir au moins 8 caractères'
      );
      return;
    }

    setSaving(true);
    // Simulation d'une opération de sauvegarde asynchrone
    setTimeout(() => {
      console.log('Mise à jour du mot de passe');
      toast.success('Mot de passe mis à jour avec succès');
      setActualPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="w-1/2 h-min py-4 gap-4 flex flex-col text-black bg-white rounded-lg shadow-sm">
      <h3 className="px-6 text-lg font-semibold bg-gradient-to-r from-my-raspberry to-my-eggplant bg-clip-text text-transparent">
        Sécurité
      </h3>

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

      <div className="flex px-6 pt-2">
        <Button
          onClick={handleSave}
          variant="primary"
          size="md"
          icon={<Key className="w-4 h-4" />}
          loading={saving}
        >
          Modifier le mot de passe
        </Button>
      </div>
    </div>
  );
};

export default AccountPasswordForm;
