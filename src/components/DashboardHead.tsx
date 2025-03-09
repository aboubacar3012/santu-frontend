import { motion } from 'framer-motion';
const DashboardHead = () => {
  return (
    <motion.div
      className="cursor-pointer relative flex flex-col text-black bg-white shadow-md w-full rounded-xl bg-clip-border"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        // boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.3 },
      }}
    >
      <motion.div
        className="relative grid mx-4 mb-3 overflow-hidden text-white shadow-lg h-16 place-items-center rounded-xl bg-gradient-to-tr from-my-raspberry to-my-eggplant bg-clip-border shadow-my-raspberry-900/20"
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
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
      >
        <motion.h3
          className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-white"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          whileHover={{
            // textShadow: '0px 0px 8px rgba(255,255,255,0.5)',
            transition: { duration: 0.2 },
          }}
        >
          Santou Pro - Tableau de bord
        </motion.h3>
      </motion.div>
    </motion.div>
  );
};

export default DashboardHead;
