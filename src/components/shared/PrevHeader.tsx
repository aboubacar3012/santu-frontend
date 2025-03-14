import { useRouter } from 'next/navigation';
import { FaAngleLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PrevHeader = () => {
  const router = useRouter();
  const handlePushLeft = () => {
    router.back();
  };
  return (
    <motion.div
      onClick={handlePushLeft}
      className="flex w-2/12 gap-2 bg-white p-2 rounded-xl cursor-pointer shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.0022,
        backgroundColor: '#FDFDFD',
        boxShadow: '0px 7px 20px rgba(0, 0, 0, 0.15)',
        transition: {
          width: { type: 'spring', stiffness: 400, damping: 25 },
          scale: { duration: 0.2 },
        },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="flex items-center justify-center bg-gradient-to-tr from-finance-primary to-finance-secondary rounded-lg p-2 text-white"
        initial={{ scale: 0.95, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.4,
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        whileHover={{
          scale: 1.1,
          x: -2,
          transition: { duration: 0.2 },
        }}
      >
        <FaAngleLeft className="w-6 h-6" />
      </motion.div>
      <motion.h3
        className="text-xl font-light flex items-center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        Retour
      </motion.h3>
    </motion.div>
  );
};

export default PrevHeader;
