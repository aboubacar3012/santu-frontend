import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Modal from './ui/Modal';

interface WelcomeModalProps {
  onClose?: () => void;
}

const WelcomeModalInfo: React.FC<WelcomeModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Récupérer le timestamp du dernier affichage
    const lastShownTimestamp = localStorage.getItem('welcomeModalLastShown');
    const currentTime = Date.now();

    // Vérifier si une heure s'est écoulée ou si c'est la première visite
    const shouldShow =
      !lastShownTimestamp || currentTime - parseInt(lastShownTimestamp) > 60 * 60 * 1000; // 60min * 60sec * 1000ms

    if (shouldShow) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    // Sauvegarder le timestamp actuel lors de la fermeture
    localStorage.setItem('welcomeModalLastShown', Date.now().toString());
    setIsOpen(false);

    if (onClose) {
      onClose();
    }
  };

  // Animation pour les éléments internes
  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="medium"
      title="Bienvenue sur Santou Pro"
      showClose={true}
      closeOnClickOutside={false}
      footer={
        <div className="flex justify-center w-full">
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-finance-primary hover:bg-finance-secondary text-white font-semibold rounded-md shadow-md transition-all duration-300 transform hover:scale-105"
          >
            J'ai compris
          </button>
        </div>
      }
    >
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Icône ou illustration */}
        <motion.div
          className="text-finance-primary"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>

        {/* Titre */}
        <motion.h2
          className="text-2xl font-bold text-finance-text-primary"
          custom={0}
          variants={itemAnimation}
          initial="hidden"
          animate="visible"
        >
          Version Bêta
        </motion.h2>

        {/* Message principal */}
        <motion.p
          className="text-lg text-finance-text-secondary"
          custom={1}
          variants={itemAnimation}
          initial="hidden"
          animate="visible"
        >
          Merci d'essayer notre application. Sachez que vous utilisez actuellement une{' '}
          <span className="font-semibold text-finance-secondary">version bêta</span> qui est encore
          en développement.
        </motion.p>

        {/* Avertissement */}
        <motion.div
          className="bg-finance-bg-light border-l-4 border-finance-warning p-4 rounded-md text-left w-full"
          custom={2}
          variants={itemAnimation}
          initial="hidden"
          animate="visible"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-finance-warning"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-finance-text-primary">
                <strong>Attention :</strong> Les données que vous enregistrez durant la phase bêta
                pourraient être effacées lors des mises à jour futures.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Message supplémentaire */}
        <motion.p
          className="text-finance-text-secondary"
          custom={3}
          variants={itemAnimation}
          initial="hidden"
          animate="visible"
        >
          Nous travaillons constamment à améliorer l'application et apprécions vos retours qui nous
          aideront à créer une meilleure expérience.
        </motion.p>

        {/* Badges */}
        <motion.div
          className="flex gap-4"
          custom={4}
          variants={itemAnimation}
          initial="hidden"
          animate="visible"
        >
          <span className="px-3 py-1 bg-finance-bg-medium text-finance-primary text-sm font-semibold rounded-full">
            Version bêta
          </span>
          <span className="px-3 py-1 bg-finance-bg-medium text-finance-accent text-sm font-semibold rounded-full">
            En développement
          </span>
        </motion.div>
      </div>
    </Modal>
  );
};

export default WelcomeModalInfo;
