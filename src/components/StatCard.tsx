import { ReactNode } from 'react';
import { GiMoneyStack } from 'react-icons/gi';
import { motion } from 'framer-motion';

type StatCardProps = {
  title: string;
  value: number | string;
  unit: string;
  icon: ReactNode;
};

const StatCard = ({ title, value, unit, icon }: StatCardProps) => {
  return (
    <motion.div
      className="flex flex-col justify-between p-4 pb-4 bg-white rounded-md shadow-md h-40"
      initial={{ scale: 1 }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
    >
      <motion.div
        className="flex justify-between"
        initial={{ opacity: 1 }}
        whileHover={{ opacity: 0.8 }}
      >
        <motion.p className="text-lg font-semibold">{title}</motion.p>
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>
      </motion.div>

      <motion.div className="">
        <motion.p
          className="text-2xl font-normal whitespace-nowrap pb-2"
          initial={{ y: 0 }}
          whileHover={{ y: -2 }}
        >
          {value}
        </motion.p>
        <motion.p
          className="text-md"
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
        >
          {unit}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default StatCard;
