'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { checkUserExist, login, signup } from '../../services/auth';
import { updateToken } from '../../redux/features/authSlice';
import { containerVariants, itemVariants, logoVariants, buttonVariants } from './AnimationVariants';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

interface LoginFormProps {
  setRegistrationStep: (step: number) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setRegistrationStep }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userOnlyExists, setUserOnlyExists] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const validateEmail = (): boolean => {
    if (!email || !emailRegex.test(email)) {
      toast.error('Veuillez entrer votre adresse email valide');
      return false;
    }
    return true;
  };

  const checkEmailExists = async (): Promise<void> => {
    try {
      const data = await checkUserExist(email);
      setEmailVerified(true);
      setUserOnlyExists(data.exists);
    } catch (error) {
      toast.error("Erreur lors de la vérification de l'email");
    }
  };

  const handleSignup = async (): Promise<void> => {
    if (!password || password !== repeatPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const data = await signup(email, password);
      if (data) {
        dispatch(updateToken(data.accessToken));
        setRegistrationStep(2);
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error("Erreur lors de l'inscription");
    }
  };

  const handleUserLogin = async (): Promise<void> => {
    if (!password) {
      toast.error('Veuillez entrer votre mot de passe');
      return;
    }

    try {
      const data = await login(email, password);
      if (data) {
        dispatch(updateToken(data.accessToken));
        router.push('/dashboard');
      } else if (data.message) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Erreur lors de la connexion');
    }
  };

  const handleSubmit = async () => {
    if (!validateEmail()) return;

    if (!emailVerified) {
      await checkEmailExists();
      return;
    }

    if (userOnlyExists) {
      await handleUserLogin();
    } else {
      await handleSignup();
    }
  };

  return (
    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
      <motion.div initial="hidden" animate="visible" variants={logoVariants}>
        <img src="/images/logo.png" className="w-32 mx-auto rounded-full" />
      </motion.div>
      <motion.div
        className="mt-12 md:mt-36 flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-xl font-extrabold" variants={itemVariants}>
          Authentification
        </motion.h1>
        <div className="w-full flex-1 mt-8">
          <div className="mx-auto max-w-xs">
            <motion.div className="flex items-center justify-between mb-2" variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Entrez votre adresse email
              </label>
              {emailVerified && (
                <p
                  className="mt-2 text-xs text-black text-right hover:underline cursor-pointer"
                  onClick={() => setEmailVerified(false)}
                >
                  Modifier
                </p>
              )}
            </motion.div>
            <motion.input
              variants={itemVariants}
              disabled={emailVerified}
              onClick={() => setEmailVerified(false)}
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg font-medium border border-gray-200 placeholder-gray-500 text-sm"
              type="email"
              placeholder="Entrez votre email"
              whileFocus={{ scale: 1.02, borderColor: '#3B82F6' }}
              transition={{ type: 'spring', stiffness: 300 }}
            />

            {userOnlyExists && emailVerified && (
              <motion.div
                className="mt-3"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 24,
                }}
              >
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">
                  Entrez votre mot de passe
                </label>
                <motion.input
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg font-medium border border-gray-200 placeholder-gray-500 text-sm"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  whileFocus={{ scale: 1.02, borderColor: '#3B82F6' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </motion.div>
            )}
            {emailVerified && !userOnlyExists && (
              <>
                <motion.div
                  className="mt-3"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 24,
                  }}
                >
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">
                    Entrez votre mot de passe
                  </label>
                  <motion.input
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg font-medium border border-gray-200 placeholder-gray-500 text-sm"
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    whileFocus={{ scale: 1.02, borderColor: '#3B82F6' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                </motion.div>
                <motion.div
                  className="mt-3"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 24,
                  }}
                >
                  <label
                    htmlFor="repeatPassword"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Répétez votre mot de passe
                  </label>
                  <motion.input
                    id="repeatPassword"
                    value={repeatPassword}
                    onChange={e => setRepeatPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg font-medium border border-gray-200 placeholder-gray-500 text-sm"
                    type="password"
                    placeholder="Répétez votre mot de passe"
                    whileFocus={{ scale: 1.02, borderColor: '#3B82F6' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                </motion.div>
              </>
            )}

            <motion.button
              onClick={handleSubmit}
              className="mt-5 font-semibold bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {emailVerified ? 'Se connecter' : 'Continuer'}
            </motion.button>
            <motion.p className="mt-6 text-xs text-black text-center" variants={itemVariants}>
              J&apos;accepte les{' '}
              <a href="#" className="border-b border-gray-500 border-dotted">
                Conditions d&apos;utilisation{' '}
              </a>
              et la{' '}
              <a href="#" className="border-b border-gray-500 border-dotted">
                Politique de confidentialité
              </a>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
