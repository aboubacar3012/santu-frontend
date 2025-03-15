import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useUrlParams } from '../hooks/useUrlParams';

// Types définis pour améliorer la type-safety
type Period = 'all' | 'today' | 'week' | 'month';
type Status = 'all' | 'draft' | 'paid' | 'cancelled' | 'pending';

// Mappage des libellés pour éviter la répétition
const periodLabels: Record<Period, string> = {
  all: 'Toutes',
  today: 'Aujourdhui',
  week: 'Cette semaine',
  month: 'Ce mois',
};

const statusLabels: Record<Status, string> = {
  all: 'Toutes',
  draft: 'Brouillons',
  pending: 'En attente',
  paid: 'Payées',
  cancelled: 'Annulées',
};

const FilterSection = () => {
  const { setParams } = useUrlParams();
  const [status, setStatus] = useState<Status>('all');
  const [period, setPeriod] = useState<Period>('today');

  useEffect(() => {
    setParams({ status: 'all', period: 'all' });
  }, []);

  const handleDateFilterChange = (period: Period) => {
    setParams({ period });
    setPeriod(period);
  };

  const handlePaymentFilterChange = (status: Status) => {
    setParams({ status });
    setStatus(status);
  };

  console.log('FilterSection rendered', status, period);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.section
      className="mb-6 mt-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="bg-white rounded-lg shadow p-4 overflow-hidden"
        whileHover={{ boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.05)' }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-start flex-wrap gap-4 relative">
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-sm font-medium text-gray-900 mb-3"
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Filtrer par période
            </motion.h3>
            <div className="flex gap-2 relative">
              {Object.keys(periodLabels).map(periodKey => (
                <motion.div key={periodKey} className="relative">
                  {period === periodKey && (
                    <motion.div
                      className="absolute inset-0 rounded-md bg-gradient-to-tr from-finance-primary to-finance-secondary"
                      layoutId="dateIndicator"
                      initial={{ borderRadius: 6 }}
                      animate={{ borderRadius: 6 }}
                      transition={{
                        type: 'spring',
                        stiffness: 600,
                        damping: 35,
                      }}
                    />
                  )}
                  <motion.button
                    onClick={() => handleDateFilterChange(periodKey as Period)}
                    className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm relative z-10 ${
                      period === periodKey
                        ? 'text-white'
                        : 'bg-white text-gray-900 hover:bg-gray-100'
                    }`}
                    whileHover={{
                      scale: 1.05,
                      transition: {
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {periodLabels[periodKey as Period]}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-sm font-medium text-gray-900 mb-3"
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Filtrer par statut
            </motion.h3>
            <div className="flex gap-2 flex-wrap relative">
              {Object.keys(statusLabels).map(statusKey => (
                <motion.div key={statusKey} className="relative">
                  {status === statusKey && (
                    <motion.div
                      className="absolute inset-0 rounded-md bg-gradient-to-tr from-finance-primary to-finance-secondary"
                      layoutId="paymentIndicator"
                      initial={{ borderRadius: 6 }}
                      animate={{ borderRadius: 6 }}
                      transition={{
                        type: 'spring',
                        stiffness: 600,
                        damping: 35,
                      }}
                    />
                  )}
                  <motion.button
                    onClick={() => handlePaymentFilterChange(statusKey as Status)}
                    className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm relative z-10 ${
                      status === statusKey
                        ? 'text-white'
                        : 'bg-white text-gray-900 hover:bg-gray-100'
                    }`}
                    whileHover={{
                      scale: 1.05,
                      transition: {
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {statusLabels[statusKey as Status]}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default FilterSection;
