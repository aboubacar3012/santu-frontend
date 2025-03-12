'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { useEffect, useState } from 'react';
import { Account } from '@/src/types';
import { getAccountById } from '@/src/services/account';
import AccountInfoForm from '@/src/components/account/AccountInfoForm';
import AccountPasswordForm from '@/src/components/account/AccountPasswordForm';
// Cette fonction indique à Next.js que cette page doit être générée côté client
// et non dans le cadre de l'export statique
export const dynamic = 'force-dynamic';

const ProfilePage = ({ params }: { params: { accountId: string } }) => {
  const [accountData, setAccountData] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const auth = useSelector((state: RootState) => state.auth);

  const fetchData = async () => {
    getAccountById(params.accountId, auth.token!)
      .then(data => {
        if (data.success) {
          setAccountData(data.account);
          setLoading(false);
        } else if (!data.success) {
          setError(
            "Une erreur s'est produite lors de la récupération de l'utilisateur"
          );
          setLoading(false);
        }
      })
      .catch(error => {
        setError(
          "Une erreur s'est produite lors de la récupération de l'utilisateur"
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">Mon compte</h1>
      <p className="text-black text-lg">
        Ici, vous pouvez gérer vos informations personnelles
      </p>
      <div className="h-0.5 my-8 w-full bg-gray-200"></div>
      {/* Account profile */}
      <div className="w-min px-4 my-2 py-2 gap-2 flex flex-col justify-end text-black bg-white  rounded-lg ">
        <p className="text-nowrap text-lg font-normal text-black">
          Inscrit depuis le{' '}
          <span className="font-semibold">13 septembre 2024</span>
        </p>
      </div>
      <div className="w-min px-4 my-2 py-2 gap-2 flex flex-col justify-end text-black bg-white  rounded-lg ">
        <p className="text-nowrap text-lg font-normal text-black">
          Dernière mise à jour le{' '}
          <span className="font-semibold">13 septembre 2024</span>
        </p>
      </div>
      <div className="flex gap-2 py-2">
        {/* Left side */}
        <AccountInfoForm accountData={accountData} />

        {/* Right side */}
        <AccountPasswordForm accountData={accountData} />
      </div>
    </div>
  );
};

export default ProfilePage;
