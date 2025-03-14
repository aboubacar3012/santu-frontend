import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: number | string;
  unit: string;
  icon: ReactNode;
  isVisible?: boolean;
};

const StatCard = ({ title, value, unit, icon, isVisible = true }: StatCardProps) => {
  const [isValueVisible, setIsValueVisible] = useState(isVisible);

  const toggleValueVisibility = () => {
    setIsValueVisible(!isValueVisible);
  };

  return (
    <motion.div
      className="cursor-pointer flex flex-col justify-between p-4 pb-4 bg-white rounded-md shadow-md h-40 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{
        y: -5,
        boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-finance-primary to-finance-secondary"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />

      <motion.div
        className="flex justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.p
          className="text-lg font-semibold"
          whileHover={{ x: 3 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {title}
        </motion.p>

        <motion.div
          initial={{ rotate: 0 }}
          whileHover={{
            rotate: 15,
            scale: 1.2,
            transition: { type: 'spring', stiffness: 400, damping: 10 },
          }}
          className="text-my-indigo"
        >
          {icon}
        </motion.div>
      </motion.div>

      <motion.div>
        <motion.p
          className={`text-2xl font-normal whitespace-nowrap pb-2 transition-all duration-300 ${
            !isValueVisible ? 'blur-sm select-none' : ''
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{
            scale: 1.05,
            color: '#8A0040',
            transition: { duration: 0.2 },
          }}
        >
          {value}
        </motion.p>

        <motion.p
          className={`text-md text-gray-600 transition-all duration-300 ${
            !isValueVisible ? 'blur-sm select-none' : ''
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.3 }}
          whileHover={{ opacity: 1 }}
        >
          {unit}
        </motion.p>
      </motion.div>

      {/* Bouton eye repositionné en bas à droite */}
      <motion.button
        onClick={e => {
          e.stopPropagation();
          toggleValueVisibility();
        }}
        className="absolute bottom-2 right-2 text-gray-500 hover:text-my-indigo focus:outline-none bg-white bg-opacity-70 rounded-full p-1"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        // whileHover={{ opacity: 1, scale: 1.1 }}
      >
        {isValueVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      </motion.button>
    </motion.div>
  );
};

export default StatCard;
