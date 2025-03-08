'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginReducer, updateToken } from '../redux/features/authSlice';
import { changePassword, authenticate } from '../services/account';
import { RootState } from '../redux/store';
import RegistrationInfoForm from '../components/auth/RegistrationInfoForm';
import SuccessRegistration from '../components/auth/SuccessRegistration';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [registrationStep, setRegistrationStep] = useState(1);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  // Nouvelle animation pour l'image avec effet de flottement
  const imageFloatingVariants = {
    animate: {
      y: [0, -15, 0],
      scale: [1, 1.03, 1],
      filter: ['brightness(1)', 'brightness(1.05)', 'brightness(1)'],
      transition: {
        duration: 6,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.6, type: 'spring', stiffness: 120 },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  const handleLogin = () => {
    // setUserOnlyExists(true)
    // setShowPasswordInput(true)

    return authenticate(email, password).then(data => {
      if (data.success) {
        console.log(data);
        if (data.account && data.created) {
          setShowPasswordInput(true);
        } else if (data.account && data.exist) {
          setShowPasswordInput(true);
        } else if (data.token) {
          dispatch(
            loginReducer({
              isAuthenticated: true,
              loggedAccountInfos: data.account,
            })
          );
          dispatch(updateToken(data.token));
          if (data.account.isFirstLogin) setRegistrationStep(2);
          else router.push('/dashboard');
        }
      } else {
        toast.error(data.message);
      }
    });
  };

  return (
    <div className="min-h-screen text-black flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <motion.div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/authimg.png')" }}
            initial={{ y: 0 }}
            animate="animate"
            variants={imageFloatingVariants}
          ></motion.div>
        </div>
        {registrationStep === 1 && (
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={logoVariants}
            >
              <img
                src="/images/logo.png"
                className="w-32 mx-auto rounded-full"
              />
            </motion.div>
            <motion.div
              className="mt-12 md:mt-36 flex flex-col items-center justify-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                className="text-xl font-extrabold"
                variants={itemVariants}
              >
                Authentification
              </motion.h1>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <motion.div
                    className="flex items-center justify-between mb-2"
                    variants={itemVariants}
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-black"
                    >
                      Entrez votre adresse email
                    </label>
                    {showPasswordInput && (
                      <p
                        className="mt-2 text-xs text-black text-right hover:underline cursor-pointer"
                        onClick={() => setShowPasswordInput(false)}
                      >
                        Modifier
                      </p>
                    )}
                  </motion.div>
                  <motion.input
                    variants={itemVariants}
                    onClick={() => setShowPasswordInput(false)}
                    disabled={showPasswordInput}
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg font-medium border border-gray-200 placeholder-gray-500 text-sm"
                    type="email"
                    placeholder="Entrez votre email"
                    whileFocus={{ scale: 1.02, borderColor: '#3B82F6' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />

                  {showPasswordInput && (
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
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-black"
                      >
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

                  <motion.button
                    onClick={handleLogin}
                    className="mt-5 font-semibold bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {showPasswordInput ? 'Se connecter' : 'Continuer'}
                  </motion.button>
                  <motion.p
                    className="mt-6 text-xs text-black text-center"
                    variants={itemVariants}
                  >
                    J&apos;accepte les{' '}
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Conditions d&apos;utilisation{' '}
                    </a>
                    et la{' '}
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Politique de confidentialité
                    </a>
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        {registrationStep === 2 && (
          <RegistrationInfoForm setRegistrationStep={setRegistrationStep} />
        )}
        {registrationStep === 3 && <SuccessRegistration />}
      </div>
    </div>
  );
};

export default LoginPage;
