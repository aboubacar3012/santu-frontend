'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { useEffect, useState } from 'react';
import { Account } from '@/src/types';
import { getAccountById } from '@/src/services/account';
import AccountInfoForm from '@/src/components/account/AccountInfoForm';
import AccountPasswordForm from '@/src/components/account/AccountPasswordForm';
import { motion } from 'framer-motion';
import { CalendarDays, RefreshCw } from 'lucide-react';

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
    return (
      <div className="flex items-center justify-center h-full">
        <RefreshCw className="w-8 h-8 text-gray-500 animate-spin" />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-semibold text-black">Mon compte</h1>
        <p className="text-gray-600 text-lg">
          Ici, vous pouvez gérer vos informations personnelles
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="h-0.5 my-6 w-full bg-gray-200"></div>
      </motion.div>

      <div className="flex flex-wrap gap-4 mb-6">
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 px-4 py-3 text-black bg-white rounded-lg shadow-sm"
        >
          <CalendarDays className="h-5 w-5 text-my-raspberry" />
          <p className="text-nowrap font-normal">
            Inscrit depuis le{' '}
            <span className="font-semibold">13 septembre 2024</span>
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 px-4 py-3 text-black bg-white rounded-lg shadow-sm"
        >
          <RefreshCw className="h-5 w-5 text-my-raspberry" />
          <p className="text-nowrap font-normal">
            Dernière mise à jour le{' '}
            <span className="font-semibold">13 septembre 2024</span>
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row gap-6"
      >
        <AccountInfoForm accountData={accountData} />
        <AccountPasswordForm accountData={accountData} />
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
